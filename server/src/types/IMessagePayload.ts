export enum CmdEnum {
  private_chat = 0,
  group_chat = 1
}

export enum MsgTypeEnum {
  text = 0,
  image = 1,
  audio = 2
}

export interface IMessagePayload {
  cmd: CmdEnum;
  rid: number;
  content: string;
  msg_no: string;
  type: number;
  title?: string;
}