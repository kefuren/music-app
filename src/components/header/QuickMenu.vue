<template>
  <div>
    <ul class="">
      <li class="item clearfix">
        <SearchBox />
      </li>
      <li class="item clearfix">
        <div class="fun setting">
          <i class="iconfont icon-shezhi"></i>
        </div>
      </li>
      <li class="item clearfix">
        <div class="fun mail">
          <i class="iconfont icon-xinfeng"></i>
        </div>
      </li>
      <li 
        class="item clearfix" 
        @click="skinShow = true"
      >
        <div class="fun skin">
          <i class="iconfont icon-yifu"></i>
        </div>
      </li>
      <li class="item clearfix">
        <div class="zoom">
          <i class="iconfont icon-igw-l-enlarge-1"></i>
        </div>
      </li>
    </ul>
    <div 
      class="skin-box flex justify-around items-center" 
      v-if="skinShow"
      @mouseleave="skinShow = false"
    >
      <div 
        class="skin-item skin-light" 
        v-for="(item, index) in skins" 
        :key="item.name"
        @click="darkMode(item.color, index)"
      >
        <div class="color" :class="item.color">
          <i class="iconfont icon-gou" v-if="curIdx === index" :style="`color:${ index == 0 ? '#c3473a' : '#fff' }`"></i>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SearchBox from './SearchBox.vue'

const skinShow = ref(false);
const skinBoxRef = ref(null);
const curIdx = ref(1)

const skins = ref([
  {
    name: '浅色',
    color: 'light'
  },
  {
    name: '红色',
    color: 'red'
  },
  {
    name: '黑色',
    color: 'black'
  },
  {
    name: '自动',
    color: 'auto'
  },
])

const darkMode = async (color, index) => {
  curIdx.value = index
  return
  if (color == 'light') {
    await window.darkMode.system()
  } else if (color == 'black') {
    await window.darkMode.toggle()
  }
}
</script>

<style lang="scss" scoped>
.item {
  float: left;
  margin: 0 8px 0 8px;

  .fun i {
    // position: relative;
    display: block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
    font-size: 18px;
  }
  .fun i:hover {
    background: rgba(220, 220, 220, 0.5);
  }

  &:last-child {
    .icon-igw-l-enlarge-1 {
      padding-right: 5px;
      font-size: 14px;
    }
  }
}

.skin-box {
  position: absolute;
  top: 35px;
  right: 10px;
  z-index: 10;
  width: 185px;
  height: 80px;
  font-size: 12px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    z-index: inherit;
    right: 35px;
    border-top: solid 0;
    border-bottom: solid 8px #fff;
    border-left: solid 8px transparent;
    border-right: solid 8px transparent;
    
  }
  .skin-item {
    color: #bbb;
  }
  .color {
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    margin-bottom: 5px;
    border-radius: 50%;
    &.light {
      background: #f5f5f5;
    }
    &.red {
      background: #c3473a;
    }
    &.black {
      background: #202020;
    }
    &.auto {
      background: linear-gradient(to right, #fff, #999);;
    }
    .icon-gou {
      font-size: 12px;
      font-weight: bold;
    }
  }
}

input {
  -webkit-app-region: no-drag;
}
</style>