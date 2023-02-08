export interface IRemoteMessage {
  suid: number;
  rid: number;
  type: number;
  content: string;
  is_read: boolean;
  is_group: boolean;
  create_time: string;
  loading?: boolean;
  msg_no?: string;
  time?: number;

  from_avatar: string;
  from_nickname: string;
  to_avatar: string;
  to_nickname: string;
}

export enum MsgTypeEnum {
  text = 0,
  image = 1,
  audio = 2,
  file = 3
}


export interface ILocalMessage {
  suid: number;
  rid: number;
  type: number;
  content: string;
  is_read: boolean;
  loading: boolean;
  msg_no?: string;
  create_time: string;
  is_group: boolean;
  time?: number;
}

export type IMessage = IRemoteMessage | ILocalMessage;