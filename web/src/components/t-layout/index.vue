<template>
  <div class="t-layout">
    <div class="nav">
      <slot name="nav"></slot>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.t-layout {
  display: flex;
  height: 100%;
  .nav {
    overflow: auto;
    width: 240px;
    height: 100%;
    background-color: #f8f8fa;
    border-right: 1px solid #e1e1e7;
  }
  .main {
    flex: 1;
  }
}
</style>