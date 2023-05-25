<template>
  <div 
    class="page-container flex justify-between"  
    ref="pageContainerRef"
  >
    <div class="left">
      <div class="title text-link flex items-center" @click="router.go(-1)">
        <i class="iconfont icon-xiangzuojiantou"></i>
        <h4>MV详情</h4>
      </div>
      <div class="video-box">

      </div>
    </div>
    <div class="right">
      <div class="title text-link">
        <h4>相关推荐</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const pageContainerRef = ref(null);
let pageBoard = null;
let paddingLeft = ''
let zIndex = ''
let background = ''

onMounted(() => {
  pageBoard = pageContainerRef.value.parentNode.parentNode;
  
  getPageBoardStyle();
  
})

function getPageBoardStyle() {
  let pageBoardStyle = window.getComputedStyle(pageBoard);
  paddingLeft = pageBoardStyle.paddingLeft;
  zIndex = pageBoardStyle.zIndex;
  background = pageBoardStyle.background;
  setPageBoardStyle(false);
}

function setPageBoardStyle(isReset) {
  if (!isReset) {
    pageBoard.style.paddingLeft = 0;
    pageBoard.style.zIndex = 3;
    pageBoard.style.background = '#fff';
  } else {
    pageBoard.style.paddingLeft = paddingLeft;
    pageBoard.style.zIndex = zIndex;
    pageBoard.style.background = background;
  }

}

onBeforeUnmount(() => {
  setPageBoardStyle(true);
})

</script>

<style lang="scss" scoped>
.title {
  padding: 15px 0;
  font-weight: 500;
}
.left {
  width: 620px;
  .video-box {
    width: 100%;
    height: 350px;
    border-radius: 5px;
    overflow: hidden;
    background: #000;
  }
}
.right {
  width: 290px;
}
.icon-xiangzuojiantou {
  margin-right: 5px;
  font-size: 12px;
}
</style>