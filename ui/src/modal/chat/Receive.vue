<template>
  <div class="chat-modal">
    <div class="main-bg"></div>
    <div class="main-shadow"></div>
    <div class="main-box">
      <div id="partner-video">
        <MyPhoto v-show="showVideo" />
      </div>
      <div class="person-box">
        <img class="avatar" :src="socketStore.receiveUser?.avatar" alt="" />
        <div class="nickname">{{ socketStore.receiveUser?.nickname }}</div>
      </div>

      <div class="actions" v-if="!showVideo">
        <div class="btn btn-reject" @click="handleClick(0)">
          <img src="./avatar/s1@3x.png" alt="" />
          <span>拒绝</span>
        </div>
        <div class="btn btn-receive" @click="handleClick(1)">
          <img src="./avatar/s2@3x.png" alt="" />
          <span>接听</span>
        </div>
      </div>

      <div class="actions actions-single" v-else>
        <div class="btn btn-reject" @click="handleClose()">
          <img src="./avatar/s1@3x.png" alt="" />
          <span>挂断</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { socket } from "@/stores/socket";
import { useCall } from "./useCall";
import MyPhoto from './MyPhoto.vue';
import { ref } from "vue";

const socketStore = useSocketStore();
const userStore = useUserStore();
const showVideo = ref(false);

const handleClose = () => {
  const pc: any = (window as any).pc;
  if (socketStore.receiveUser?.id) {
    pc[socketStore.receiveUser?.id]?.close();
  }
};

const handleClick = (val: number) => {
  if (val == 1) {
    useCall(socket, {
      userInfo: {
        id: userStore.userInfo?.id,
        avatar: userStore.userInfo?.avatar,
        nickname: userStore.userInfo?.nickname,
      },
      onGetLocalStream: (data: MediaProvider) => {
        showVideo.value = true;
        const el = document.querySelector(".local-video") as HTMLVideoElement;
        el.srcObject = data;
      },
      onRemoteTrack: (data: MediaProvider) => {
        showVideo.value = true;
        const el = document.querySelector(".remote-video") as HTMLVideoElement;
        if (el) {
          el.srcObject = data;
        }
      },
    });
  } else {
    socketStore.setReceiveUser(null);
  }

  socket.emit("video-call-answer", {
    status: val,
    to: socketStore.receiveUser?.id,
  });
};
</script>

<style lang="less" scoped>
.chat-modal {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.main-bg {
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(./avatar/avatar.jpg);
  background-size: cover;
  filter: blur(6px);
}

.main-shadow {
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.main-box {
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}

.person-box {
  margin-top: 20%;
  text-align: center;

  .avatar {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
  }

  .nickname {
    font-size: 20px;
    margin-top: 10px;
    color: #fff;
  }
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 20%;
  margin-top: 60%;

  &.actions-single {
    justify-content: center;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    img {
      width: 32px;
      height: 32px;
    }
    span {
      font-size: 12px;
      color: #fff;
    }
  }

  .btn-reject {
    background: #ff5d5b;
    border-radius: 35px;
  }

  .btn-receive {
    background: #30c74d;
    border-radius: 35px;
  }
}
</style>
