<script lang="ts" setup>
import Page from "@/components/Page.vue";
import { useSocketStore } from "@/stores/socket";
import type { ISession } from "@/types/ISession";
import dayjs from "dayjs";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const socketStore = useSocketStore();

const goChat = (row: ISession) => {
  router.push({
    path: "/chat",
    query: {
      rid: row.partner_id,
      nickname: row.nickname,
      avatar: row.avatar,
      is_group: Number(row.is_group),
    },
  });
};
const formatDate = (date: string) => dayjs(date).format("MM-DD hh:mm:ss");
const vList = computed(() => socketStore.sessionList.map(it => ({ ...it })));
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 0 }">
    <div class="item" v-for="item in vList" @click="goChat(item)">
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
            <div v-if="item.last_message.type === 3">[文件]</div>
            <div v-else>{{ item.last_message.content || "" }}</div>
          </template>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped lang="less">
.item {
  display: flex;
  padding: 10px 12px;
  .avatar {
    position: relative;
    width: 48px;
    height: 48px;
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
      justify-content: space-between;
    }
    .name {
      line-height: 25px;
      font-size: 18px;
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
