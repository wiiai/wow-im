<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useSocketStore } from "./stores/socket";
import { useUserStore } from "./stores/user";
import AuthLoading from "./modal/auth-loading/index.vue";
import ChatModal from "./modal/chat/Receive.vue";
import CallModal from "./modal/chat/Call.vue";
import Login from "./views/login/index.vue";

const router = useRouter();
const socketStore = useSocketStore();
const userStore = useUserStore();
const checkAuthLoading = ref(true);

onMounted(() => {
  userStore.checkLogin().then(() => {
    checkAuthLoading.value = false;
    const isLogin = userStore.isLogin && userStore.userInfo;
    if (isLogin) {
      socketStore.connect();
      socketStore.initData();
    }
  });
});
</script>

<template>
  <template v-if="!checkAuthLoading">
    <div class="root" v-if="userStore.isLogin">
      <div class="app">
        <div class="toolbar">
          <div class="btns">
            <div class="u-info">
              <img class="avatar" :src="userStore.userInfo?.avatar" alt="" />
            </div>
            <div class="btn" @click="() => router.push('/')">
              <van-icon class="m-icon" name="chat-o" />
            </div>
            <div class="btn" @click="() => router.push('/friend')">
              <van-icon class="m-icon" name="friends-o" />
            </div>
            <div class="btn" @click="() => router.push('/meeting')">
              <van-icon class="m-icon" name="video-o" />
            </div>
            <div class="btn" @click="() => router.push('/design')">
              <van-icon class="m-icon" name="font-o" />
            </div>
          </div>
          <div class="btn" @click="() => router.push('/me')">
            <img class="setting" src="./assets/img/setting.svg" alt="">
          </div>
        </div>
        <div class="main">
          <RouterView />
        </div>
        <CallModal v-if="socketStore.dialUser" />
        <ChatModal v-if="socketStore.receiveUser" />
      </div>
    </div>
    <Login v-else></Login>
  </template>
  <AuthLoading v-else />
</template>

<style scoped lang="less">
.root {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7d8693;
  background-image: url(https://static.cdn.haiserve.com/seatalk/fe/static/media/bg.6bbf4e6f.jpg);
  background-position: 50%;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

.app {
  display: flex;
  width: 1400px;
  height: 90%;
  max-height: 800px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: #fff;
  .toolbar {
    position: relative;
    width: 70px;
    border-right: 1px solid #eee;
    background-color: #f1f1f1;
    .btns {
      height: 100%;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 12px;
    }
    .btn {
      text-align: center;
      margin-bottom: 12px;
    }
    .u-info {
      font-size: 12px;
      text-align: center;
      margin-bottom: 10px;
      .avatar {
        width: 42px;
        height: 42px;
        border-radius: 4px;
      }
    }
    .m-icon {
      color: #333;
      cursor: pointer;
      font-size: 28px;
    }
    .setting {
      position: absolute;
      bottom: 20px;
      width: 24px;
      left: 50%;
      margin-left: -12px;
      cursor: pointer;
    }
  }
  .main {
    flex: 1;
    height: 100%;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
  }
}
</style>
