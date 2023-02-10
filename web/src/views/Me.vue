<script lang="ts" setup>
import Page from "@/components/Page.vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const logout = () => {
  userStore.logout().then(() => {
    router.push("/login");
  });
};
</script>

<template>
  <div :tabBarProps="{ activeIndex: 2 }">
    <div class="card">
      <img :src="userStore.userInfo?.avatar" alt="" />
      <div class="nickname">
        <span>{{ userStore.userInfo?.nickname }}</span>
        <span>({{ userStore.userInfo?.id }})</span>
      </div>
      <van-button
        @click="logout"
        size="small"
        class="login-out"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
      >
        注销登录
      </van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  padding: 20px;
  padding-top: 10%;
  text-align: center;
  .nickname {
    font-size: 20px;
    margin-top: 20px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
  .login-out {
    width: 90px;
    margin-top: 30px;
  }
}
</style>
