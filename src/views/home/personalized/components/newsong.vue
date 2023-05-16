<template>
  <list class="list column" style="height:400px">
    <list-item 
      class="list-item"
      v-for="(item, index) in data"
      :key="item.id"
      :width="'50%'"
      :height="80"
      active
      border
    >
      <div class="item-container flex items-center">
        <div class="item-avatar" @click="play(item)">
          <img :src="item.picUrl" alt="">
          <div class="play-btn absolute-center">
            <i class="iconfont icon-bofang1"></i>
          </div>
        </div>
        <div class="order">
          <em class="" v-if="!item.play">{{ fillZero(index + 1) }}</em>
          <i v-else class="iconfont icon-shengyin01-mianxing"></i>
        </div>
        <div class="item-main">
          <p class="name ellipsis">
            {{ item.name }}
            <span class="transName" v-if="item.song.transName || item.song.alias.length">({{ item.song.transName || item.song.alias[0] }})</span>
          </p>
          <template v-for="(artist, index) in item.song.artists" :key="index">
            <span class="separator" v-if="index !== 0">/</span>
            <span class="text-link artist">{{ artist.name }}</span>
          </template>
        </div>
      </div>
    </list-item>
  </list>
</template>

<script setup>
import { ref, computed } from "vue";

import list from '@/components/list2/list.vue'
import listItem from '@/components/list2/item.vue'

import { fillZero } from '@/utils/api'

const props = defineProps({
  list: Array
})
const data = computed(() => props.list);

const play = (item) => {
  item.play = !item.play;
}

</script>

<style lang="scss" scoped>
.list-item{
  &:nth-child(n+6){
    margin-left: 3%;
  }
}
.item-container {
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: solid 1px rgba(0, 0, 0, .05);
}
.list-item:nth-child(1),
.list-item:nth-child(6) {
  border-top: solid 1px rgba(0,0,0,.05);
}
.item-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}
.play-btn {
  width: 25px;
  height: 25px;
  margin: auto;
  text-align: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, .6);
  .icon-bofang1 {
    font-size: 10px;
    color: red;
  }
}
.order {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  em {
    font-style: normal;
    font-size: 12px;
    color: #adadad;
  }
  .icon-shengyin01-mianxing {
    color: red;
  }
}
.item-main {
  .name {
    width: 210px;
    font-size: 14px;
  }
  .transName {
    margin-left: 3px;
    color: #999;
  }
  .artist {
    font-size: 12px;
    color: #666;
  }
}
.separator {
  display: inline-block;
  margin: 0 2px;
  font-size: 12px;
}
</style>