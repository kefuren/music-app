<template>
  <div class="intro flex">
    <div class="cover-box">
        <img :src="data.coverImgUrl" alt="" srcset="">
    </div>
    <div class="detail">
      <div class="head flex items-center">
        <span class="type">{{ type }}</span>
        <h1 class="name">{{ data.name }}</h1>
      </div>
      <div class="creator flex items-center relative-position">
        <div class="avatar">
          <img :src="data.creator?.avatarUrl" alt="" srcset="">
        </div>
        <div class="identityIcon absolute">
          <img :src="data.creator?.avatarDetail?.identityIconUrl" alt="" srcset="">
        </div>
        <span class="text-caption nickname link-blue">{{ data.creator?.nickname }}</span>
        <span class="text-caption createTime">{{ dateFormat(data.createTime, 'yyyy-MM-dd') }}创建</span>
      </div>
      <div class="count flex clearfix">
        <div class="count-btn play flex items-center justify-center">
          <i class="iconfont icon-bofang"></i>
          <span class="btn-text">播放全部</span>
          <i class="iconfont icon-zengjia"></i>
        </div>
        <div class="count-btn subscribed flex items-center justify-center">
          <i class="iconfont icon-xinjianwenjianjia"></i>
          <span class="btn-text">收藏({{numberFormat(data.subscribedCount)}})</span>
        </div>
        <div class="count-btn share flex items-center justify-center">
          <i class="iconfont icon-fenxiang"></i>
          <span class="btn-text">分享({{numberFormat(data.shareCount)}})</span>
        </div>
        <div class="count-btn down flex items-center justify-center">
          <i class="iconfont icon-xiazai1"></i>
          <span class="btn-text">下载全部</span>
        </div>
      </div>
      <div class="tags">
        <div class="text-caption">
          <span class="label">标签</span>:
          <template v-for="(tag, index) in data.tags" :key="index">
            <span class="separator" v-if="index !== 0">/</span>
            <span class="link-blue">{{ tag }}</span>
          </template>
        </div>
      </div>
      <div class="flex text-caption">
          <div class="flex">
            <span class="label">歌曲数</span>:&nbsp;
            <span style="color:#666">{{ numberFormat(data.trackCount) }}</span>
          </div>
          <div style="margin-left:15px">
            <span class="label">播放数</span>:
            <span style="color:#666">{{ numberFormat(data.playCount) }}</span>
          </div>
        </div>
        <div class="album-desc text-caption">
          <div class="desc flex items-baseline">
            <span class="label">简介</span>:&nbsp;
            <span 
              class="desc-text" 
              :class="{'ellipsis': isEllipsis}"
              v-html="data.description"
              v-if="data.description"
            ></span>
            <!-- <div> -->
              <i :class="descIconClass" @click="isEllipsis = !isEllipsis"></i>
            <!-- </div> -->
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { dateFormat, numberFormat } from '@/utils/api'

const props = defineProps({
  data: null,
  type: {
    type: String,
    default: '歌单'
  }
})

const isEllipsis = ref(true);

const descIconClass = computed(() => 
  'iconfont ' + (isEllipsis.value ? 'icon-caret-down' : 'icon-caret-up')
)

function tagsFormat(tags) {
  return tags.join(' / ');
}
</script>

<style lang="scss" scoped>
.intro {
  width: 100%;
  // height: 200px;
  margin: 10px 0;
  .cover-box {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
  }
  .detail {
    flex: 1;
    margin-left: 30px;
    .head {
      .type {
        height: 18px;
        padding: 0 5px;
        margin-right: 10px;
        font-size: 12px;
        color: red;
        border: solid 1px red;
        border-radius: 3px;
      }
      .name {
        flex: 1;
        height: 30px;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .creator {
      margin: 15px 0;
      font-size: 12px;
      .avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
      }
      .identityIcon {
        width: 11px;
        height: 11px;
        left: 16px;
        top: 12px;
      }
      .nickname {
        margin: 0 8px;
      }
      .createTime {
        color: #666;
      }
    }
    .count {
      margin: 20px 0;
      
      color: #333;
      .count-btn {
        height: 30px;
        margin-right: 10px;
        padding: 0 10px;
        font-size: 12px;
        border: solid 1px #e3e3e3;
        border-radius: 30px;
        overflow: hidden;
        .btn-text {
          margin-left: 2px;
        }
        .iconfont {
          font-size: 18px;
        }
        .icon-zengjia {
          height: 100%;
          display: inline-block;
          border-left: solid 1px rgba(225, 225, 225, 0.2);
          padding-left: 10px;
          margin-left: 10px;
          font-size: 16px;
          line-height: 30px;
        }
      }
      .count-btn.play {
        color: #fff;
        background: #E75E4D;
      }
      .count-btn.play:hover {
        background: #D75344;
      }
      .count-btn:hover {
        background: #f2f2f2;
      }
    }
    .album-desc {
      width: 100%;
      .desc-text {
        width: 400px;
        flex: 1;
        line-height: 1.5rem;
        color: #666;
      }
      .icon-caret-down,
      .icon-caret-up {
        color: #999;
      }
    }
  }
}


.label {
  width: 40px;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
  color: #333;
}
.separator {
  display: inline-block;
  margin: 0 2px;
}
.link-blue {
  cursor: pointer;
  color: #3360AF;
}
.link-blue:hover {
  color: #1901c7;
}
</style>