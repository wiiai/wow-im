<template>
  <div class="chat-modal">
    <div class="main-bg"></div>
    <div class="main-shadow"></div>
    <div class="main-box">
      <MyPhoto v-show="showVideo" />
      <div class="person-box">
        <img class="avatar" :src="socketStore.dialUser?.avatar" alt="" />
        <div class="nickname">{{ socketStore.dialUser?.nickname }}</div>
      </div>
    </div>
    <div class="actions" v-if="!showVideo">
      <div
        class="col"
        @click="socketStore.setDialUser(null)"
      >
        <div class="btn btn-reject">
          <img src="./avatar/s1@3x.png" alt="" />
        </div>
        <span>取消</span>
      </div>
      <div class="col">
        <div class="btn btn-receive">
          <img src="./avatar/语音@3x.png" alt="" />
        </div>
        <span>切到语音</span>
      </div>
    </div>

    <div class="actions actions-single" v-else>
      <div class="col" @click="handleClose">
        <div class="btn btn-reject">
          <img src="./avatar/s1@3x.png" alt="" />
        </div>
        <span>挂断</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { socket, useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useCall } from "./useCall.js";
import { onMounted, ref } from "vue";
import { Toast } from "vant";
import MyPhoto from "./MyPhoto.vue";

const socketStore = useSocketStore();
const userStore = useUserStore();
const showVideo = ref(false);

const handleClose = () => {
  const pc: any = (window as any).pc;
  if (socketStore.dialUser?.id) {
    pc[socketStore.dialUser?.id]?.close();
  }
};

function onAnswer (data: any) {
  if (data.status === 0) {
    socketStore.$patch({
      dialUser: null,
    });
    Toast("对方已拒绝");
  } else {
    const { initCall, initLocal } = useCall(socket, {
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

    initLocal(() => {
      initCall(socketStore.dialUser?.id, true);
    });
  }
};

onMounted(() => {
  socket.on("video-call-answer", onAnswer);
});
</script>

<style lang="less" scoped>
.chat-modal {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.main-bg {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(./avatar/avatar.jpg);
  background-size: cover;
  filter: blur(6px);
}

.main-shadow {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
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
  position: absolute;
  right: 0;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  text-align: center;

  &.actions-single {
    justify-content: center;
  }

  .col {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  span {
    color: #fff;
    margin-top: 10px;
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
    background: rgba(0, 0, 0, 0.2);
    border-radius: 35px;
    img {
      width: 34px;
      height: 24px;
    }
  }
}
</style>
