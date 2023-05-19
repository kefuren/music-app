<template>
  <div class="carousel">
   <div 
      class="carousel__slides-container"
      @mouseenter="carouselArrowShow = true"
      @mouseleave="carouselArrowShow = false"
    >
      <div
        v-for="(item) in list"
        :key="item.targetId"
        class="img__container"
        :class="item.classes"
      >
        <div 
          class="img__container-panels"
          @mouseenter="onSlidesMouseenter"
          @mouseleave="onSlidesMouseleave"
        >
          <img 
            :src="item.imageUrl" 
            @click="onClickImg(item)"
          >
          <span class="item--type">{{ item.typeTitle }}</span>
        </div>
      </div>
    </div>
    <div class="carousel__control">
      <ul class="carousel__control-round">
        <li 
          v-for="(item, index) in list" 
          :key="item.targetId"
          class="carousel__control-round-item"
          :class="{ 'active': curIndex === index }"
          @mouseenter="curIndex = index"
        ></li>
      </ul>
    </div>
    <div 
      class="carousel__prev-arrow" 
      v-show="carouselArrowShow"
    >
      <button @click="setCurIndex('prev')">
        <i class="iconfont icon-xiangzuojiantou"></i>
      </button>
    </div>
    <div 
      class="carousel__next-arrow" 
      v-show="carouselArrowShow"
    >
      <button @click="setCurIndex('next')">
        <i class="iconfont icon-xiangyoujiantou"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount, computed } from "vue";
// import { getBannerService } from '@/services';

const props = defineProps({
  list: Array
})

const curIndex = ref(0);
const carouselArrowShow = ref(false);
const classNames = ref([]);

let timer = null;

onMounted(() => {
  setBanner();
  run();
})

function run () {
  timer = setInterval(() => {
    setCurIndex('next')
  }, 5000);
}

watch(curIndex, (newVal, oldVal) => {
  let isPrev = newVal < oldVal;
  setClassName(isPrev);
})

function setBanner() {
  initSliderClass();
  collectClassName();
}

function initSliderClass() {
  return props.list.map((item, index, arr) => {
    const len = arr.length;

    item.classes = 'item--level-3';

    if (index === 0) {
      item.classes = 'item--active';
    }
    if (index === 1) {
      item.classes = 'item--level-2 right';
    }
    if (index === (len - 1)) {
      item.classes = 'item--level-2 left';
    }
    return item;
  })
}

// 收集类名
function collectClassName() {
  props.list.forEach(item => {
    classNames.value.push(item.classes);
  })
}

function setClassName(isPrev) {
  if (isPrev) {
    classNames.value.push(classNames.value.shift());
  } else {
    classNames.value.unshift(classNames.value.pop());
  }
  render();
}

function render() {
  classNames.value.forEach((item, index) => {
    props.list[index].classes = item;
  })
}

function setCurIndex(direction) {
  const bannersLen = props.list.length - 1;
  if (direction === 'next') {
    curIndex.value = (curIndex.value >= bannersLen ? 0 : ++ curIndex.value);
  } else {
    curIndex.value = (curIndex.value <= 0 ? bannersLen : -- curIndex.value);
  }
}


const onSlidesMouseenter = (e) => {
  clearInterval(timer);
}

const onSlidesMouseleave = (e) => {
  run()
}

const onClickImg= (item) => {
  if (item.classes == 'item--active') {
  } else if (item.classes == 'item--level-2 left') {
    setCurIndex('prev')
  } else if (item.classes == 'item--level-2 right') {
    setCurIndex('next')
  }
}

onBeforeUnmount(() => {
  clearInterval(timer)
  timer = null;
})

</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 240px;
  .carousel__slides-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }
  .img__container {
    position: absolute;
    border-radius: 8px;
    overflow: hidden;
    width: 450px;
    height: 165px;
    cursor: pointer;
    transition: all .3s linear;
    &.item--active {
      left: calc((100% - 450px) / 2);
      top: 40px;
      transform: scale(1.2);
      z-index: 3;
      .item--type {
        font-size: 10px;
        background: #BD534F;
      }
    }
    &.item--level-2 {
      z-index: 2;
      filter: contrast(0.5);
    }
    &.item--level-2.left {
      left: 0;
      top: 40px;
    }
    &.item--level-2.right {
      left: calc(100% - 450px);
      top: 40px;
    }
    &.item--level-3 {
      z-index: 1;
      left: 135px;
      top: 40px;
    }
  }

  .img__container-panels {
    position: relative;
    width: 100%;
    height: 100%;
    .item--type {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;
      font-size: 8px;
      padding: 2px 10px;
      border-radius: 5px 0px 0px 0px;
    }
  }

  .carousel__control {
    position: absolute;
    bottom: 0;
    width: 100%;
    .carousel__control-round {
      display: flex;
      justify-content: center;
      align-items: center;
      .carousel__control-round-item {
        width: 6px;
        height: 6px;
        background: #ccc;
        margin: 0 5px;
        border-radius: 50%;
      }
      .active {
        background: #C3473A;
      }
    }
    
  }

  .carousel__prev-arrow,
  .carousel__next-arrow {
    position: absolute;
    top: 50%;
    z-index: 4;
    button {
      outline: none;
      border: none;
      padding: 0 2px;
      background: none;
      cursor: pointer;
    }
    i {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      opacity: .5;
    }
  }
  .carousel__prev-arrow {
    left: 0;
  }
  .carousel__next-arrow {
    right: 0;
  }
}
</style>