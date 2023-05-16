<template>
  <div class="tabs">
    <Tabs
      v-model="tab"
      :activeColor="'red'"
      bordered
    >
      <Tab
        v-for="(item, index) in data"
        :key="index"
        :name="item.name" 
        :label="item.name"
        style="line-height:1.7rem"
        @click="onClick(item)"
      >
        <template #labelBefore>
          <span class="label-before" v-if="item.name === '评论'">
            ({{ commentCount }})
          </span>
        </template>
      </Tab>
      <template #searchinput>
        <div class="searchinput" v-if="tab === '歌曲列表'">
          <input 
            type="text" 
            placeholder="搜索歌单音乐"
            @input="onFilter"
          >
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Tabs, Tab } from '@/components/tabs'

const emits = defineEmits(['onClick', 'search']);

const props = defineProps({
  data: Array,
  commentCount: [ Number, String ]
});

const tab = ref(props.data[0].name);

const onClick = (item) => {
  emits('onClick', item);
}

const onFilter = (e) => {
  emits('search', (e.target.value).trim())
}
</script>

<style lang="scss" scoped>
.tabs {
  margin-top: 30px;
}
.label-before {
  color: #666;
  font-size: 12px;
}
</style>