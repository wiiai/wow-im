import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { IMessage } from './database/mongo/model/message';
import { UserEntity } from './database/mysql/entity/user.entity';
import { groupService } from './service/group.service';
import { messageService } from './service/message.service';
import { sessionService } from './service/session.service';
import { userService } from './service/user.service';
import { CmdEnum, IMessagePayload, MsgTypeEnum } from './types/IMessagePayload';
import { getUrlParam } from './utils/getUrlParam';
import { logger } from './utils/logger';

// 连接状态维护
const userMap = {} as Record<string, Socket>;

// 会议在线用户维护
const meetingMap = {} as Record<string, Number[]>;

/**
 * @description 监听用户下线
 * @param socket
 * @param payload
 * @param user
 */
function onDisconnected(socket: Socket, user: UserEntity) {
  logger.log(`user ${user?.id} disconnected`);
  delete userMap[user.id];
}

/**
 * @description 监听用户的消息
 * @param socket
 * @param payload
 * @param user
 */
function onMessage(
  socket: Socket,
  user: UserEntity,
  payload: IMessagePayload,
  callback: Function,
) {
  switch (payload.cmd) {
    case CmdEnum.private_chat: {
      sendPrivateMsg(socket, user, payload, callback);
      return;
    }
    case CmdEnum.group_chat: {
      sendGroupMsg(socket, user, payload, callback);
      return;
    }
    case CmdEnum.mark_read: {
      markRead(socket, user, payload, callback);
      return;
    }
  }
}

/**
 * 标签标记阅读时间
 * @param socket
 * @param user
 * @param payload
 * @param callback
 */
async function markRead(
  socket: Socket,
  user: UserEntity,
  payload: IMessagePayload,
  callback: Function,
) {
  const user_id = user.id;
  const ruid = payload.ruid;
  const is_group = payload.is_group || 0;
  
  await sessionService.updateReadTime({
    user_id,
    ruid,
    is_group 
  });

  callback?.();
}

/**
 * @description 私聊
 * @param socket
 * @param payload
 * @param user
 */
async function sendPrivateMsg(
  socket: Socket,
  user: UserEntity,
  payload: IMessagePayload,
  callback: Function,
) {
  const ruid = payload.ruid;
  const rCon = userMap[ruid];
  const sCon = userMap[user.id];

  const data: IMessage = {
    ...payload,
    is_group: 0,
    type: payload.type || MsgTypeEnum.text,
    suid: user.id,
    ruid: payload.ruid,
    title: payload.title || '',
    content: payload.content,
    create_time: new Date(),
    time: Date.now(),
  };

  const msg = await messageService.saveMessage(data);
  await sessionService.saveSession(
    {
      ...data,
    },
    user,
    msg,
  );

  // 给接收人发
  // 接收不一定在线
  rCon &&
    rCon.emit('message', {
      ...data,
      msg_no: payload.msg_no,
    });

  // 给发送者发
  // 发送着也不一定在线, 比如发了消息立马下线
  sCon &&
    sCon.emit('message', {
      ...data,
      msg_no: payload.msg_no,
    });

  callback();
}

/**
 * @description 私聊
 * @param socket
 * @param payload
 * @param user
 */
async function sendGroupMsg(
  socket: Socket,
  user: UserEntity,
  payload: IMessagePayload,
  callback: Function,
) {
  const ruid = payload.ruid;
  const sCon = userMap[user.id];
  const rUsers = await groupService.getUserIdsById(ruid);

  const data: IMessage = {
    ...payload,
    is_group: 1,
    type: payload.type || MsgTypeEnum.text,
    suid: user.id,
    ruid: payload.ruid,
    title: payload.title || '',
    content: payload.content,
    create_time: new Date(),
    time: Date.now(),
  };

  const msg = await messageService.saveMessage(data);
  await sessionService.saveSession(data, user, msg);

  rUsers
    .filter((it) => {
      return it.user_id !== user.id;
    })
    .forEach((it) => {
      const rCon = userMap[it.user_id];

      // 给接收人发
      // 接收不一定在线
      rCon &&
        rCon.emit('message', {
          ...data,
          msg_no: payload.msg_no,
        });
    });

  // 给发送者发
  // 发送着也不一定在线, 比如发了消息立马下线
  sCon &&
    sCon.emit('message', {
      ...data,
      msg_no: payload.msg_no,
    });

  callback();
}

