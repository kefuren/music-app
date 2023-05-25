<template>
  <teleport to="body">
    <div class="bar-list-mask" v-if="isShow">
      <div 
        class="bar-list-wrap absolute-center" 
        ref="barListWrapRef"
      >
        <div 
          class="tool-bar absolute flex justify-center items-center"
          ref="toolBarRef"
          @mousedown="handleMousedown2"
        >
          <i 
            class="close iconfont icon-cuowuguanbiquxiao text-link absolute"
            @click="updateModel"
          ></i>
          <h3>调整栏目顺序</h3>
        </div>
        <p class="tipTxt">想调整首页栏目的顺序？按住右边的按钮拖动即可</p>
        <ul 
          class="bar-list draggable-list relative-position"
          ref="draggableListRef"
        >
          <li 
            class="bar-list-item draggable-item" 
            ref="draggableItemRef"
            v-for="(item, index) in list" 
            :key="index"
          >
            <!-- <div class="item-wrap"> -->
              <div class="item-container flex justify-between">
                <span>{{ item.name }}</span>
                <i class="iconfont icon-caidan" @mousedown="handleMousedown"></i>
              </div>
            <!-- </div> -->
          </li>
        </ul>

        <div class="btns">
          <a href="javascript:;" class="default-btn">恢复默认排序</a>
          <div class="conform-btn" @click="updateModel">确定</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  list: Array,
  modelValue: Boolean,
})
const isShow = computed(() => props.modelValue);

const draggableListRef = ref(null)
const draggableItemRef = ref(null)

function updateModel() {
  emit('update:modelValue', false);
}

function findIndex(parent, target) {
  let index;
  Array.from(parent).forEach((v, i) => {
    if (v === target) {
      index = i;
    }
  });

  return index
}

const handleMousedown = (e) => {
  const oParentNode = e.target.parentNode.parentNode;

  oParentNode.classList.add('dragging');

  let listLength = props.list.length,
      startY = e.clientY,
      selectIndex = findIndex(draggableListRef.value.children, oParentNode),
      itemHeight = oParentNode.offsetHeight,
      listHeight = draggableListRef.value.offsetHeight,
      startTop = oParentNode.offsetTop,
      currenIndex,
      previousIndex = Math.ceil((startTop - itemHeight / 2) / itemHeight),
      topIndex = selectIndex;

      console.log(previousIndex)

  document.addEventListener('mousemove', _mouseMove, false)
  document.addEventListener('mouseup', _mouseUp, false)


  function _mouseMove (e) {
    const moveY = startTop + e.clientY - startY;
    oParentNode.style.top = moveY + 'px';

    if (moveY < 0) {
      oParentNode.style.top = 0;
    } else if (moveY > listHeight) {
      oParentNode.style.top = (listHeight) + 'px';
    }

    currenIndex = Math.ceil((moveY - itemHeight / 2) / itemHeight);
    
    if (currenIndex <= 0) currenIndex = 0;
    if (currenIndex > listLength - 1) currenIndex = listLength - 1;

    console.log('currenIndex:', currenIndex + '   previousIndex:', previousIndex)
    if (previousIndex !== currenIndex) {
      if (previousIndex > currenIndex && currenIndex < topIndex) {
        draggableItemRef.value[currenIndex].before(oParentNode);
      } else {
        draggableItemRef.value[currenIndex].after(oParentNode);
      }
      previousIndex = currenIndex;
      if (currenIndex < topIndex) topIndex = currenIndex;
    }
  }

  function _mouseUp (e) {

    oParentNode.classList.remove('dragging');
    oParentNode.removeAttribute('style');

    document.removeEventListener('mousemove', _mouseMove, false);
    document.removeEventListener('mouseup', _mouseUp, false);
  }

}

const barListWrapRef = ref(null);
const toolBarRef = ref(null);
const handleMousedown2 = (e) => {

  let startX = e.pageX - barListWrapRef.value.offsetLeft,
      startY = e.pageY - barListWrapRef.value.offsetTop,
      ww = barListWrapRef.value.offsetWidth / 2,
      wh = barListWrapRef.value.offsetHeight / 2;


  document.addEventListener('mousemove', _mousemove, false);
  document.addEventListener('mouseup', _mouseup, false);

  e.stopPropagation();
  e.preventDefault();

  function _mousemove (e) {
    let x = e.pageX - startX,
        y = e.pageY - startY,
        cw = document.documentElement.clientWidth,
        ch = document.documentElement.clientHeight;
        
    if (x < ww) {
      x = ww
    }
    if (y < wh) {
      y = wh
    }
    if (x > cw - ww) {
      x = cw - ww
    }
    if (y >= ch - wh) {
      y = ch - wh - 5
    }

    barListWrapRef.value.style.left = x + 'px';
    barListWrapRef.value.style.top = y + 'px';
  }
  
  function _mouseup (e) {
    document.removeEventListener('mousemove', _mousemove, false)
    document.removeEventListener('mouseup', _mouseup, false)
  }
}


</script>

<style lang="scss" scoped>
.bar-list-mask {
  position: relative;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}
.bar-list-wrap {
  width: 330px;
  height: 430px;
  border-radius: 5px;
  background: #fff;
  z-index: 5;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f;
}
.tool-bar {
  height: 50px;
  width: 100%;
  cursor: move;
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
}
.tool-bar .close {
  left: 10px;
  font-size: 22px;
  color: #cdcdcd;
}
.tipTxt {
  text-align: center;
  padding: 10px 0;
  margin-top: 50px;
  font-size: 13px;
  color: #ccc;
}

.bar-list {
  margin-top: 5px;
}
.bar-list-item {
  width: 100%;
  height: 35px;
  line-height: 35px;
  // padding: 0 15px;
}
.bar-list-item:hover {
  background: #f5f5f5;
}
.item-wrap {
  width: 100%;
}
.item-container {
  width: 300px;
  margin: 0 auto;
  font-size: .8rem;
  color: #333;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  .icon-caidan {
    width: 25px;
    font-size: 25px;
    color: #ccc;
    cursor: move;
  }
}

.btns {
  margin-top: 80px;
  text-align: center;
  font-size: 0.8rem;
  .default-btn,
  .conform-btn {
    margin-bottom: 20px;
  }
  .default-btn {
    display: block;
    text-decoration: revert;
    color: #666;
  }
  .conform-btn {
    display: inline-block;
    padding: 5px 25px;
    background: #ccc;
    color: #fff;
    border-radius: 30px;
    background-image: linear-gradient(to right , #e85f4d, #c3483a);
  }
}

.dragging {
  position: absolute;
  z-index: 1;
  background: #fff;
  box-shadow: 0 1px 8px #0003,
              0 0 0 #fff,
              0 0 0 #fff,
              0 1px 8px #0003;
}

.hold {
  cursor: inherit;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  animation: hold-higther 200ms ease-in;
}
@keyframes hold-higther {
  0% {
    transform: scale(.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>