<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watchEffect } from "vue";

import { CmdEnum } from "@/types/IMessagePayload";
import { useUserStore } from "@/stores/user";
import Page from "@/components/Page.vue";
import { useFriendStore } from "@/stores/friend";
import fileIcon from "@/assets/img/file_fill.svg";
import { getUserListById } from "@/service/group";
import dayjs from "dayjs";
import { sleep } from "@/utils/sleep";
import { upload } from "@/service/upload";
import { MsgTypeEnum } from "@/types/IMessage";
import { RecordRTCPromisesHandler } from "recordrtc";
import { Form, Toast } from "vant";
import { Howl, Howler } from "howler";
import { downloadFile } from "@/utils/downloadFile";
import { menus } from './common'
import type { GetArrayElementType } from "@/types/GetArrayElementType";

const route = useRoute();
const socket = useSocketStore();
const userStore = useUserStore();
const friendStore = useFriendStore();
const content = ref("");
const isShowMedia = ref(false);
const users = ref<{ nickname: string; avatar: string; id: number }[]>([]);
const toggleMedia = () => (isShowMedia.value = !isShowMedia.value);
const rid = route.query.rid as string;
const is_group = Number(route.query.is_group || 0);
const route_nickname = route.query.nickname as string;
const route_avatar = route.query.avatar as string;

const error = ref(false);
const loading = ref(false);
const hasMore = ref(true);

const scrollRef = ref<HTMLDivElement | null>(null);

const commonParams = {
  cmd: is_group ? CmdEnum.group_chat : CmdEnum.private_chat,
  rid: Number(rid),
  is_group: Boolean(is_group),
  to_nickname: route_nickname,
  to_avatar: route_avatar,
  from_nickname: userStore.userInfo?.nickname,
  from_avatar: userStore.userInfo?.avatar,
};

const send = () => {
  socket.send({
    ...commonParams,
    content: content.value || "Hello",
    type: MsgTypeEnum.text,
  });
};

const isMe = (id: number) => {
  return id === userStore.userInfo?.id;
};

const getAvatar = (id: number, is_group?: boolean) => {
  if (isMe(id)) {
    return userStore.userInfo?.avatar;
  }
  const user = users.value.find((it) => it.id === id);
  return user ? user.avatar : "";
};

const getNickname = (id: number, is_group?: boolean) => {
  if (isMe(id)) {
    return userStore.userInfo?.nickname;
  }
  const user = users.value.find((it) => it.id === id);
  return user ? user.nickname : "";
};

