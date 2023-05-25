<template>
  <div>
    <!-- 红绿灯 -->
    <TrafficLight />
    <!-- 全屏显示 -->
    <div v-show="isFullScreen">
      <FullScreenPage />
    </div>

    <div v-show="!isFullScreen">
      <Header />
      <SideBar />
      <div class="page-board">
        <div class="page-board-container">
          <router-view></router-view>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import TrafficLight from '../TrafficLight.vue'
import Header from '@/components/header'
import SideBar from '@/components/sidebar'
// import PageBoard from '@/components/pageborad'
import Footer from '@/components/footer'
import FullScreenPage from '@/components/FullScreenPage.vue'
import { onMounted, ref } from 'vue';

const store = useStore();

const isFullScreen = ref(false);

onMounted(() => {
  try {
    window.electronAPI.enterFullScreen(() => {
      isFullScreen.value = true
    })
    window.electronAPI.leaveFullScreen(() => {
      isFullScreen.value = false
    })
  } catch (error) {
    
  }
})



</script>

<style lang="scss">
.page-board {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0 60px 200px;
  box-sizing: border-box;
}
.page-board-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

</style>