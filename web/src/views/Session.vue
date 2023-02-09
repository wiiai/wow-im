<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import type { ISession } from "@/types/ISession";
import dayjs from "dayjs";
import { computed } from "vue";
import MChat from "./chat-win/index.vue";

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
  <div class="container">
    <v-navigation-drawer width="260">
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
    </v-navigation-drawer>
    <template v-if="socketStore.currentChat">
      <MChat
        :rid="Number(socketStore.currentChat.rid)"
        :is_group="Number(socketStore.currentChat!.is_group || 0)"
        :nickname="socketStore.currentChat!.nickname"
        :avatar="socketStore.currentChat!.avatar"
      />
    </template>
  </div>
</template>

<style scoped lang="less">
.list {
  border-right: 1px solid #f1f1f1;
}

.container {
  height: 100%;
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
