<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, watch, onMounted, ref, watchEffect, onUnmounted } from "vue";
import { RecordRTCPromisesHandler } from "recordrtc";
import { Howl } from "howler";
import { Toast } from "vant";

import { useSocketStore } from "@/stores/socket";
import { CmdEnum } from "@/types/IMessagePayload";
import { useUserStore } from "@/stores/user";
import { useFriendStore } from "@/stores/friend";
import { getUserListById } from "@/service/group";
import { sleep } from "@/utils/sleep";
import { upload } from "@/service/upload";
import { MsgTypeEnum } from "@/types/IMessage";
import { downloadFile } from "@/utils/downloadFile";
import { menus, fileIcon } from "./common";
import type { GetArrayElementType } from "@/types/GetArrayElementType";

const props = defineProps(["ruid", "is_group", "nickname", "avatar"]);
const socket = useSocketStore();
const userStore = useUserStore();
const friendStore = useFriendStore();
const content = ref("");

const users = ref<{ nickname: string; avatar: string; id: number }[]>([]);
const error = ref(false);
const loading = ref(false);
const scrollRef = ref<HTMLDivElement | null>(null);

const commonParams = computed(() => ({
  cmd: Number(props.is_group) === 1 ? CmdEnum.group_chat : CmdEnum.private_chat,
  ruid: Number(props.ruid),
  is_group: Number(props.is_group),
  to_nickname: props.nickname,
  to_avatar: props.avatar,
  from_nickname: userStore.userInfo?.nickname,
  from_avatar: userStore.userInfo?.avatar,
}));

const send = () => {
  socket.send({
    ...commonParams.value,
    content: content.value || "Hello",
    type: MsgTypeEnum.text,
  });
};

const isMe = (id: number) => id === userStore.userInfo?.id;

const getAvatar = (id: number) => {
  if (isMe(id)) {
    return userStore.userInfo?.avatar;
  }
  const user = users.value.find((it) => it.id === id);
  return user ? user.avatar : "";
};

const getNickname = (id: number) => {
  if (isMe(id)) {
    return userStore.userInfo?.nickname;
  }
  const user = users.value.find((it) => it.id === id);
  return user ? user.nickname : "";
};

const list = computed(() => {
  const l = socket.list
    .filter((it) => {
      const isSend = it.suid === Number(props.ruid);
      const isReceive = it.ruid === Number(props.ruid);
      return (isSend || isReceive) && Number(it.is_group) === Number(props.is_group);
    })
    .map((it) => {
      return {
        ...it,
        is_me: isMe(it.suid),
        avatar: getAvatar(it.suid),
        nickname: getNickname(it.suid),
      };
    });

  return l;
});

const onLoad = async () => {

  if (loading.value) {
    return;
  }

  const el = document.querySelectorAll(".msg-item")[0];
  const id = el.getAttribute("id");

  loading.value = true;
  const l = socket.list.filter((it) => {
    const isSend = it.suid === props.ruid;
    const isReceive = it.ruid === props.ruid;
    return (isSend || isReceive) && Number(it.is_group) === Number(props.is_group);
  });

  try {
    await sleep(500);
    await socket.queryHistory({
      rid: props.ruid,
      seq: list.value.length ? list.value[0].time : 0,
      is_group: Number(props.is_group),
    });
    loading.value = false;
    setTimeout(() => {
      const $el = document.querySelector(`#${id}`) as HTMLDivElement;
      socket.scrollTo($el.offsetTop);
    }, 100);
  } catch (e: any) {
    loading.value = false;
    error.value = e.message;
  }
};

const onMount = () => {
  if (Number(props.is_group) === 0) {
    friendStore.queryProfile([props.ruid]).then((list) => {
      users.value = list;
    });
  } else {
    getUserListById({
      id: props.ruid,
    }).then((res) => {
      users.value = res.data.list;
    });
  }

  socket.markHasRead({
    pid: props.ruid,
    is_group: props.is_group
  });
};

const shiftDown = ref(false);

const onKeydown = (e: KeyboardEvent) => {
  const el: HTMLInputElement = e.target as any;
  if (!el || el.id !== 'chat-input') {
    return
  }

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftDown.value = true
  }

  if (e.code === 'Enter') {
    e.preventDefault();
    if (shiftDown.value) {
      // 换行
      content.value = content.value + '\n'
    } else {
      // 发送消息
      if (content.value.length) {
        send();
        content.value = '';
      }
    }
  }
}

const onKeyup = (e: KeyboardEvent) => {
  const el: HTMLInputElement = e.target as any;
  if (!el || el.id !== 'chat-input') {
    return
  }

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftDown.value = false;
  }
}

let markReadLoopRef = ref<undefined|number>();

const markReadLoop = () => {
  clearInterval(markReadLoopRef.value);
  markReadLoopRef.value = setInterval(() => {
    socket.markHasRead({
      pid: props.ruid,
      is_group: props.is_group
    });
  }, 1000) as unknown as number;
}

