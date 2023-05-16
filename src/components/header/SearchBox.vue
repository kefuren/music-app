<template>
  <div class="search">
    <i class="iconfont icon-fangdajing"></i>
    <input
      type="text"
      placeholder="搜索"
      v-model="keyword"
      @input="searchInput"
      @keydown.enter="searchKeydown"
      @focus="setSearchShow($event, true)"
      @blur="setSearchShow($event, false)"
      ref="searchInputRef"
    />
    <i
      v-if="keyword"
      class="iconfont icon-cuowuguanbiquxiao"
      @click.stop="clearSearchInput"
    ></i>

    <Search
      v-show="showSearchBox"
      :searchWord="keyword"
      @onClick="checkedItem"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Search from './Search.vue'
import { debounce } from '@/utils/api'

const store = useStore();
const router = useRouter();

const searchInputRef = ref(null);
const keyword = ref("");
const showSearchBox = ref(false);

const searchInput = (e) => {
  keyword.value = e.target.value;
  showSearchBox.value = true;
};

const clearSearchInput = () => {
  keyword.value = "";
  searchInputRef.value.focus();
  setSearchShow(false)
};

const searchKeydown = () => {
  if (keyword.value) {
    setSearchShow(false)
    router.push('/search');
  }
};

const setSearchShow = (e, isShow) => {
  setTimeout(() => {
    showSearchBox.value = isShow
  }, 150)
}

const checkedItem = (item) => {
  keyword.value = item.searchWord;
  store.commit('SET_SEARCH_HISTORY', item)
  router.push('/search');
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  background: rgba(220, 220, 220, 0.5);
  width: 150px;
  height: 24px;
  padding: 0 5px;
  font-size: 12px;
  color: #333;
  border-radius: 30px;
  overflow: hidden;
  input {
    outline: none;
    border: none;
    height: inherit;
    width: 100%;
    // padding: 0 20px;
    font-size: 12px;
    box-sizing: border-box;
    background: transparent;
  }

  input::placeholder {
    color: #bcbcbc;
    font-size: 12px;
  }
}
</style>