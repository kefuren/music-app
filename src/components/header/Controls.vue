<template>
  <div class="allow-group" v-if="!store.state.playInfoShow">
    <button 
      :class="{'link--active': hasPrevious}" 
      :disabled="!hasPrevious"
      @click="handlePrevious"
    >
      <i class="iconfont icon-xiangzuojiantou"></i>
    </button>
    <button 
      :class="{'link--active': hasNext}" 
      :disabled="!hasNext"
      @click="handleNext"
    >
      <i class="iconfont icon-xiangyoujiantou"></i>
    </button>
  </div>
  <div v-else style="line-height: 28px;margin-left: 78px;">
    <i 
      class="iconfont icon-xiangxiajiantou" 
      style="font-size:14px;cursor: pointer;"
      @click="setPlayInfoShow"  
    ></i>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


const router = useRouter();
const store = useStore();

const hasPrevious = ref(false);
const hasNext = ref(false);

watch(() => router.currentRoute.value.fullPath, (newVal, oldVal) => {
  if (newVal !== '/personalized' && oldVal !== '/') {
    hasPrevious.value = true;
  }
  if (window.history.state.back == null) {
    hasPrevious.value = false;
  }
  hasNext.value = (window.history.length - window.history.state.position) !== 1;
})

const windowClose = () => {
  window.electronAPI.windowClose()
}
const windowMin = () => {
  window.electronAPI.windowMin()
}
const windowMax = () => {
  window.electronAPI.windowMax()
}

const handlePrevious = () => {
  router.go(-1);
}

const handleNext = () => {
  router.go(1);
}

const setPlayInfoShow = () => {
  store.commit('SET_PLAY_INFO_SHOW', false)
}
</script>

<style lang="scss" scoped>
.control-btns {
  width: 100%;
  height: 100%;
}
.traffic-light {
  margin-top: 10px;
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
  }
}
.close-btn {
  background: #ec6a5e;
}
.mini-btn {
  background: #f5c04f;
}
.max-btn {
  background: #62c755;
}

.allow-group {
  float: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 100%;
  button {
    outline: none;
    border: none;
    background: none;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    font-weight: 600;
    i {
      font-size: 14px;
    }
    
  }
  .link--active {
    &:hover {
      background: #ECECEC;
    }
  }
  button[disabled] {
    background: none;
  }
}
</style>