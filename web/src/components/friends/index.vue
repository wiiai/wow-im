<script lang="ts" setup>
import { onMounted } from "vue";
import { useFriendStore } from "@/stores/friend";

const friendStore = useFriendStore();
const props = defineProps(["clickItem"]);

onMounted(() => {
  if (!friendStore.list.length) {
    friendStore.queryFriend();
  }
});
</script>

<template>
  <div class="list">
    <div
      class="item"
      v-for="item in friendStore.list"
      @click="props.clickItem(item)"
    >
      <div class="avatar">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="main">
        <div class="name">
          <span v-if="item.is_group">[群]</span>
          <span>{{ item.nickname }}({{ item.id }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
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
    width: 40px;
    height: 40px;
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
    display: flex;
    align-items: center;
    .head {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .name {
      line-height: 20px;
      font-size: 14px;
      color: #202325;
    }
    .date {
      font-size: 12px;
      color: #bcbdbe;
    }
    .content {
      font-size: 12px;
      line-height: 20px;
      color: #8b8d8f;
    }
  }
}
</style>
