import { Schema, model } from 'mongoose';
import { IMessage } from './message';

export interface ISession {
  suid: number;
  ruid: number;
  is_group: number;
  create_time: Date;
  last_message_id?: Schema.Types.ObjectId;
  last_message?: IMessage;
  read_time?: number;
  is_active?: number
}

const schema = new Schema<ISession>({
  // 发送者用户 ID
  suid: { type: Number, required: true },

  // 接收者 ID, 如果是单聊信息，则为 user_id，如果是群组消息，则为 group_id
  ruid: { type: Number, required: true },

  // 是否为群聊
  is_group: { type: Number, required: true },

  // 发送时间
  create_time: { type: Date, required: false },

  // 最后条消息 id
  last_message_id: { type: Schema.Types.ObjectId, required: false },

  // 最后阅读时间
  read_time: { type: Number, required: false, default: () => 0 },

  // 是否激活
  is_active: { type: Number, required: false, default: () => 0 },
});

const SessionModel = model<ISession>('Session', schema);

export { SessionModel };