<template>
  <div class="tracks">
    <table>
      <thead>
        <tr>
          <td style="width: 100px;"></td>
          <td style="width: 260px">音乐标题</td>
          <td style="width: 120px">歌手</td>
          <td style="width: 150px">专辑</td>
          <td style="width: 100px;">时长</td>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in tracks"
          :key="item.id"
          @dblclick="onDblclick(item)"
        >
          <td>
            <div class="first-td">
              <p class="order">
                <em 
                  class="text-gray-1" 
                  v-if="!item.play"
                >{{ fillZero(index + 1) }}</em>
                <i 
                  class="iconfont icon-shengyin03-mianxing" 
                  v-else-if="item.play && !store.state.playState"
                ></i>
                <i 
                  v-else 
                  class="iconfont icon-shengyin01-mianxing"
                ></i>
              </p>
              <span class="text-gray-2" style="margin: 0 8px 0 15px;">
                <i 
                  v-if="!item.like" 
                  class="iconfont icon-xihuan1 text-link" 
                  title="喜欢" 
                  @click="item.like = !item.like"
                ></i>
                <i 
                  v-else 
                  class="iconfont icon-xihuan text-link" 
                  title="取消喜欢" 
                  @click="item.like = !item.like"
                ></i>
              </span>
              <span><i class="iconfont icon-xiazai1 text-link"></i></span>
            </div>
          </td>
          <td>
            <span :class="{'play-text': item.play}">{{ item.name }}</span>
            <span 
              class="text-gray-3 alia" 
              v-if="item.alia.length"
            >({{ item.alia[0] }})</span>
          </td>
          <td>
            <template v-for="(artist, index) in item.ar" :key="index">
              <span class="separator" v-if="index !== 0">/</span>
              <span class="text-link text-gray-2">{{ artist.name }}</span>
            </template>
          </td>
          <td 
            class="text-link text-gray-2" 
            style="width: 22%;"
          >
            <span>{{ item.al.name }}</span>
          </td>
          <td><span class="text-gray-1">{{ dateFormat(item.dt, 'mm:ss') }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onUpdated, ref, watch } from "vue";
import { useStore } from 'vuex'

import {
  checkMusicService,
  getSongUrlService
} from '@/services/playlist'

import { fillZero, dateFormat } from '@/utils/api'
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
})
const store = useStore();

const tracks = computed(() => props.data);
const curPlayId = ref('');

const onDblclick = async (item) => {
  if (curPlayId.value == item.id) {
    store.commit('SET_PLAY_STATE', !store.state.playState);
    return;
  }
  const isok = await checkMusic(item.id);
  if (!isok) return;
  const source = await getSongUrlService({ id: item.id, level: 'exhigh' });
  console.log('source:', source)
  store.commit('SET_SOURCE', source.data[0]);
  setCurrentPlay(item);
  setPlayState(item);
}

function checkMusic(id) {
  return new Promise(async (resolve, reject) => {
    const res = await checkMusicService(id);
    if (!res.success) {
      alert(res.message)
    }
    resolve(res.success);
  })
}

function setCurrentPlay(item) {
  let info = {
    id: item.id,
    picUrl: item.al.picUrl,
    name: item.name,
    alia: item.alia[0],
    ar: item.ar,
    duration: item.dt,
    playList: props.data
  }

  store.commit('SET_CURRENT_PLAYING', info);
}

function setPlayState(item) {
  curPlayId.value = item.id;
  props.data.forEach(s => { s.play = false });
  item.play = true;

  store.commit('SET_PLAY_STATE', true);
}

onUpdated(() => {
  let playId = store.state.currentPlaying.id || '' ;
  for (let i = 0; i < tracks.value.length; i ++) {
    let item = tracks.value[i];
    if (item.id == playId) {
      item.play = true;
      break
    }
  }
})

</script>

<style lang="scss" scoped>
.tracks {
  margin: 0 -28px;
}
table {
  width: 100%;
  font-size: 12px;
  border-spacing: unset;
  table-layout: fixed;
  tr {
    height: 35px;
  }
  td {
    padding: 0 5px;
  }
  thead {
    color: #999;
  }
  thead td:not(:first-child):hover {
    background: #f2f2f3;
  }
  tbody tr:nth-child(odd){
    background: #fafafa;
  }
  tbody tr:hover {
    background: #f2f2f3;
  }
  tbody td {
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;
  }
}

.separator {
  display: inline-block;
  margin: 0 2px;
  font-size: 12px;
}

.text-gray-1 {
  color: #cdcdcd;
}
.text-gray-2 {
  color: #666;
}
.text-gray-3 {
  color: #999;
}
.alia {
  margin-left: 5px;
}
.icon-xihuan {
  color: #E75E4D;
  &:hover {
    color: #E75E4D !important;
  }
}

.first-td {
  text-align: center;
  span {
    vertical-align: middle;
  }
}

.order {
  display: inline-block;
  width: 15px;
  margin-left:10px;
  em {
    font-style: normal;
    font-size: 12px;
  }
  .icon-shengyin03-mianxing,
  .icon-shengyin01-mianxing {
    vertical-align: middle;
    color: #E75E4D;
  }
}
.play-text {
  color: #E75E4D;
}
</style>