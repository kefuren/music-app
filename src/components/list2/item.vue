<template>
  <li 
    :class="itemClass" 
    :style="itemStyle" 
    @click="onClick"
    ref="itemRef"
  >
    <slot></slot>
  </li>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from "vue";

const props = defineProps({
  width: String | Number,
  height: String | Number,
  active: Boolean
})

const instance = getCurrentInstance();
const parent = instance.parent;

const itemRef = ref(null);


const itemClass = computed(() => 
  'item' + (parent.props.bordered ? ' item--border' : '')
   + (instance.attrs.class ? ` ${instance.attrs.class}` : '')
)

const itemStyle = computed(() => {
  const propsWidth = props.width || '100%';
  const propsHeight = props.height;
  let width = '', 
      height = '';

  if (typeof propsWidth === 'string' && propsWidth.lastIndexOf('%') != -1) {
    width = 'width:' + propsWidth + ';'
  }
  if (typeof propsWidth === 'number') {
    width = 'width:' + propsWidth + 'px' + ';'
  }
  if (typeof propsHeight === 'string' && propsHeight.lastIndexOf('%') != -1) {
    height = 'height:' + propsHeight + ';'
  }
  if (typeof propsHeight === 'number') {
    height = 'height:' + propsHeight + 'px' + ';'
  }

  return width += height;

})

const onClick = (e) => {
  if (props.active) {
    const listRef = parent.refs.listRef;
    const nodes = listRef.childNodes;
    for (let i = 0; i < nodes.length; i ++) {
      const item = nodes[i];
      if (item == itemRef.value) {
        item.className += ' item--active'
      } else {
        item.className = itemClass.value
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.item {
  margin-left: -10px;
  border-radius: 5px;
  &:hover {
    background: #f5f5f5;
  }
}
.item--border {
  // border-bottom: solid 1px rgba(0,0,0,.05);
}
.item--active {
  background: #f5f5f5;
}
</style>