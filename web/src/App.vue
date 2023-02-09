<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useSocketStore } from "./stores/socket";
import { useUserStore } from "./stores/user";

import AuthLoading from "./modal/auth-loading/index.vue";
import ChatModal from "./modal/chat/Receive.vue";
import CallModal from "./modal/chat/Call.vue";

const router = useRouter();
const socketStore = useSocketStore();
const userStore = useUserStore();
const checkAuthLoading = ref(true);

onMounted(() => {
  userStore.checkLogin().then(() => {
    checkAuthLoading.value = false;

    if (!userStore.isLogin || !userStore.userInfo) {
      router.push("/login");
      return;
    }

    socketStore.connect();
    socketStore.initData();
  });
});
</script>

<template>
  <v-app v-if="!checkAuthLoading">
    <v-app-bar title="友友IM"></v-app-bar>
    <v-navigation-drawer width="80" class="toolbar">
      <div class="btns">
        <v-btn color="primary" @click="() => router.push('/')" variant="text" class="btn">消息</v-btn>
        <v-btn variant="text" @click="() => router.push('/friend')" color="primary" class="btn"> 朋友 </v-btn>
        <v-btn variant="text" @click="() => router.push('/me')" color="primary" class="btn"> 我的 </v-btn>
      </div>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
    <CallModal v-if="socketStore.dialUser" />
    <ChatModal v-if="socketStore.receiveUser" />
  </v-app>
  <AuthLoading v-else />
</template>

<style scoped>
.btns {
  padding-left: 6px;
  padding-top: 12px;
}

.btn {
  margin-bottom: 12px;
}
</style>