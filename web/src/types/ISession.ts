import type { IMessage } from "./IMessage";

export interface ISession {
  nickname: string;
  avatar: string;
  ruid: number,
  is_group: number;
  unread?: number;
  last_message?: null|IMessage;
}