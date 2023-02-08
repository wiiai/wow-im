export enum CmdEnum {
  private_chat = 0,
  group_chat = 1
}

export interface IMessagePayload {
  cmd: CmdEnum;
  rid: number;
  content: string;
  is_group: boolean;
  type?: number;
  title?: string;
  to_avatar?: string;
  to_nickname?: string;
}