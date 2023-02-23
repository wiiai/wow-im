<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useCall } from "./useCall.js";
import { socket, useSocketStore } from "@/stores/socket";
import { useRoute } from "vue-router";
import type { IUserInfo } from "@/types/IUserInfo";

const userStore = useUserStore();
const videoRef = ref<HTMLVideoElement | null>(null);
const socketStore = useSocketStore();
const query = useRoute().query;
const users = ref<IUserInfo[]>([]);

const { initCall, initLocal } = useCall(socket, {
  userInfo: {
    id: userStore.userInfo?.id,
    avatar: userStore.userInfo?.avatar,
    nickname: userStore.userInfo?.nickname,
  },
  onRemoteTrack: (data: MediaProvider) => {
    console.log(`onRemoteTrack`);
    if (videoRef.value) {
      videoRef.value.srcObject = data;
    }
  },
  onGetLocalStream: (data: MediaProvider) => {},
});

const isAudio = ref(false);
const isVideo = ref(false);
const isShare = ref(false);

const useAudio = () => {}
const useVideo = () => {}
const useShare = () => {}

onMounted(() => {
  socket.emit("enter-meeting", {
    meeting_id: query.id,
  });

  socket.on("enter-meeting", (data) => {
    console.log(`enter-meeting`, data);
    initLocal(() => {
      initCall(data.user_id, true);
    }, {
      video: true,
      audio: true,
    });
  });
})
</script>

<template>
  <div class="main">
    <div @click="useAudio">使用音频</div>
    <div @click="useVideo">使用视频</div>
    <div @click="useVideo">分享屏幕</div>
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
