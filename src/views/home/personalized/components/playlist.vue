<template>
  <div class="flex">
    <!-- 每日歌曲推荐 -->
    <div 
      class="card relative-position col-5 card--square"
    >
      <div class="card__img-container">
        <div class="filter-box absolute-top"></div>
        <div class="absolute-top idv">
          <span>根据您的音乐口味生成每日更新</span>
        </div>
        <h1 class="date absolute-center">{{ currentDate }}</h1>
        <p class="day">星期{{ currentDay }}</p>
        <div class="card__play-btn absolute">
          <i class="iconfont icon-bofang1"></i>
        </div>
      </div>
      <div class="card__section">
        <span class="desc-text text-link">
          每日歌曲推荐
        </span>
      </div>
    </div>

    <card
      class="col-5"
      v-for="item in list"
      :key="item.id"
      :item="item"
      square
      @onClick="goRoute(item)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from 'vue-router'

import Card from '@/components/card/card.vue'

const props = defineProps({
  list: Array
});

const router = useRouter();

const currentDate = computed(() => new Date().getDate());
const currentDay = computed(() => {
  let day = ["日", "一", "二", "三", "四", "五", "六"];  
  let week = new Date().getDay(); 
  return day[week]
})

const goRoute = (item) => {
  router.push(`/playlist/${item.id}`)
}
</script>

<style lang="scss" scoped>
.card__play-btn {
  opacity: 0;
}
.card__img-container:hover .card__play-btn,
.card__img-container:hover .idv {
  opacity: 1;
  transition: all .2s linear;
}
.filter-box {
  width: 100%;
  height: 100%;
  background-image: url("https://p2.music.126.net/457V7GCxxmw9vfO16PZEpg==/109951163937759685.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(8px);
}
.idv {
  padding: 5px;
  background: rgba(0,0,0,.3);
  z-index:2;
  opacity: 0;
  span {
    color: #fff;
    font-size: 12px;
  }
}
.date {
  font-size: 50px;
  font-weight: bold;
  color: #fff;
}
.day {
  position: absolute;
  width: 100%;
  bottom: 10px;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

</style>