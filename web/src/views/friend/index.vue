<script lang="ts" setup>
import { useRouter } from "vue-router";
import TLayout from "@/components/t-layout/index.vue";
import type { IContact } from "@/types/IContact";
import { useSocketStore } from "@/stores/socket";
import Friends from "@/components/friends/index.vue";

const router = useRouter();
const socketStore = useSocketStore();

const goChat = (row: IContact) => {
  socketStore.setCurrentChat({
    rid: `${row.id}`,
    nickname: row.nickname,
    avatar: row.avatar,
    is_group: Number(false),
  });
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
