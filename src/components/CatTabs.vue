<template>
  <div class="cat-tabs flex items-center justify-between">
    <div class="cat-btn flex justify-center items-center">
      <span class="">{{ curTag}}</span>
      <i class="iconfont icon-xiangyoujiantou"></i>
    </div>
    
    <div class="play-list-hot">
      <ul class="list flex justify-end text-caption">
        <li 
          v-for="(tag, index) in tags" 
          :key="tag.id"
          class="tag-item text-link"
        >
          <em v-if="index !== 0" class="separator">|</em>
          <span class="tag-text" :class="{ 'tag-active': curTag === tag.name }">{{ tag.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: Array,
})

const tags = computed(() => props.data);

const curTag = ref('');

const onChangeTag = (tag) => {
  curTag.value = tag.name;
}


</script>

<style lang="scss" scoped>
.cat-tabs {
  width: 100%;
  height: 30px;
  margin: 15px 0;
}
.cat-btn {
  width: 100px;
  height: 30px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-size: 0.8rem;
  cursor: pointer;
}
.cat-btn:hover {
  background: #f2f2f2;
}
.icon-xiangyoujiantou {
  margin-left: 5px;
  font-size: 14px;
}

.play-list-hot {
  flex: 1;
  user-select: none;
  .tag-item {
    color: #666;
  }
  .separator {
    display: inline-block;
    margin: 0 4px;
    color: rgba(0, 0, 0, 0.1);
    font-style: normal;
  }
}

.tag-text {
  display: inline-block;
  padding: 0 8px;
}
.tag-active {
  // font-weight: bold;
  // color: #c9594d !important;
  // background: #fcf6f5;
  // border-radius: 30px;
  border-radius: 30px;
  color: brown;
  background: rgba(255,182,193,.2);
}
</style>