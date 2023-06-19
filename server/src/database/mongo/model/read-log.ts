import { Schema, model, Types } from 'mongoose';

export interface IReadLog {
  user_id: number;
  ruid: number;
  is_group: number;
  create_time: Date;
  time: number;
  _id?: Types.ObjectId;
}

const schema = new Schema<IReadLog>({
  // 用户 ID
  user_id: { type: Number, required: true },

  // 如果是单聊信息，则为 user_id，如果是群组消息，则为 group_id
  ruid: { type: Number, required: true },

  // 是否为群聊
  is_group: { type: Number, required: true },

  // 发送时间
  create_time: { type: Date, required: true },

  // 消息序号
  time: { type: Number, required: true, default: () => Date.now() },
});

const ReadLogModel = model<IReadLog>('ReadLog', schema);

export { ReadLogModel };