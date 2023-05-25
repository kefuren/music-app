<template>
    <div class="page-container">
      <HighqualityEntrance 
        :data="playListState.highqualityFirst"
        @onClick="goHighquality"
      />
      <CatTabs :data="playListState.listHot" />

      <div class="flex card-list">
        <card
          class="card"
          v-for="item in playListState.playlist"
          :key="item.id"
          :item="item"
          square
          @onClick="goPlaylistDetial(item)"
        />
      </div>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, computed } from "vue";
import { useRouter } from 'vue-router'
import { usePlayList } from './hooks/playlist'

import HighqualityEntrance from './components/HighqualityEntrance.vue'
import CatTabs from './components/CatTabs.vue'
import Card from '@/components/card/card.vue'

const router = useRouter();

const { playListState, changeTag } = usePlayList();

provide('playlistMethods', {
  changeTag
})

const goHighquality = (path) => {
  sessionStorage.setItem('highquality', encodeURIComponent(JSON.stringify(playListState.highquality)));
  sessionStorage.setItem('highqualityTags', encodeURIComponent(JSON.stringify(playListState.highqualityTags)));
  router.push({
    name: 'playlist-highquality',
  })
}

const goPlaylistDetial = (item) => {
  router.push({
    path: `/playlist/${ item.id }`,
    query: {
      type: item.highQuality ? '精品歌单' : '歌单'
    }
  })
}
</script>

<style lang="scss" scoped>
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
</style>