<template>
  <div class="page" ref="pageRef">
    <div 
      v-if="currentCom === 'tracks' && showTitle"
      class="fixedtop column justify-between"
    >
      <h1 class="name">{{ detialState.details.name }}</h1>
      <div class="btn-group">
        <i class="iconfont icon-24gf-playCircle"></i>
        <i class="iconfont icon-xinjianwenjianjia"></i>
        <i class="iconfont icon-fenxiang"></i>
        <i class="iconfont icon-xiazai1"></i>
      </div>
    </div>
    <Intro 
      :data="detialState.details" 
      :type="type"
    />
    <TabBar 
      :data="tabList"
      :commentCount="detialState.details.commentCount"
      @onClick="tabClick"
      @search="searchSong($event)"
    />
    <!-- <router-view :data="routerData" /> -->
    <component :is="tabComponent" :data="compData"></component>
  </div>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, ref, shallowRef, computed } from "vue";
import { useRoute } from 'vue-router';
import { useDetails } from './hooks/details'

import Intro from './components/Intro.vue'
import TabBar from './components/TabBar.vue'

import tracks from './_id/tracks.vue'
import comment from './_id/comment.vue'
import subscribers from './_id/subscribers.vue'

import { throttle } from '@/utils/api'

const route = useRoute();
let { params, query } = route;
let type = query.type || '歌单';
const { detialState } = useDetails(params.id);

const pageRef = ref(null);
const showTitle = ref(false);


const tabList = ref([
  {name: '歌曲列表', component: 'tracks'},
  {name: '评论', component: 'comment'},
  {name: '收藏者', component: 'subscribers'},
]);
const comList = shallowRef({
  tracks,
  comment,
  subscribers
})
const currentCom = ref(tabList.value[0].component);
const tabComponent = shallowRef(comList.value[currentCom.value]);
const compData = computed(() => {
  if (currentCom.value === 'tracks') {
    return songs.value;
  }
  return detialState[currentCom.value];
});

const searchKey = ref('');
const songs = computed(() => {
  return detialState.tracks.filter((track) => {
    return track.name.includes(searchKey.value);
  });
})

const _handleScroll = throttle(handleScroll, 100);
onMounted(() => {
  window.addEventListener('scroll', _handleScroll, true);
})

watch(currentCom, (newVal) => {
  tabComponent.value = comList.value[newVal];
})

const tabClick = (tab) => {
  currentCom.value = tab.component;
}

const searchSong = (value) => {
  searchKey.value = value;
}

function handleScroll(e) {
  let dom = pageRef.value;
  // 窗口可视范围的高度
  let clientHeight = document.body.clientHeight;
  // 滚动条距离顶部的距离
  let scrollTop = dom.scrollTop;
  // 文档内容实际高度
  let contentHeight = dom.scrollHeight;
  // 滚动条距离底部的高度
  let scrolllBtmHeight = contentHeight - scrollTop - clientHeight;

  showTitle.value = scrollTop >= 140;
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', _handleScroll, true)
})
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  padding: 0 30px;
  overflow-y: auto;
}
.fixedtop {
  position: fixed;
  top: 50px;
  left: 200px;
  z-index: 2;
  width: 100%;
  height: 80px;
  padding: 5px 30px;
  background: #fff;
  border-bottom: solid 2px rgba(0,0,0,.05);
  .name {
    height: 30px;
    font-size: 22px;
    font-weight: bold;
  }
  .btn-group {
    .iconfont {
      font-size: 22px;
      margin-right: 25px;
    }
    .icon-24gf-playCircle {
      color: #E75E4D;
    }
  }
}
</style>