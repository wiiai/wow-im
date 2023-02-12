<template>
  <div class="video-box">
    <div class="box1">
      <video autoplay class="remote-video"></video>
    </div>
    <div class="box2">
      <video autoplay class="local-video"></video>
    </div>
  </div>
</template>

<style scoped>
.video-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.box1 {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  left: 0;
  height: calc(100% - 20px);
}
.remote-video {
  height: 100%;
  width: 100%;
}

.box2,
.local-video {
  width: 100px;
  height: 100px;
}

.box2{
  overflow: hidden;
  position: absolute;
  top: 0; 
  z-index: 999;
  right: 20px;
  border-radius: 50%;
}
</style>
