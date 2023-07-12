<template>
  <div class="search-container">
    <div class="search">
      <template v-if="!searchWord">
        <div class="search-history" v-if="searchHistory.length">
          <div class="title">搜索历史<i class="iconfont icon-lajitong text-link" @click="clearSearch"></i></div>
          <div class="search-tags flex" ref="searchTagsRef">
            <div class="tag-item" v-for="item in searchHistory" :key="item.searchWord">
              {{ item.searchWord }}
            </div>
          </div>
        </div>
        <div class="hot">
          <div class="title">热搜榜</div>
          <div class="list">
            <div 
              v-for="(item, index) in hotData"
              :key="index"
              class="item flex items-center"
              @click="onClick(item)"
            >
              <div class="order">{{ index + 1 }}</div>
              <div class="item-info">
                <div class="right flex">
                  <span class="searchWord">{{ item.searchWord }}</span>
                  <i v-if="item.iconUrl" class="icon">
                    <img :src="item.iconUrl" alt="">
                  </i>
                  <span class="score">{{ item.score }}</span>
                </div>
                <div class="content ellipsis">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
        
      </template>
      <template v-else>
        <div class="search-suggest">
          <p style="padding:0 8px">搜“<span style="color: #3371bc">{{ searchWord }}</span>”相关的结果 ></p>
          <template v-if="suggestData">
            <div
              v-for="(item, index) in suggestData.order" 
              :key="index"
            >
              <div class="suggest-item">
                <p class="suggest-title">
                  <i :class="`iconfont icon-${ orderMap[item].icon }`"></i>
                  <span>{{ orderMap[item].name }}</span>
                </p>
                <div class="content" v-for="cItem in suggestData[item]" :key="cItem.id">
                  <div class="ellipsis">
                    <span v-html="highlight(cItem.name, searchWord)"></span>
                    <span v-if="cItem.alias?.length" style="color:#999">
                      &nbsp;(<span v-html="highlight(cItem.alias[0], searchWord)"></span>)
                    </span>
                    <span v-if="cItem.artists">-
                      <span v-for="art in cItem.artists" :key="art.id" >
                        <span v-html="highlight(art.name, searchWord)"></span>&nbsp;
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch, watchEffect } from "vue";
import { getSearchHotService, getSearchSuggestService } from '@/services/search'
import { debounce } from '@/utils/api'
import { useStore } from 'vuex'

const emits = defineEmits(['onClick']);
const props = defineProps({
  searchWord: {
    type: String,
    default: ""
  }
})
const store = useStore();

const hotData = ref(null);
const suggestData = ref({});
const searchHistory = computed(() => store.state.searchHistory);
const searchTagsRef = ref(null);

const orderMap = ref({
  songs: {
    name: "单曲",
    icon: "yinle3"
  },
  artists: {
    name: "歌手",
    icon: "geren"
  },
  albums: {
    name: "专辑",
    icon: "zhuanjiguangpan"
  },
  playlists: {
    name: "歌单",
    icon: "gedan"
  },
})

watchEffect(async () => {
  await getSearchHotService().then(res => hotData.value = res.data);
})

watch(() => props.searchWord, (newVal) => search(newVal))

const search = debounce(async (keyword) => {
  await getSearchSuggestService(keyword).then(res => suggestData.value = res.result);
}, 800);

const onClick = (item) => {
  store.commit('SET_SEARCH_HISTORY', item);
  emits('onClick', item);
}

const clearSearch = () => {
  store.commit('SET_SEARCH_HISTORY', []);
}

function highlight(text, keyword) {
  if (keyword.length) {
    let keywordArr = keyword.split("");
    text = text + "";
    keywordArr.forEach(item => {
      if (text.indexOf(item) !== -1 && item !== "") {
        text = text.replace(new RegExp(item, 'g'), '<span style="color:#3371bc">'+ item + '</span>')
      }
    })
    return text;
  }
  return text;
}

</script>

<style lang="scss" scoped>
.search-container{
  position: fixed;
  top: 51px;
  right: 0;
  z-index: 9;
  width: 340px;
  height: calc(100% - 111px);
  background: #fff;
  box-shadow: 0 -2px 5px #0000001f;
}
.search {
  width: 100%;
  height: 100%;
  padding-top: 8px;
  overflow-y: auto;
  .search-history {
    .icon-lajitong {
      margin-left: 5px;
    }
    .search-tags {
      width: 100%;
      max-height: 60px;
      padding: 0 10px;
      margin-bottom: 15px;
      overflow: hidden;
    }
    .search-tags .tag-item {
      height: 25px;
      line-height: 25px;
      padding: 0 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      border: solid 1px #ddd;
      border-radius: 35px;
    }
  }
  .title {
    padding: 0 10px 15px;
    font-size: 14px;
    color: #666;
  }

  .list .item {
    width: 100%;
    height: 50px;
    padding: 5px 0;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
    }
  }

  .list .item:nth-child(-n+3) .order {
    color: red;
  }
  .list .item:nth-child(-n+3) .searchWord {
    color: #000;
    font-weight: bold;
  }

  .list .item-info {
    width: 80%;
  }
  .item .order {
    width: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
  }
  .item-info .icon {
    width: 25px;
    height: 10px;
    margin-left: 5px;
  }
  .item-info .score {
    margin-left: 10px;
    color: #ccc
  }
  .item-info .content {
    color: #999;
    line-height: 1.6rem;
  }
}

.search-suggest {
  // padding: 0 10px;
}
.suggest-item {
  .suggest-title {
    margin: 15px 0 5px 5px;
    font-size: 13px;
    color: #999;
  }
  .suggest-title i {
    display: inline-block;
    margin-right: 5px;
    // vertical-align: middle;
  }
  .content {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 25px;
    &:hover {
      background: #f2f2f2;
    }
  }
}

i {
  vertical-align: middle;
}
</style>