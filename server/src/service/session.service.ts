import { Types } from 'mongoose';
import { MessageModel } from '../database/mongo/model/message';
import { SessionModel } from '../database/mongo/model/session';
import { groupService } from './group.service';
import { userService } from './user.service';

const sessionService = {
  // 私聊创建 session
  async createSession(
    params: {
      suid: number;
      ruid: number;
      is_group: number;
    },
    msg: { _id: Types.ObjectId },
  ) {
    const { suid, ruid, is_group } = params;
    const oneParams = { suid, ruid, is_group, is_active: 1 };
    const twoParams = { suid: ruid, ruid: suid, is_group, is_active: 1 };

    // 给发送者创建 session
    const one = await SessionModel.findOne({
      $or: [oneParams],
    });
    if (!one) {
      const session = new SessionModel({
        ...oneParams,
        last_message_id: msg._id,
      });
      await session.save();
    } else {
      await SessionModel.updateOne(
        { _id: one._id },
        {
          last_message_id: msg._id,
        },
      );
    }

    // 给接收者创建 session
    const two = await SessionModel.findOne({
      $or: [twoParams],
    });
    if (!two) {
      const session = new SessionModel({
        ...twoParams,
        last_message_id: msg._id,
      });
      await session.save();
    } else {
      await SessionModel.updateOne(
        { _id: two._id },
        {
          last_message_id: msg._id,
        },
      );
    }
  },

  // 群聊创建 session
  async createGroupSession(
    params: {
      suid: number;
      ruid: number; // 群ID
      is_group: number;
    },
    msg: { _id: Types.ObjectId },
  ) {
    const users = await groupService.getUserListById({ id: params.ruid });
    for (let user of users.list) {
      const one = await SessionModel.findOne({
        $or: [
          {
            suid: user.id,
            ruid: params.ruid,
            is_group: 1,
          },
        ],
      });
      if (!one) {
        const session = new SessionModel({
          suid: user.id,
          ruid: params.ruid,
          is_group: 1,
          last_message_id: msg._id,
        });
        await session.save();
      } else {
        await SessionModel.updateOne(
          { _id: one._id },
          {
            last_message_id: msg._id,
          },
        );
      }
    }
  },

  // 查询会话列表
  async querySession(params: { userId: number }) {
    const list = await SessionModel.find({
      $or: [
        {
          suid: params.userId,
        },
      ],
    });

    if (!list.length) {
      return {
        list,
      };
    }

    const user_id_list = list.filter((it) => !it.is_group).map((it) => it.ruid);
    const group_id_list = list.filter((it) => it.is_group).map((it) => it.ruid);

    const lastMessages = await Promise.all(
      list.map((it) => {
        return MessageModel.findOne({ _id: it.last_message_id });
      }),
    );

    const users = await userService.getByIds(user_id_list);
    const groups = await groupService.get_group_info_by_id_list({
      id_list: group_id_list,
    });

    // 好友
    const friendSession = await Promise.all(
      users.map(async (it) => {
        return {
          ruid: it.id,
          nickname: it.nickname,
          avatar: it.avatar,
          is_group: 0,
        };
      }),
    );

    // 群组
    const groupSession = await Promise.all(
      groups.map(async (it) => {
        return {
          ruid: it.id,
          nickname: it.name,
          avatar: it.avatar,
          is_group: 1,
        };
      }),
    );

    return {
      list: list.map((it) => {
        const rInfo = it.is_group
          ? groupSession.find((g) => g.ruid === it.ruid)
          : friendSession.find((g) => g.ruid === it.ruid);

        const last_message = lastMessages.find((m) => {
          return m?._id.toString() === it.last_message_id?.toString();
        });

        return {
          ...rInfo,
          last_message,
        };
      }),
    };
  },

  // 更新 session 最后阅读时间
  async updateReadTime({
    user_id,
    ruid,
    is_group,
  }: {
    user_id: number;
    ruid: number;
    is_group: number;
  }) {
    // 给发送者创建 session
    const one = await SessionModel.findOne({
      $or: [
        {
          suid: user_id,
          ruid: ruid,
          is_group: is_group,
        },
      ],
    });

    if (one) {
      await SessionModel.updateOne(
        { _id: one._id },
        {
          read_time: Date.now(),
        },
      );
    }
  },
};

export { sessionService };
