import type { IUserInfo } from "@/types/IUserInfo";
import * as store from "store";

export const getToken = (): string => {
  return store.get("token") || "";
};

export const setToken = (token: string) => {
  store.set("token", token);
};

export const getUserInfo = (): IUserInfo | null => {
  const data: IUserInfo = store.get("userInfo") || null;
  return data;
};

export const getUserId = () => {
  const info = getUserInfo();
  return info ? info.id : null;
}