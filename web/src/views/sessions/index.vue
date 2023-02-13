<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import type { ISession } from "@/types/ISession";
import dayjs from "dayjs";
import { computed } from "vue";
import MChat from "../chat-win/index.vue";
import TLayout from "../TLayout.vue";

const socketStore = useSocketStore();

const goChat = (row: ISession) => {
  socketStore.setCurrentChat({
    rid: `${row.partner_id}`,
    nickname: row.nickname,
    avatar: row.avatar,
    is_group: Number(row.is_group),
  });
};
const formatDate = (date: string) => dayjs(date).format("MM/DD hh:mm");
const vList = computed(() => socketStore.sessionList.map((it) => ({ ...it })));
</script>

<template>
  <TLayout>
    <template v-slot:nav>
      <div
        class="item"
        v-for="item in vList"
        @click="goChat(item)"
        :class="{
          active:
            socketStore.currentChat &&
            +socketStore.currentChat.rid === item.partner_id,
        }"
      >
        <div class="avatar">
          <span class="badge" v-if="item.unread">{{ item.unread }}</span>
          <img :src="item.avatar" alt="" />
        </div>
        <div class="main">
          <div class="head">
            <div class="name">{{ item.nickname }}({{ item.partner_id }})</div>
            <div class="date" v-if="item.last_message?.create_time">
              {{ formatDate(item.last_message?.create_time) }}
            </div>
          </div>
          <div class="content">
            <template v-if="item.last_message">
              <div v-if="item.last_message.type === 1">[图片]</div>
              <div v-else-if="item.last_message.type === 3">[文件]</div>
              <div v-else>{{ item.last_message.content || "" }}</div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:main>
      <template v-if="socketStore.currentChat">
        <MChat
          :rid="Number(socketStore.currentChat.rid)"
          :is_group="Number(socketStore.currentChat!.is_group || 0)"
          :nickname="socketStore.currentChat!.nickname"
          :avatar="socketStore.currentChat!.avatar"
        />
      </template>
      <div class="m-box" v-else>
        <div class="morning"></div>
        <span class="tip">美好的一天又开始了～</span>
      </div> 
    </template>
  </TLayout>
</template>

<style scoped lang="less">
.scroll {
  overflow: auto;
  height: 100%;
}

.m-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .tip {
    position: relative;
    margin-top: -20px;
    margin-right: -20px;
    color: #888;
  }
}

.morning {
  display: inline-block;
    height: 224px;
    min-height: 224px;
    min-width: 224px;
    position: relative;
    width: 224px;
    &::before {
      background-image: url(../chat-win/sprite.png);
      background-position: -1008px 0;
      background-repeat: no-repeat;
      content: " ";
      height: 448px;
      left: 0;
      min-height: 224px;
      min-width: 224px;
      position: absolute;
      top: 0;
      transform: scale(.5);
      transform-origin: top left;
      width: 448px;
    }
}

.item {
  display: flex;
  padding: 10px 12px;
  cursor: pointer;
  border-left: 2px solid transparent;
  &.active {
    background: #ddd;
  }
  .avatar {
    position: relative;
    width: 42px;
    height: 42px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .badge {
      position: absolute;
      right: -6px;
      top: -6px;
      font-size: 12px;
      color: #fff;
      padding: 2px;
      min-width: 14px;
      z-index: 2;
      line-height: 12px;
      background-color: red;
      border-radius: 6px;
      text-align: center;
    }
  }
  .main {
    flex: 1;
    .head {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .name {
      line-height: 25px;
      font-size: 14px;
      color: #272832;
    }
    .date {
      font-size: 12px;
      color: rgba(39, 40, 50, 0.4);
    }
    .content {
      font-size: 13px;
      line-height: 20px;
      color: rgba(39, 40, 50, 0.6);
    }
  }
}
</style>
