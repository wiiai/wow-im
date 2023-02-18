<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useCall } from "./utils/call.js";
import { socket, useSocketStore } from "@/stores/socket";
import { useRoute } from "vue-router";

const videoRef = ref<HTMLVideoElement | null>(null);
const userStore = useUserStore();
const route = useRoute();
const socketStore = useSocketStore();

const conn = () => {
  const { initCall, initLocal } = useCall(socket, {
    userInfo: {
      id: userStore.userInfo?.id,
      avatar: userStore.userInfo?.avatar,
      nickname: userStore.userInfo?.nickname,
    },
    onRemoteTrack: (data: MediaProvider) => {
      console.log(`onRemoteTrack`)
      if (videoRef.value) {
        videoRef.value.srcObject = data;
      }
    },
    onGetLocalStream: (data: MediaProvider) => {
    },
  });
  initLocal(() => {
    initCall(route.query?.id, true);
  });
};

const view = () => {
  socket.emit("enter-screen", {
    to: route.query?.id,
  });

  conn();
  // socket.on('enter-screen-answer', () => {
  //   console.log(`enter-screen-answer`)
  //   conn();
  // })
}
</script>

<template>
  <div class="main">
    <button @click="view">view</button>
    <video class="screen-remote" src="" ref="videoRef" autoplay></video>
  </div>
</template>

<style lang="less" scoped>
.main {
  padding: 20px;
  text-align: center;
  video {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
}
</style>
