<template>
  <div class="flex">
    <card
      class="col-4"
      v-for="item in list"
      :key="item.id"
      :item="item"
      :showCount="false"
      :showPlayBtn="false"
      :ellipsisLines="2"
      @onClick="goMvDetail(item)"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from '@/components/card/card.vue'

const props = defineProps({
  list: Array
})

const router = useRouter();

const goMvDetail = (item) => {
  router.push(`/mv/${item.id}`)
}

</script>

<style lang="scss" scoped>

</style>