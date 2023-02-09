<template>
  <div class="page">
    <div class="header" v-if="title">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    </div>
    <div
      class="body"
      :class="[
        {
          'with-tab-bar': Boolean(tabBarProps),
          'with-header': Boolean(title),
        },
      ]"
    >
      <slot></slot>
    </div>
    <!-- <template v-if="tabBarProps">
      <TabBar :activeIndex="tabBarProps.activeIndex" />
    </template> -->
  </div>
</template>

<script lang="ts">
import TabBar from "./TabBar.vue";
import { Tab, Tabs, NavBar } from "vant";
import { useRouter } from "vue-router";
export default {
  components: {
    TabBar,
    Tab,
    Tabs,
    [NavBar.name]: NavBar,
  },
  props: {
    tabBarProps: {
      type: Object,
      default() {
        return null;
      },
    },
    title: {
      type: String,
    },
  },
  setup() {
    const router = useRouter();
    return {
      onClickLeft() {
        router.back();
      },
    };
  },
};
</script>

<style lang="less" scoped>
.page {
  position: relative;
}

.body {
  height: 100%;
  overflow: hidden;
}

/**.with-header {
  height: calc(100% - 46px);
}

.with-tab-bar {
  height: calc(100% - 50px);
}

.with-header.with-tab-bar {
  height: calc(100% - 96px);
}**/
</style>