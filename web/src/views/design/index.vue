<template>
  <div>
    <input class="input" type="text" v-model="content" />
  </div>
</template>

<script lang="ts" setup>
import { socketInstance, useSocketStore } from "@/stores/socket";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const socket = useSocketStore();
const content = ref("hello");
const canvas = ref("");
const route = useRoute();

onMounted(() => {
  socketInstance.on('async', (v) => {
    console.log(`async`, v)
    content.value = v.data.content;
  })
});

watch(content, (v) => {
  socket.async(route.query.room_id as unknown as number, {
    content: content.value,
  });
});
</script>

<style lang="less" scoped>
.input {
  padding: 10px;
  margin: 12px;
  border: 1px solid #f5f5f5;
}
</style>