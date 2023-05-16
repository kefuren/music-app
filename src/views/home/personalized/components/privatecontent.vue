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
      @onClick="onCardClick"
    />
  </div>
</template>

<script setup>
import Card from '@/components/card/card.vue'

const props = defineProps({
  list: Array
})

const onCardClick = () => {}

</script>

<style lang="scss" scoped>

</style>