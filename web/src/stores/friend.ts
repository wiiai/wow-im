import { defineStore, acceptHMRUpdate } from "pinia";
import * as FriendAPI from "@/service/friend";
import type { IUserInfo } from "@/types/IUserInfo";

export const useFriendStore = defineStore("friend", {
  state: () => ({
    list: [] as IUserInfo[],
  }),
  actions: {
    async queryFriend() {
      const res = await FriendAPI.getFriends({});
      const data = res.data;
      this.$patch({
        list: data.list,
      });
    },
    async queryProfile (list: number[], one = false) {
      const { data } = await FriendAPI.queryProfile({ list })
      if (one) {
        return data.list ? data.list[0] : null
      }
      return data
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFriendStore, import.meta.hot));
}