const list = computed(() => {
  const l = socket.list
    .filter((it) => {
      const isSend = it.suid === Number(rid);
      const isReceive = it.rid === Number(rid);
      return (isSend || isReceive) && Number(it.is_group) === is_group;
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
  // return l.slice(-(pageNum.value + 1) * 10);
});

const onLoad = async () => {
  if (loading.value) {
    return;
  }

  const el = document.querySelectorAll(".msg-item")[0];
  const id = el.getAttribute("id");

  loading.value = true;
  const l = socket.list.filter((it) => {
    const isSend = it.suid === Number(rid);
    const isReceive = it.rid === Number(rid);
    return (isSend || isReceive) && Number(it.is_group) === is_group;
  });

  try {
    await sleep(500);
    await socket.queryHistory({
      rid,
      seq: list.value.length ? list.value[0].time : 0,
      is_group: Boolean(is_group),
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
  if (!is_group) {
    friendStore.queryProfile([Number(rid)]).then((list) => {
      users.value = list;
    });
  } else {
    getUserListById({
      id: rid,
    }).then((res) => {
      users.value = res.data.list;
    });
  }

  socket.markHasRead({
    pid: Number(rid),
  });
};

onMounted(() => {
  onMount();
});

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
  console.log("afterRead", file.file);
  const form = new FormData();
  form.append("file", file.file);
  upload(form).then((res) => {
    if (res.data) {
      socket.send({
        ...commonParams,
        content: res.data.url,
        type: MsgTypeEnum.image,
        title: file.file.name,
      });
    }
  });
};

const afterReadFile = (file: any) => {
  console.log("afterReadFile", file.file);
  const form = new FormData();
  form.append("file", file.file);
  upload(form).then((res) => {
    if (res.data) {
      socket.send({
        ...commonParams,
        content: res.data.url,
        title: file.file.name,
        type: MsgTypeEnum.file,
      });
    }
  });
};

const menuClick = async (item: GetArrayElementType<typeof menus>) => {
  if (item.key === "video_call") {
    if (!is_group) {
      socket.setDialUser({
        id: +rid,
        nickname: route_nickname,
        avatar: route_avatar,
      });
    }
    return;
  }

  if (item.key === "yuyin_call") {
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
          ...commonParams,
          content: res.data.url,
          type: MsgTypeEnum.audio,
        });
      }
    });
  }
};

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
  <Page :title="route_nickname">
    <div class="container">
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
        <div class="form">
          <van-field
            class="input"
            v-model="content"
            name="content"
            placeholder="输入"
            clearable
            :rules="[{ required: true, message: '请输入' }]"
          />
          <van-button class="btn" size="small" @click="send"> 发送 </van-button>
          <van-icon class="icon-plus" name="add-o" @click="toggleMedia" />
        </div>
        <div class="card" v-if="isShowMedia">
          <div class="grid-item" v-for="item in menus" :key="item.key">
            <div v-if="item.key === 'photo'">
              <van-uploader :after-read="afterRead">
                <div class="gird-box">
                  <img class="grid-icon" :src="item.icon" alt="" />
                  <span class="grid-text">{{ item.text }}</span>
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
                  <span class="grid-text">{{ item.text }}</span>
                </div>
              </van-uploader>
            </div>
            <div v-else @click="menuClick(item)">
              <div class="gird-box">
                <img class="grid-icon" :src="item.icon" alt="" />
                <span class="grid-text">{{ item.text }}</span>
              </div>
            </div>
          </div>
          <!-- <van-grid :column-num="5">
            <van-uploader>
              <van-button icon="plus" type="primary">上传文件</van-button>
            </van-uploader>
            <van-grid-item icon="photo-o" text="照片" />
            <van-grid-item icon="miniprogram-o" text="拍摄" />
            <van-grid-item icon="back-top" text="位置" />
            <van-grid-item icon="video-o" text="视频" />
            <van-grid-item icon="volume-o" text="语音" />
          </van-grid> -->
        </div>
      </div>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  .list {
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  }
  .footer {
    width: 100%;
    background-color: #fff;
    .card {
      display: flex;
      border-top: 1px solid #f5f5f5;
      .grid-item {
        flex: 1;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
      .grid-icon {
        width: 24px;
      }
      .grid-text {
        font-size: 13px;
        margin-top: 2px;
        color: #333;
      }
      .gird-box {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
      }
    }
    .form {
      display: flex;
      align-items: center;
      .input {
        flex: 1;
        margin: 12px;
        padding: 4px 6px;
        margin-right: 12px;
        background-color: #eff2f2;
      }
      .btn {
        margin-right: 12px;
      }
      .icon-plus {
        font-size: 24px;
        margin-right: 12px;
      }
    }
  }
}

.list-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.msg-icon {
  width: 40px;
  vertical-align: middle;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 10px;
  &.is-me {
    justify-content: flex-end;
    flex-direction: row-reverse;
    text-align: right;
    .avatar {
      margin-right: 0;
      margin-left: 10px;
    }
  }

  .time {
    position: absolute;
    bottom: -20px;
    right: 2px;
    font-size: 12px;
    color: #666;
  }

  .main {
    flex: 1;
    .content {
      position: relative;
      display: inline-block;
    }
    .loading {
      position: absolute;
      right: -26px;
      bottom: 10px;
    }
    &.is-me {
      .loading {
        position: absolute;
        left: -28px;
        bottom: 10px;
        right: unset;
      }
    }
  }

  .content {
    padding: 10px 12px;
    border-radius: 6px;
    position: relative;
    display: inline-block;
    word-break: break-all;
    line-height: 16px;
    max-width: 100%;
    text-align: left;
  }

  .msg-content-type-1 {
    text-align: right;
  }

  .msg-content-type-0,
  .msg-content-type-2,
  .msg-content-type-3 {
    background-color: #fff;
  }

  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
}
</style>
