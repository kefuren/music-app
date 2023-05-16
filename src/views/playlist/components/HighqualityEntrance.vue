<template>
  <div 
    class="highquality-cover flex" 
    :style="playlistinfoStyle"
    @click="onClick"
  >
    <div class="img-container">
      <img :src="data.coverImgUrl">
    </div>
    <div class="info-conten">
      <p class="title text-center">
        <i class="iconfont icon-huangguan"></i>
        <span class="text-body2">精品歌单</span>
      </p>
      <p>{{ data.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
const emits = defineEmits(['onClick'])
const props = defineProps({
  data: Object
})

const router = useRouter()
const playlistinfoStyle = computed(() => 
  `background-image: url(${ props.data.coverImgUrl });`
);

const onClick = () => {
  emits('onClick')
}
</script>

<style lang="scss" scoped>
.highquality-cover {
  width: 100%;
  height: 170px;
  margin-top: 20px;
  padding: 15px;
  border-radius:5px;
  overflow: hidden;
  color: #fff;
  background-size: cover;
  
  cursor: pointer;
  .img-container {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    overflow: hidden;
  }
  .info-conten {
    margin-left: 10px;
  }
  .title {
    width: 100px;
    height: 28px;
    margin: 20px 0;
    line-height: 28px;
    text-align: center;
    border: solid 1px #DEAC67;
    border-radius: 30px;
    color: #DEAC67;
  }
  .icon-huangguan {
    margin-right: 5px;
  }
}
</style>