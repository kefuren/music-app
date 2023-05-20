<template>
  <div class="bar-list-wrap absolute-center" v-if="isShow">
    <div class="tool-bar relative-position flex justify-center items-center">
      <i 
        class="close iconfont icon-cuowuguanbiquxiao text-link absolute"
        @click="updateModel"
      ></i>
      <h3>调整栏目顺序</h3>
    </div>
    <p class="tipTxt">想调整首页栏目的顺序？按住右边的按钮拖动即可</p>
    <ul class="bar-list">
      <li 
        class="bar-list-item" 
        v-for="(item, index) in list" 
        :key="index"
        draggable="true"
      >
        <div class="item-container flex justify-between">
          <span>{{ item.name }}</span>
          <i class="iconfont icon-caidan"></i>
        </div>
      </li>
    </ul>

    <div class="btns">
      <a href="javascript:;" class="default-btn">恢复默认排序</a>
      <div class="conform-btn" @click="updateModel">确定</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  list: Array,
  modelValue: Boolean,
})

const isShow = computed(() => props.modelValue);

function updateModel() {
  emit('update:modelValue', false);
}

const close = () => {

}
</script>

<style lang="scss" scoped>
.bar-list-wrap {
  width: 330px;
  height: 430px;
  border-radius: 5px;
  background: #fff;
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
  font-size: 13px;
  color: #ccc;
}

.bar-list {
  margin-top: 5px;
}
.bar-list-item {
  padding: 0 15px;
}
.bar-list-item:hover {
  background: #f5f5f5;
}
.item-container {
  height: 35px;
  line-height: 35px;
  font-size: .8rem;
  color: #333;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  .icon-caidan {
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
</style>