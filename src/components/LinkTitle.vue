<template>
  <div class="link-title">
    <router-link :to="to">
      <span class="title"><slot></slot></span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(['title', 'to'])

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