onMounted(() => {
  onMount();
  markReadLoop();
  document.addEventListener('keydown',onKeydown)
  document.addEventListener('keyup', onKeyup);
});

onUnmounted(() => {
  clearInterval(markReadLoopRef.value);
  document.removeEventListener('keydown',onKeydown)
  document.removeEventListener('keyup', onKeyup);
})

watchEffect(() => {
  scrollRef.value?.addEventListener("scroll", (e: Event) => {
    const top = (e.target as HTMLDivElement)!.scrollTop;
    if (top === 0) {
      onLoad();
    }
  });
});

const formatDate = (date: string) => {
  return dayjs(date).format("hh:mm:ss");
};

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  const form = new FormData();
  form.append("file", file.file);
  upload(form).then((res) => {
    if (res.data) {
      socket.send({
        ...commonParams.value,
        content: res.data.url,
        type: MsgTypeEnum.image,
        title: file.file.name,
      });
    }
  });
};

const afterReadFile = (file: any) => {
  const form = new FormData();
  form.append("file", file.file);
  upload(form).then((res) => {
    if (res.data) {
      socket.send({
        ...commonParams.value,
        content: res.data.url,
        title: file.file.name,
        type: MsgTypeEnum.file,
      });
    }
  });
};

const menuClick = async (item: GetArrayElementType<typeof menus>) => {
  if (item.key === "video_call") {
    if (!props.is_group) {
      socket.setDialUser({
        id: props.ruid,
        nickname: props.nickname,
        avatar: props.avatar,
      });
    }
    return;
  }

  if (item.key === "friend_call") {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: "audio",
    });
    recorder.startRecording();

    const sleep = (m: number) => new Promise((r) => setTimeout(r, m));
    Toast("录制3S");
    await sleep(3000);

    await recorder.stopRecording();
    let blob = await recorder.getBlob();

    const formData = new FormData();
    formData.append("file", blob);
    upload(formData).then((res) => {
      if (res.data) {
        socket.send({
          ...commonParams.value,
          content: res.data.url,
          type: MsgTypeEnum.audio,
        });
      }
    });
  }
};

const onKeypress = (v: Event) => {
  console.log(v)
}

const playAudio = (src: any) => {
  var sound = new Howl({
    src: [src],
  });
  console.log(sound);
  sound.play();
};

const fileDownload = (link: string, name: string) => {
  downloadFile(link, name);
};
</script>

<template>
  <div class="container">
    <div class="header">
      <img :src="props.avatar" alt="">
      <span>
        {{ props.nickname }}
      </span>
    </div>
    <div class="list" id="msg_list" ref="scrollRef">
      <div class="content" id="msg_content">
        <VanLoading class="list-loading" v-if="loading" size="small" />
        <div
          class="item msg-item"
          :class="{ 'is-me': item.is_me }"
          :id="'msg-item-' + item.time"
          v-for="item in list"
        >
          <div class="avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="main" :class="{ 'is-me': item.is_me }">
            <span class="time">{{ formatDate(item.create_time) }}</span>
            <div class="content" :class="'msg-content-type-' + item.type">
              <template v-if="item.type === 0">
                {{ item.content }}
              </template>
              <div
                v-if="item.type === 3"
                @click="fileDownload(item.content, item.title!)"
              >
                <span>{{ item.title || "文件" }}</span>
                <img class="msg-icon" :src="fileIcon" alt="" />
              </div>
              <img
                v-if="item.type === 1"
                style="max-width: 80%"
                :src="item.content"
                alt=""
              />
              <van-icon
                @click="playAudio(item.content)"
                v-if="item.type === 2"
                :size="20"
                name="volume-o"
              />
              <van-loading
                class="loading"
                v-if="item.loading"
                size="20px"
                type="spinner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="toolbar">
        <div class="card">
          <div class="grid-item" v-for="item in menus" :key="item.key">
            <div v-if="item.key === 'photo'">
              <van-uploader :after-read="afterRead">
                <div class="gird-box">
                  <img class="grid-icon" :src="item.icon" alt="" />
                </div>
              </van-uploader>
            </div>
            <div v-else-if="item.key === 'file'">
              <van-uploader
                :after-read="afterReadFile"
                accept="image/*,.pdj,.zip,.doc,.docx,.xml,.pptx"
              >
                <div class="gird-box">
                  <img class="grid-icon" :src="item.icon" alt="" />
                </div>
              </van-uploader>
            </div>
            <div v-else @click="menuClick(item)">
              <div class="gird-box">
                <img class="grid-icon" :src="item.icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form">
        <textarea
          id="chat-input"
          class="input"
          v-model="content"
          name="content"
          :placeholder="'正在和' + props.nickname + '对话'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" src="./index.less" scoped></style>