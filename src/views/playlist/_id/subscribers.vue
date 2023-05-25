<template>
  <div class="subscribed-list flex justify-between">
    <div 
      v-for="item in data"
      :key="item.userId"
      class="subscribed flex items-center"
    >
      <div class="avatar">
        <img v-lazy="item.avatarUrl" alt="">
      </div>
      <div class="user">
        <p class="name">
          <span>{{ item.nickname }}</span>
          <i :class="`gender iconfont icon-${item.gender === 1 ? 'xingbienan' : 'xingbienv'}`"></i>
        </p>
        <p class="signature text-gray-3 ellipsis">{{ item.signature }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  data: Array
})
</script>

<style lang="scss" scoped>
.subscribed {
  width: 350px;
  margin-top: 20px;
  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
  }
  .user {
    flex: 1;
    margin-left: 10px;
    font-size: 14px;
    line-height: 1.6rem;
    overflow: hidden;
    .signature {
      font-size: 12px;
    }
    i {
      margin-left: 5px;
      vertical-align: bottom;
      font-size: 18px
    }
    .icon-xingbienan {
      color: skyblue;
    }
    .icon-xingbienv {
      color: pink ;
    }
  }
}

</style>