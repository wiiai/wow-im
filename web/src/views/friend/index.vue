<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFriendStore } from "@/stores/friend";
import TLayout from "../TLayout.vue";
import type { IContact } from "@/types/IContact";

const router = useRouter();
const friendStore = useFriendStore();

const goChat = (row: IContact) => {
  let is_group = 0;
  if ("is_group" in row) {
    is_group = Number(row.is_group);
  }

  router.push({
    path: "/chat",
    query: {
      rid: row.id,
      nickname: row.nickname,
      avatar: row.avatar,
      is_group,
    },
  });
};

onMounted(() => {
  if (!friendStore.list.length) {
    friendStore.queryFriend();
  }
});
</script>

<template>
  <TLayout>
    <template v-slot:nav>
      <div class="item" v-for="item in friendStore.list" @click="goChat(item)">
        <div class="avatar">
          <img :src="item.avatar" alt="" />
        </div>
        <div class="main">
          <div class="name">{{ item.nickname }}</div>
        </div>
      </div>
    </template>
  </TLayout>
</template>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
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
  }
}
</style>
