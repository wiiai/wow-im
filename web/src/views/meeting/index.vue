<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useCall as receiveUseCall } from "./utils/receive.js";
import { useCall } from "./utils/call.js";
import { socket, useSocketStore } from "@/stores/socket";
import Friends from "./friends/index.vue";
import TLayout from "@/components/t-layout/index.vue";
import MeetingDetail from './detail/index.vue';

const userStore = useUserStore();
const videoRef = ref<HTMLVideoElement | null>(null);
const socketStore = useSocketStore();
</script>

<template>
  <TLayout>
    <template v-slot:main>
      <MeetingDetail />
    </template>
  </TLayout>
</template>

<style lang="less" scoped>
.main {
  padding: 20px;
  text-align: center;
  video {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
}
</style>
