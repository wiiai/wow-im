import type { IMessage } from "./IMessage";

export interface ISession {
  nickname: string;
  avatar: string;
  partner_id: number,
  is_group: boolean;

  unread?: number;
  last_message?: null|IMessage;
}