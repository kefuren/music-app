<template>
    <div class="flex">
      <card 
        class="col-4"
        v-for="item in list"
        :key="item.id"
        :item="item"
        :showPlayBtn="false"
        @onClick="onCardClick(item)"
      >
        <template #cardDesc>
            <p>{{ item.name }}</p>
            <template v-for="(artist, index) in item.artists" :key="index">
              <span class="separator" v-if="index !== 0">/</span>
              <span class="text-link artist">{{ artist.name }}</span>
            </template>
        </template>
      </card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Card from '@/components/card/card.vue'

const props = defineProps({
  list: Array
})

</script>

<style lang="scss" scoped>
.separator {
  display: inline-block;
  margin: 0 2px;
  font-size: 12px;
}
.artist {
  font-size: 12px;
  color: #999;
}
</style>