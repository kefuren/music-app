<template> 
    <div class="page-container">
      <template v-if="isRenderFinish">
        <Carousel :list="state.banners" />
        <div 
          v-for="item in NAVS" 
          :key="item.key"
        >
          <link-title :to="`/${item.key}`">
            {{ item.name }}
          </link-title>

        <keep-alive>
          <component
            :is="compList[item.key]"
            :list="state[item.key]"
            v-if="isRenderFinish"
          ></component>
        </keep-alive>
        </div>
      </template>
      <div class="lodding flex justify-center items-center" v-else>
        <span>正在为您生成个性化设置...</span>
      </div>

      <div class="sort-bar column items-center justify-center">
        <p class="">现在可以根据个人喜好，自由调整首页栏目顺序啦~</p>
        <div class="btn" @click="showBarList">调整栏目顺序</div>
        <SortBar :list="NAVS" v-model="isShowBarList" />
      </div>

    </div>
</template>

<script setup>
import { onMounted, reactive, ref, shallowRef } from "vue";

import { getBannerService } from '@/services/banner'
import { getRecommendPlaylistService } from '@/services/playlist'
import { getPrivatecontentService } from '@/services/privatecontent'
import { getNewSongService } from '@/services/song'
import { getPersonalizedMVService } from '@/services/mv'
import { getProgramRecommendService } from '@/services/dj'


import playlist from './components/playlist.vue'
import privatecontent from './components/privatecontent.vue'
import mv from './components/mv.vue'
import newsong from './components/newsong.vue'
import dj from './components/dj.vue'

import Carousel from './components/carousel.vue'
import LinkTitle from '@/components/LinkTitle.vue'
import SortBar from './components/SortBar.vue'

const NAVS = [
  {
    name: "推荐歌单",
    key: "playlist",
  },
  {
    name: "独家放送",
    key: "privatecontent",
  },
  {
    name: "最新音乐",
    key: "newsong",
  },
  {
    name: "推荐MV",
    key: "mv",
  },
  {
    name: "播客",
    key: "dj",
  },
];
const compList = shallowRef({
  playlist,
  privatecontent,
  mv,
  newsong,
  dj
});
const isRenderFinish = ref(false);
const state = reactive({
  banners: [],
  privatecontent: [],
  newsong: [],
  playlist: [],
  mv: [],
  dj: [],
})
const isShowBarList = ref(false);

onMounted(async () => {
  getDatas(
    [
      getBannerService(),
      getRecommendPlaylistService({ limit: 9 }),
      getPrivatecontentService(),
      getNewSongService(),
      getPersonalizedMVService(),
      getProgramRecommendService()
    ]
  )
})

async function getDatas(requests) {
  Promise.all(requests)
  .then(
    (
      [
        { banners },
        { result: playlist },
        { result: privatecontent },
        { result: newSong },
        { result: mv },
        { programs: dj },
      ]
    ) => {
      state.banners = banners;
      state.playlist = playlist;
      state.privatecontent = privatecontent;
      state.newsong = newSong;
      state.mv = mv;
      state.dj = dj;
      
      isRenderFinish.value = true;
    }
  )
}

const showBarList = () => {
  isShowBarList.value = true
}

</script>

<style lang="scss" scoped>
.lodding {
  width: 100%;
  height: 200px;
  font-size: 14px;
}

.sort-bar {
  font-size: 12px;
  height: 100px;
  padding: 40px 0;
  box-sizing: content-box;
  p {
    color: #999;
  }
  .btn {
    margin-top: 15px;
    border: solid 1px #c3473a;
    border-radius: 30px;
    padding: 5px 20px;
    color: #c3473a;
  }
}
</style>