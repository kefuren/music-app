<template>
  <div class="main">
    <!-- <router-view /> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name"  />
  </router-view> 
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  // padding: 0 30px;
  overflow-y: auto;
}
</style>