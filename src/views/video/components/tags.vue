<template>
  <div class="tag-tabs flex items-center">
    <div class="tags">
      <ul 
        class="list flex text-caption"
        v-for="(value, key) of tags" 
        :key="key"
      >
        <span v-if="showType">{{ key }}</span>
        <li 
          v-for="(tag, index) of value" 
          :key="tag.id"
          class="tag-item text-link"
          :style="`width: ${ itemWidth || 80 }px`"
          @click="onChangeTag(tag)"
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

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  modelValue: String,
  showType: {
    type: Boolean,
    default: true
  },
  itemWidth: [ String, Number ]
})

const tags = computed(() => props.data);

let curTag = props.modelValue;

function onChangeTag(tag) {
  curTag = tag.name;
  emit('update:modelValue', tag.name);
}

</script>

<style lang="scss" scoped>
.tag-tabs {
  width: 100%;
  height: 30px;
}

.tags {
  flex: 1;
  user-select: none;
  .tag-item {
    color: #666;
    text-align: center;
  }
  .separator {
    float: left;
    color: rgba(0, 0, 0, 0.1);
    font-style: normal;
  }
}

.tag-text {
  display: inline-block;
  width: fit-content;
  padding: 0 10px;
  border-radius: 35px;
}
.tag-active {
  border-radius: 30px;
  color: brown;
  background: rgba(255,182,193,.2);
}
</style>