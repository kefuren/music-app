<template>
  <ul class="">
    <li class="item clearfix">
      <SearchBox />
    </li>
    <li class="item clearfix">
      <div class="fun setting">
        <i class="iconfont icon-shezhi"></i>
      </div>
    </li>
    <li class="item clearfix">
      <div class="fun mail">
        <i class="iconfont icon-xinfeng"></i>
      </div>
    </li>
    <li class="item clearfix">
      <div class="fun skin">
        <i class="iconfont icon-yifu"></i>
      </div>
    </li>
    <li class="item clearfix">
      <div class="zoom">
        <i class="iconfont icon-igw-l-enlarge-1"></i>
      </div>
    </li>
  </ul>
</template>

<script setup>
import SearchBox from './SearchBox.vue'
</script>

<style lang="scss" scoped>
.item {
  float: left;
  margin: 0 8px 0 8px;

  .fun i {
    // position: relative;
    display: block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
    font-size: 18px;
  }
  .fun i:hover {
    background: rgba(220, 220, 220, 0.5);
  }

  &:last-child {
    .icon-igw-l-enlarge-1 {
      padding-right: 5px;
      font-size: 14px;
    }
  }
}

input {
  -webkit-app-region: no-drag;
}
</style>