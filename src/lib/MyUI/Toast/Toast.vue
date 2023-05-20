<template>
  <transition name="my-ui-toast-fede">
    <div class="toast" v-show="visible">
      <div class="content absolute-center">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, toRefs, watch } from "vue";

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 1500
  }
})

const state = reactive({
  visible: false
})

const { visible } = toRefs(state);

let t = null;

const setVisible = (visible) => {
  return new Promise(resolve => {
    state.visible = visible;
    t = setTimeout(() => {
      resolve('');
      clearTimeout(t);
      t = null;
    }, 200);
  });
}

defineExpose({
  setVisible,
  state
})

</script>

<style lang="scss" scoped>
.my-ui-toast-fede-enter-from,
.my-ui-toast-fede-leave-to {
  opacity: 0;
}

.my-ui-toast-fede-enter-active {
  transition: opacity .2s ease-in
}

.my-ui-toast-fede-leave-active {
  transition: opacity .2s ease-out
}

.toast {
  z-index: 9;
  width: 100%;
  height: 100%;
  .content {
    padding: 20px;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, .5);
  }
}
</style>