<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useSocketStore } from "./stores/socket";
import { useUserStore } from "./stores/user";

import AuthLoading from "./modal/auth-loading/index.vue";
import ChatModal from "./modal/chat/Receive.vue";
import CallModal from "./modal/chat/Call.vue";
import Login from "./views/Login.vue";

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
            <v-btn
              variant="tonal"
              @click="() => router.push('/')"
              class="btn"
              color="success"
              >消息</v-btn
            >
            <v-btn
              variant="tonal"
              color="success"
              @click="() => router.push('/friend')"
              class="btn"
            >
              朋友
            </v-btn>
            <v-btn
              variant="tonal"
              color="success"
              @click="() => router.push('/me')"
              class="btn"
            >
              我的
            </v-btn>
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
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  border-radius: 8px;
  /*e0e6ef*/
  background-color: #fff;
  .toolbar {
    width: 80px;
  }
  .main {
    flex: 1;
    height: 100%;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
  }
}

.btns {
  height: 100%;
  padding-left: 6px;
  padding-top: 12px;
}

.btn {
  margin-bottom: 12px;
}
</style>
