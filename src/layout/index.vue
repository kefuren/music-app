<template>
  <div>
    <Header />
    <SideBar />
    <PageBoard>
      <router-view></router-view>
    </PageBoard>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header'
import SideBar from '@/components/sidebar'
import PageBoard from '@/components/pageborad'
import Footer from '@/components/footer'
</script>

<style lang="scss" scoped>

</style>