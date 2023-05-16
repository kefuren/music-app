<template>
  <div class="card relative-position" :class="cardWrapClasses">
    <div 
      class="card__img-container"
      @mouseenter="onMouseenter(item)"
      @mouseleave="onMouseleave(item)"
      @click.prevent="onClick(item)"
    >
      <div 
        class="card__playcount absolute text-caption" 
        v-if="showCount"
      >
        <i class="iconfont icon-24gl-play"></i>
        <span>{{ numberFormat(item.playCount) }}</span>
      </div>
      <img :src="item.sPicUrl || item.picUrl || item.coverImgUrl" alt="" srcset="">
      <div 
        v-if="showPlayBtn && item.hover"
        class="card__play-btn absolute" 
        @click.stop="play(item)"
      >
        <i class="iconfont icon-bofang1"></i>
      </div>

      <!-- 显示用户信息 -->
      <div v-if="item.creator && item.highQuality" class="highquality absolute-top">
        <i class="iconfont icon-icon-test absolute"></i>
      </div>
      <div v-if="item.creator" class="card__creator ellipsis absolute">
        <i class="iconfont icon-yonghu"></i>
        <span class="nickname">{{ item.creator.nickname }}</span> 
        <i class="identityIconUrl" :style="`background-image: url(${item.creator?.avatarDetail?.identityIconUrl})`"></i>
      </div>

    </div>
    <div class="card__section">
      <slot name="cardDesc">
        <span class="desc-text text-link" :class="ellipsisClass">
          {{ item.name }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import './card.scss'

import { numberFormat } from '@/utils/api'

const emits = defineEmits(['onClick'])
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  square: Boolean,
  showCount: {
    type: Boolean,
    default: true,
    required: false
  },
  showPlayBtn: {
    type: Boolean,
    default: true,
    required: false
  },
  ellipsisLines: {
    type: Number,
    default: 3,
    required: false
  }
})

const item = ref(props.item);
const cardWrapClasses = computed(() => props.square ? 'card--square' : '');
const ellipsisClass = computed(() => 'ellipsis-' + props.ellipsisLines + '-lines')

const onMouseenter = (item) => {
  props.showPlayBtn && (item.hover = true)
}
const onMouseleave = (item) => {
  props.showPlayBtn && (item.hover = false)
}
const onClick = (item) => {
  emits('onClick', item);
}

const play = (item) => {
  console.log('id', item);
}


</script>

<style lang="scss" scoped>


</style>