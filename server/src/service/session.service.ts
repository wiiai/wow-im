import { Types } from 'mongoose';
import { IMessage, MessageModel } from '../database/mongo/model/message';
import { ISession, SessionModel } from '../database/mongo/model/session';
import { UserEntity } from '../database/mysql/entity/user.entity';
import { groupService } from './group.service';
import { userService } from './user.service';

const sessionService = {
  /**
   * @description 创建或者更新
   * @param params
   */
  async saveSession(params: ISession, user: UserEntity, msg: { _id: Types.ObjectId }) {
    const { suid, ruid, ...rest } = params;

    {
      // 给发送者创建 session
      const one = await SessionModel.findOne({
        $or: [
          {
            suid,
            ruid,
            is_group: rest.is_group,
          },
        ],
      });

      if (one) {
        await SessionModel.updateOne(
          { _id: one._id },
          {
            ...rest,
            last_message_id: msg._id,
          },
        );
      } else {
        const session = new SessionModel({
          suid,
          ruid,
          ...rest,
          last_message_id: msg._id,
        });
        await session.save();
      }
    }

    {
      // 给接收者创建 session
      const one = await SessionModel.findOne({
        $or: [
          {
            suid: ruid,
            ruid: suid,
            is_group: rest.is_group,
          },
        ],
      });

      if (one) {
        await SessionModel.updateOne(
          { _id: one._id },
          {
            ...rest,
            last_message_id: msg._id,
          },
        );
      } else {
        const session = new SessionModel({
          suid: ruid,
          ruid: suid,
          ...rest,
          last_message_id: msg._id,
        });
        await session.save();
      }
    }
  },

  /**
   * @description 查询聊天列表
   * @param params
   */
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
    } else {
      const session = new SessionModel({
        suid: user_id,
        ruid: ruid,
        is_group: is_group,
        read_time: Date.now(),
        create_time: Date.now(),
        content: ''
      });
      await session.save();
    }
  },
};

export { sessionService };
