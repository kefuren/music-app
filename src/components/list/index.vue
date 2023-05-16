<template>
  <div>
    <div class="list" :class="classes">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  separator: Boolean,
  bordered: Boolean,
  padding: Boolean
})

const classes = computed(() => 
      (props.bordered === true ? 'w--bordered' : '')
    + (props.padding === true ? ' w--padding' : '')
    + (props.separator === true ? ' w--separator' : '')
)

</script>

<style lang="scss" scoped>
.w {
  &--bordered {
    border: 1px solid rgba(0, 0, 0, .12);
  }
  &--padding {
    padding: 8px 0;
  }
  &--separator {
    > .list-item + .list-item {
      border-top: 1px solid rgba(0, 0, 0, .12);
    }
  }
}

</style>