<template>
  <list class="list column" style="height:340px">
    <list-item 
      class="list-item"
      v-for="(item, index) in data"
      :key="item.id"
      :width="'50%'"
      :height="110"
      border
    >
      <div class="item-container flex items-center">
        <div class="item-avatar relative-position">
          <img class="" v-lazy="item.coverUrl" :key="item.coverUrl" alt="">
        </div>
        <div class="item-main">
          <p class="name ellipsis-2-lines">
            {{ item.name }}
          </p>
          <p class="brand text-link text-caption">
            {{ item.dj.brand }}
          </p>
        </div>
      </div>
    </list-item>
  </list>
</template>

<script setup>
import { computed, ref } from "vue";

import list from '@/components/list2/list.vue'
import listItem from '@/components/list2/item.vue'

const props = defineProps({
  list: Array
})
const data = computed(() => props.list);

</script>

<style lang="scss" scoped>
.list-item{
  &:nth-child(n+4){
    margin-left: 3%;
  }
}
.list-item:nth-child(1),
.list-item:nth-child(4) {
  border-top: solid 1px rgba(0,0,0,.05);
}
.item-container {
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: solid 1px rgba(0, 0, 0, .05);
}
.item-avatar {
  width: 90px;
  height: 90px;
  border-radius: 5px;
  overflow: hidden;
}
.item-main {
  flex: 1;
  padding: 0 20px;
  .name {
    font-size: 14px;
  }
  .brand {
    color: #999;
  }
}
</style>