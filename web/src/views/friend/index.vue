<script lang="ts" setup>
import type { IContact } from "@/types/IContact";
import { useRouter } from "vue-router";
import TLayout from "@/components/t-layout/index.vue";
import { useSocketStore } from "@/stores/socket";
import Friends from "@/components/friends/index.vue";
import { toRaw } from "vue";

const router = useRouter();
const socketStore = useSocketStore();

const goChat = (row: {
  id: number;
  nickname: string;
  avatar: string;
  is_group: number;
}) => {
  const data = {
    ruid: row.id,
    nickname: row.nickname,
    avatar: row.avatar,
    is_group: row.is_group,
  }

  socketStore.setCurrentChat(data);

  const list = socketStore.sessions.filter((it) => {
    return Number(it.is_group) === Number(row.is_group) && String(it.ruid) === String(row.id)
  });

  if (!list.length) {
    console.log(list.length)
    socketStore.addSession(data)
  }

  router.push("/");
};
</script>

<template>
  <TLayout>
    <template v-slot:nav>
      <Friends :click-item="goChat" />
    </template>
  </TLayout>
</template>

<style scoped lang="less">
</style>
