import { getRepository } from 'typeorm';
import { IMessage, MessageModel } from '../database/mongo/model/message';
import { ReadLogEntity } from '../database/mysql/entity/read-log.entity';
import { SessionModel } from '../database/mongo/model/session';

const messageService = {
  /**
   * @description 保存消息到 db
   * @param params
   */
  async saveMessage(params: IMessage) {
    const msg = new MessageModel(params);
    return await msg.save();
  },

  /**
   * @description 查询未读消息, 最多查最近的1000个
   * @param params
   */
  async queryUnRead(
    user_id: number,
    params: { rid: number; is_group: boolean },
  ) {
    const size = 20;

    // 当前的已读序号
    const log = await SessionModel.findOne({
      $or: [
        {
          suid: user_id,
          rid: params.rid,
          is_room: Number(params.is_group),
        },
      ],
    });

    if (params.is_group) {
      // 群消息
      const list = await MessageModel.find({
        rid: params.rid,
        is_group: true,
      })
        .where('time')
        .gt(log?.read_time || 0)
        .sort({
          create_time: -1,
        })
        .limit(size);

      return {
        list
      };
    }

    const list = await MessageModel.find({
      $or: [
        {
          rid: params.rid,
          suid: user_id,
          is_group: false,
        },
        {
          rid: user_id,
          suid: params.rid,
          is_group: false,
        },
      ],
    })
      .where('time')
      .gt(log?.read_time || 0)
      .sort({
        create_time: -1,
      })
      .limit(size);

    return {
      list: list,
    };
  },

  /**
   * @description 查询消息
   * @param params
   */
  async queryHistoryMessage(
    user_id: number,
    params: { partner_id: number; is_group: boolean; seq: number },
  ) {
    const size = 20;

    if (params.is_group) {
      const list = await MessageModel.find({
        rid: params.partner_id,
        is_group: true,
      })
        .where('time')
        .lt(params.seq || Date.now())
        .limit(size)
        .sort({
          time: -1,
        })

      return {
        list
      };
    }

    const list = await MessageModel.find({
      $or: [
        {
          rid: user_id,
          suid: params.partner_id,
          is_group: false,
        },
        {
          rid: params.partner_id,
          suid: user_id,
          is_group: false,
        },
      ],
    })
      .where('time')
      .lt(params.seq || Date.now())
      .sort({
        time: -1,
      })
      .limit(size);

    return {
      list
    };
  },
};

export { messageService };
