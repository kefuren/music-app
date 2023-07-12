<template>
  <!-- <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name"  />
  </router-view> -->

  <router-view />
</template>