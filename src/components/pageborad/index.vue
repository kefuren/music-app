<template>
  <div v-if="true">
    <Header />
    <SideBar />
    <div class="page-board">
      <div class="page-board-container">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
  <div v-else>
    <Header />
    <div class="">无侧边栏显示</div>
    <Footer />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Header from '@/components/header'
import SideBar from '@/components/sidebar'
// import PageBoard from '@/components/pageborad'
import Footer from '@/components/footer'

const store = useStore();
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