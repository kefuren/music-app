<template>
  <div class="login">
    <div class="tool-bar relative-position">
      <i 
        class="close iconfont icon-cuowuguanbiquxiao text-link absolute"
        @click="close"
      ></i>
    </div>
    <router-view></router-view>
    <!-- <QrcodeLogin />-->
  </div>
</template>

<script setup>
import QrcodeLogin from './QrcodeLogin.vue'
import PhoneLogin from './PhoneLogin.vue'

const close = () => {
  electronAPI.closeLoginWin();
}
</script>

<style lang="scss" scoped>
.tool-bar {
  height: 40px;
  width: 100%;
  -webkit-app-region: drag;
}
.tool-bar .close {
  top: 10px;
  left: 10px;
}
</style>