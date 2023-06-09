<template>
  <div class="card relative-position" :class="cardWrapClasses">
    <div 
      class="card__img-container"
      :style="cardImgContainerStyle"
      @mouseenter="onMouseenter(item)"
      @mouseleave="onMouseleave(item)"
      @click.prevent="onClick(item)"
    >
      <div 
        class="card__playcount absolute text-caption" 
        v-if="item.playCount && showCount"
      >
        <i class="iconfont icon-24gl-play"></i>
        <span>{{ numberFormat(item.playCount) }}</span>
      </div>
      <img 
        v-lazy="item.sPicUrl || item.picUrl || item.coverImgUrl || item.cover"
      >
      <div 
        v-if="showPlayBtn && item.hover"
        class="card__play-btn absolute" 
        :class="playBtnClass"
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
  },
  playBtnCenter: Boolean,
  paddingTop: String
})

const item = ref(props.item);
const cardWrapClasses = computed(() => props.square ? 'card--square' : '');
const ellipsisClass = computed(() => props.ellipsisLines == 1 ? 'ellipsis' : 'ellipsis-' + props.ellipsisLines + '-lines');
const playBtnClass = computed(() => props.playBtnCenter ? 'play-btn-center' : '');

const cardImgContainerStyle = computed(() => props.paddingTop ? `padding-top:${ props.paddingTop } ` : '');
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