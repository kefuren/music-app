<template>
  <div class="page-container">
    <CatTabs :data="catList" v-model="currentCat" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getVideoTimelineAllService, getVideoCategoryService } from '../../services/video'

import CatTabs from '../../components/CatTabs.vue'

const catList = ref([])
const currentCat = ref('现场')


onMounted(async () => {
  await getVideoCategoryService().then(res => {
    console.log(res)
    catList.value = res.data
  })
})

</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 20px;
}
</style>