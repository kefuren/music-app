<template>
  <ul :class="listClass" ref="listRef">
    <slot></slot>
  </ul>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  bordered: {
    type: Boolean,
    default: true
  }
})
const listRef = ref(null);
const listClass = computed(() => props.bordered ? 'list-bordered' : '')

</script>

<style lang="scss" scoped>
.list-bordered {
  // border-top: solid 1px rgba(0,0,0,.05);
  // border-bottom: solid 1px rgba(0,0,0,.05);
}
</style>