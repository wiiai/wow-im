<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useCall } from "./utils/receive.js";
import { socket, useSocketStore } from "@/stores/socket";

const userStore = useUserStore();
const videoRef = ref<HTMLVideoElement | null>(null);
const socketStore = useSocketStore();

const doCon = () => {
  useCall(socket, {
    userInfo: {
      id: userStore.userInfo?.id,
      avatar: userStore.userInfo?.avatar,
      nickname: userStore.userInfo?.nickname,
    },
    // onRemoteTrack: (data: MediaProvider) => {
    //   if (videoRef.value) {
    //     videoRef.value.srcObject = data;
    //   }
    // },
    onGetLocalStream (data: MediaProvider) {}
  });
};

onMounted(() => {
  socket.on("enter-screen", ({ sender, data }) => {
    doCon();
    socket.emit("enter-screen-answer", {
      to: sender,
    });
  });
})
</script>

<template>
  <div class="main">
    <!-- <button @click="start">start</button> -->
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
