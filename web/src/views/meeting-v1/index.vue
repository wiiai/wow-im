<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useCall as receiveUseCall } from "./utils/receive.js";
import { useCall } from "./utils/call.js";
import { socket, useSocketStore } from "@/stores/socket";
import Friends from "./friends/index.vue";
import TLayout from "@/components/t-layout/index.vue";

const userStore = useUserStore();
const videoRef = ref<HTMLVideoElement | null>(null);
const socketStore = useSocketStore();

const call = (item: { id: number }) => {
  socket.emit("enter-screen", {
    to: item.id,
  });

  const conn = () => {
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
    initLocal(() => {
      initCall(item.id, true);
    });
  };

  conn();
  // socket.on('enter-screen-answer', () => {
  //   console.log(`enter-screen-answer`)
  //   conn();
  // })
};

onMounted(() => {
  const doCon = () => {
    receiveUseCall(socket, {
      userInfo: {
        id: userStore.userInfo?.id,
        avatar: userStore.userInfo?.avatar,
        nickname: userStore.userInfo?.nickname,
      },
      onRemoteTrack: (data: MediaProvider) => {
        // if (videoRef.value) {
        //   videoRef.value.srcObject = data;
        // }
      },
      onGetLocalStream(data: MediaProvider) {},
    });
  };

  socket.on("enter-screen", ({ sender, data }) => {
    doCon();
    socket.emit("enter-screen-answer", {
      to: sender,
    });
  });
});
</script>

<template>
  <TLayout>
    <template v-slot:nav>
      <Friends :click-item="call" />
    </template>
    <template v-slot:main>
      <div class="main">
        <video class="screen-remote" src="" ref="videoRef" autoplay></video>
      </div>
    </template>
  </TLayout>
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
