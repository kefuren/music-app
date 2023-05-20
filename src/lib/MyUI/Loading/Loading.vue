<template>
  <teleport to="body">
    <div class="loading">
      <div class="content absolute-center">
        <img src="" alt="">
        <span>{{ message }}</span>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";

const message = ref('default message');
const delay = ref(1000);

const show = (message, delay) => {
  message.value = message;
  delay.value = delay
}

const hide = () => {}
</script>

<style lang="scss" scoped>
.loading {
  z-index: 9;
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
    color: #fff;
    background: rgba(0, 0, 0, .5);
  }
}
</style>