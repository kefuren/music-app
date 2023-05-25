<template>
  <div class="link-title flex justify-between items-center">
    <router-link :to="to">
      <span class="title"><slot></slot></span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </router-link>
    <slot name="tagsSlot"></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  to: [ String, Object ]
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}

.link-title {
  padding: 24px 0 12px 0;
}
</style>