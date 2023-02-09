import { getToken, getUserInfo } from "@/utils/auth";
import { defineStore, acceptHMRUpdate } from "pinia";
import * as store from "store";
import * as UserAPI from "@/service/user";
import { sleep } from "@/utils/sleep";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    userInfo: getUserInfo(),
    isLogin: false,
    authFinished: false
  }),

  actions: {
    async logout() {
      store.remove('token');
      store.remove("userInfo");

      this.$patch({
        token: "",
        userInfo: null,
        isLogin: false,
        authFinished: false
      });
    },

    async login(params: {}) {
      try {
        const res = await UserAPI.login(params);
        const data = res.data;
        this.$patch({
          token: data.token,
          userInfo: data,
          isLogin: true
        });
        store.set("token", data.token);
        store.set("userInfo", data);
        return true;
      } catch (e) {
        e;
        return false;
      }
    },

    async checkLogin () {
      try {
        const res = await UserAPI.checkLogin();
        const data = res.data;
        await sleep();
        this.$patch({
          isLogin: data.status,
          authFinished: true
        });
        return data.status;
      } catch (e) {
        e;
        return false;
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
