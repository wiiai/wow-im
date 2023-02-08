<template>
  <div class="video-box">
    <video
      autoplay
      controls
      class="remote-video"
      style="
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 10000;
        left: 0;
        height: 300px;
      "
    ></video>
    <video
      autoplay
      controls
      class="local-video"
      style="
        position: absolute;
        top: 0;
        width: 160px;
        z-index: 10000;
        right: 0;
        height: 100px;
      "
    ></video>
  </div>
</template>