/**
 * @description 初始化
 * @param server
 */
export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('error', (message) => {
    logger.log('error');
  });

  setInterval(() => {
    logger.log(`current user: ${Object.keys(userMap)}`);
  }, 10000);

  io.on('connection', async (socket) => {
    const token = getUrlParam(socket.request.url || '', 'token');

    logger.log(`try connect: ${token}`);

    if (!token) {
      socket.disconnect();
    }

    const user = await userService.getUserByToken(token || '');

    if (user) {
      userMap[user.id] = socket;
    } else {
      logger.error('reject connect');
      socket.disconnect();
      return;
    }

    // 上线打印
    logger.log(`user ${user?.id} connected`);

    socket.on('disconnect', () => {
      // 监听断开
      Object.keys(meetingMap).forEach((meeting_id) => {
        if (meetingMap[meeting_id]) {
          meetingMap[meeting_id] = meetingMap[meeting_id].filter(
            (it) => it !== user.id,
          );
        }
      });
      onDisconnected(socket, user);
    });

    // sdp 消息的转发
    socket.on('sdp', (data) => {
      console.log(
        `receive sdp: sender ${data.sender} to ${data.to}`,
        Boolean(userMap[data.to]),
      );
      if (userMap[data.to]) {
        userMap[data.to].emit('sdp', {
          description: data.description,
          sender: data.sender,
        });
      }
    });

    // candidates 消息的转发
    socket.on('ice candidates', (data) => {
      console.log(
        `receive ice candidates: sender ${data.sender} to ${data.to}`,
        Boolean(userMap[data.to]),
      );
      if (userMap[data.to]) {
        userMap[data.to].emit('ice candidates', {
          candidate: data.candidate,
          sender: data.sender,
        });
      }
    });

    // 协议转发
    function transfer(name: string) {
      socket.on(name, (data) => {
        const { to, ...rest } = data;
        if (userMap[to]) {
          userMap[to].emit(name, {
            sender: user!.id,
            nickname: user!.nickname,
            avatar: user!.avatar,
            data: rest,
          });
        }
      });
    }

    transfer('async');
    transfer('enter-screen');
    transfer('enter-screen-answer');

    // 多人会议
    socket.on('enter-meeting', (data) => {
      const { meeting_id } = data;
      console.log(`enter-meeting: ${user.id} enter ${meeting_id}`, data);
      if (!meetingMap[meeting_id]) {
        meetingMap[meeting_id] = [];
      }
      // 通知会议里面的其他人, 我上线了...
      meetingMap[meeting_id].forEach((userId) => {
        if (userMap[`${userId}`] && userId != user.id) {
          userMap[`${userId}`].emit('enter-meeting', { user_id: user.id });
        }
      });
      if (!meetingMap[meeting_id].includes(user.id)) {
        meetingMap[meeting_id].push(user.id);
      }
    });

    // 多人会议
    socket.on('leave-meeting', (data) => {
      const { meeting_id } = data;
      if (meetingMap[meeting_id]) {
        meetingMap[meeting_id] = meetingMap[meeting_id].filter(
          (it) => it !== user.id,
        );
      }
      // 通知会议里面的其他人, 我下线了...
      meetingMap[meeting_id].forEach((userId) => {
        if (userMap[`userId`] && userId != user.id) {
          userMap[`userId`].emit('leave-meeting', { user_id: user.id });
        }
      });
    });

    // 视频聊天
    socket.on('video-call', (data) => {
      if (userMap[data.to]) {
        userMap[data.to].emit('video-call', {
          sender: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
        });
      }
    });

    socket.on('video-call-answer', (data) => {
      if (userMap[data.to]) {
        userMap[data.to].emit('video-call-answer', {
          status: data.status,
        });
      }
    });

    // 监听消息
    socket.on('message', (message: IMessagePayload, callback) =>
      onMessage(socket, user, message, callback),
    );
  });
};
