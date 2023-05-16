<template>
    <div class="page">
      <h4 class="title">精品歌单</h4>
      <div class="flex">
        <div class="card flex" :class="cardClass" v-for="item in highquality" :key="item.id">
          <div class="cover relative-position text-link" @click="goRouter(item)">
            <div 
              class="card__playcount absolute text-caption">
              <i class="iconfont icon-24gl-play"></i>
              <span>{{ numberFormat(item.playCount) }}</span>
            </div>

            <img :src="item.coverImgUrl" alt="">

            <div class="highquality absolute-top" v-if="item.highQuality">
              <i class="iconfont icon-icon-test absolute"></i>
            </div>

            
          </div>
          <div class="desc ellipsis">
            <p class="name text-link ellipsis" @click="goRouter(item)">{{ item.name }}</p>
            <p class="creator text-link">
              by&nbsp;&nbsp;{{ item.creator.nickname }}
              <i class="identityIconUrl" :style="`background-image: url(${item.creator?.avatarDetail?.identityIconUrl})`"></i>
            </p>
            <p class="">
              <span class="tags">{{ item.tag }}</span>&nbsp;
              <span class="copywriter ellipsis">{{ item.copywriter }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { numberFormat, throttle } from '@/utils/api'

const router = useRouter();

const highquality = ref([]);
const highqualityTags = ref([]);

const rowNum = ref(2);
const cardClass = computed(() => 'col-' + rowNum.value);

onMounted(async () => {
  highquality.value = JSON.parse(decodeURIComponent(sessionStorage.getItem('highquality'))) || []
  highqualityTags.value = JSON.parse(decodeURIComponent(sessionStorage.getItem('highqualityTags'))) || [];

  window.onresize = throttle(setRowNum, 500);
})

const goRouter = (item) => {
  router.push({
    path: `/playlist/${item.id}`,
    query: { type: '精品歌单' }
  })
}

function setRowNum() {
  let cw = document.documentElement.clientWidth;
  rowNum.value = cw > 1250 ? 3 : 2;
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  padding: 0 30px;
  // overflow-y: auto;
}
.title {
  padding: 20px 0 10px 0;
}
.card {
  height: 135px;
  // width: 340px;
  margin-bottom: 25px;
  .cover {
    width: 135px;
    height: 135px;
    border-radius: 5px;
    overflow: hidden;
  }
  .card__playcount {
    position: absolute;
    top: 0;
    right: 5px;
    z-index: 1;
    color: #fff;
    i {
      font-size: 12px;
      font-weight: 600;
    }
  }
  .highquality {
    width: 0;
    height: 0;
    border-top: solid 30px #e9b373;
    border-right: solid 30px transparent;
    .icon-icon-test {
      left: 0;
      top: -32px;
      transform: rotate(-45deg);
      color: #fff;
      font-size: 20px;
    }
  }
  .identityIconUrl {
    display: inline-block;
    width: 13px;
    height: 13px;
    vertical-align: -2px;
    background-size: cover;
  }
  .desc {
    flex: 1;
    padding: 20px 0 0 10px;
    .name {
      color: #333;
      font-size: 14px;
    }
    .creator {
      display: inline-block;
      margin: 10px 0 20px 0;
      font-size: 12px;
      color: #999;
      &:hover {
        color: #666 !important;
      }
    }
    .tags {
      display: inline-block;
      padding: 0 3px;
      font-size: 10px;
      color: #c3473a;
      border: solid 1px #c3473a;
      border-radius: 3px;
    }
    .copywriter {
      display: inline-block;
      width: 50%;
      vertical-align: middle;
      font-size: 12px;
      color: #cdcdcd;
    }
  }
}
</style>