<template>
  <div class="tab-bar">
    <van-tabbar route>
      <template v-for="item in menus">
        <van-tabbar-item  replace :to="item.path" :icon="item.icon" :badge="item.dot" v-if="item.dot">
          {{ item.span }}
        </van-tabbar-item>
        <van-tabbar-item  replace :to="item.path" :icon="item.icon" v-else>
          {{ item.span }}
        </van-tabbar-item>
      </template>
    </van-tabbar>
    <!-- <div
      @click="handleClick(item, index)"
      class="tab-bar-item"
      :class="{ 'is-active': index === activeIndex }"
      v-for="(item, index) in menus"
      :key="index"
    >
      <van-icon
        class="icon"
        :name="item.activeIcon"
        v-if="index === activeIndex"
      />
      <van-icon class="icon" :name="item.icon" v-else />
      <span class="span">{{ item.span }}</span>
    </div> -->
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { ref, computed, defineComponent } from "vue";
import { Icon } from "vant";
import { useSocketStore } from "@/stores/socket";

interface IMenu {
  span: string;
  icon: string;
  activeIcon: string;
  path: string;
  dot?: number;
}

export default defineComponent({
  components: {
    [Icon.name]: Icon,
  },

  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const router = useRouter();
    const socketStore = useSocketStore();
    const active = ref(0)

    const menus = computed(() => {
      return [
        {
          span: "消息",
          icon: "chat-o",
          activeIcon: "chat",
          path: "/",
          dot: socketStore.unReadNum
        },
        {
          span: "通讯录",
          icon: "friends-o",
          activeIcon: "friends",
          path: "/friend",
        },
        {
          span: "我的",
          icon: "manager-o",
          activeIcon: "manager",
          path: "/me",
        },
      ] as IMenu[];
    });

    const handleClick = (item: IMenu, index: number) => {
      index;
      router.push(item.path);
    };

    return {
      menus,
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-bar {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  box-shadow: 1px 1px 10px -3px #e6e1e1;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
  }
  .span {
    font-size: 10px;
    margin-top: 3px;
  }
  .icon {
    font-size: 20px;
  }
  .is-active {
    color: var(--theme-color-brand);
  }
}
</style>
