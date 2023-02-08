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
  <template v-if="!checkAuthLoading">
    <RouterView />
    <CallModal v-if="socketStore.dialUser" />
    <ChatModal v-if="socketStore.receiveUser" />
  </template>
  <AuthLoading v-else />
</template>
