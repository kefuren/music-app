<template>
  <div class="traffic-light flex absolute">
    <div class="round close-btn" @click="windowClose"><i class="iconfont icon-cuowuguanbiquxiao"></i></div>
    <div class="round mini-btn" @click="windowMin"><i class="iconfont icon-suoxiao"></i></div>
    <div class="round max-btn" @click="windowMax"><i class="iconfont icon-"></i></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const windowClose = () => {
  window.electronAPI.windowClose()
}
const windowMin = () => {
  window.electronAPI.windowMin()
}
const windowMax = () => {
  window.electronAPI.windowMax()
}
</script>

<style lang="scss" scoped>
.traffic-light {
  margin-top: 10px;
  position: absolute;
  height: fit-content;
  z-index: 999;
}
.round {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  text-align: center;
  line-height: 8px;
  border-radius: 50%;
  i {
    font-size: 10px;
    font-weight: bold;
    opacity: 0;
  }
}
.traffic-light:hover i {
  opacity: 1;
}

.close-btn {
  background: #ec6a5e;
}
.mini-btn {
  background: #f5c04f;
}
.max-btn {
  position: relative;
  background: #62c755;
}

.max-btn i::before {
  content: "";
  position: absolute;
  left: 3px;
  bottom: 3px;
  border-top: solid 2px transparent;
  border-right: solid 2px transparent;
  border-bottom: solid 2px #3f8137;
  border-left: solid 2px #3f8137;
}
.max-btn i::after {
  content: "";
  position: absolute;
  right: 3px;
  top: 3px;
  border-top: solid 2px #3f8137;
  border-right: solid 2px #3f8137;
  border-bottom: solid 2px transparent;
  border-left: solid 2px transparent;
}
</style>