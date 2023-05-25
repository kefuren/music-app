<template>
  <div class="page-container">
    <h3 class="title">官方榜</h3>
    <div
      class="top-list-official flex" 
      v-for="item in state.official" 
      :key="item.id"
    >
      <div class="cover-image relative-position" @click="goPlaylistDetial(item.id)">
        <img :src="item.coverImgUrl" alt="">
        <span class="updateTime absolute-center">{{ updateTime11(item.updateTime) }}</span>
      </div>
      <ul class="list relative-position">
        <template v-if="isRenderFinish">
          <li 
            class="list-item"
            v-for="(cItem, index) in getTracks(state.playlist[item.id])" 
            :key="cItem.id"
            :style="`height:${ 170 / 5 }px; line-height:${ 170 / 5 }px`"
          >
            <div class="flex justify-between">
              <div>
                <span class="order">{{ index + 1 }}</span>
                <span style="color:#333">{{ cItem.name }}</span>
              </div>
              <p class="flex" style="color: #999">
                <span v-for="(ar, i) in cItem.ar" :key="ar.id" class="text-link">
                  <em style="margin-right:3px">{{ i == 0 ? '' : '|' }}</em>
                  {{ ar.name }}
                </span>
              </p>
            </div>
          </li>
          <div 
            class="absolute text-link" 
            style="font-size:12px; color:#666;left:10px; bottom:-20px"
            @click="goPlaylistDetial(item.id)"
          >查看全部
            <i class="iconfont icon-xiangyoujiantou" style="font-size:10px;vertical-align: 1px;"></i>
          </div>
        </template>
        <template v-else>
          <div class="loading-box">加载中...</div>
        </template>
      </ul>
    </div>

    <h3 class="title">全球榜</h3>
      <div class="flex card-list">
        <card
          class="card top-list-worldwide"
          v-for="item in state.worldwide"
          :key="item.id"
          :item="item"
          square
          :playBtnCenter="true"
          @onClick="goPlaylistDetial(item.id)"
        />
      </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { useRouter } from 'vue-router'
import { getToplistService } from '@/services/toplist'
import { getPlaylistDetailService } from '@/services/playlist'
import { dateFormat } from '@/utils/api'

import Card from '@/components/card/card.vue'

const router = useRouter()

const state = reactive({
  official: [],
  worldwide: [],
  playlist: {}
})
const isRenderFinish = ref(false);

watchEffect(getToplist);

const updateTime11 = computed(() => (updateTime) => {
  let date = dateFormat(updateTime, 'MM-dd').split('-');
  return date[0] + '月' + date[1] + '日更新';
});

const getTracks = computed(() => (playlist) => {
  return playlist.tracks.slice(0, 5);
});

const goPlaylistDetial = (id) => {
  router.push({
    path: `/playlist/${ id }`
  })
}

async function getToplist() {
  const d = await getToplistService();
  let officialIds = [];

  d.list.forEach(item => {
    if (item.ToplistType) {
      state.official.push(item);
      officialIds.push(item.id);
    } else {
      state.worldwide.push(item);
    }
  })
  
  getToplistDetails(officialIds);
}

function getToplistDetails (ids) {
  let promises = ids.map((item) => {
    return getPlaylistDetailService(item);
  });

  Promise.all(promises).then((res) => {
    res.forEach(item => {
      let id = item.playlist.id
      state.playlist[id] = item.playlist
    })

    isRenderFinish.value = true;
    
  })

}

</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 30px;
  max-width: 1100px;
}
.title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
}
.top-list-official {
  width: 100%;
  margin-bottom: 50px;
  .list {
    flex: 1;
    margin-left: 30px;
  }
  .list-item {
    padding: 0 10px;
    font-size: 12px;
    border-radius: 5px;
    &:hover {
      background: #f5f5f5 !important;
    }
  }
  .list-item:nth-child(odd) {
    background: #fafafa;
  }
  .list-item:nth-child(-n + 3) .order {
    color: red;
  }
  .list-item .order {
    margin-right: 10px;
    color: #999;
    font-weight: 500;
  }
  .cover-image {
    width: 172px;
    height: 172px;
    border-radius: 5px;
    overflow: hidden;
  }
  .updateTime {
    top: 68%;
    font-size: 12px;
    color: #fff;
  }
  .loading-box {
    text-align: center;
    line-height: 170px;
    font-size: 12px;
    color: #999;
  }
}

.card-list {
  margin-left: -18px;
}

.card {
  width: 25%;
  padding-left: 18px;
}

@media (min-width: 1060px) {
  .card {
    width: 20%;
  }
}

@media (min-width: 1180px) {
  .card {
    width: 16.65%;
  }
}
</style>