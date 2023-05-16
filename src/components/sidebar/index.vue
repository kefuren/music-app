<template>
  <div class="side-bar">
		<User />
		<List>
      <list-item
        v-for="(item) in menuList"
        :key="item.link"
        :to="item.link"
        :active="item.link == store.state.activeMenu"
        @click="changeMenu($event, item)"
      >
        <div class="content">
          <i :class="`iconfont icon-${ item.icon }`"></i>
          <span>{{ item.title }}</span>
        </div>
      </list-item>
    </List>
	</div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import User from '@/components/User.vue'
import List from '../list'
import ListItem from '../list/Item.vue'
import useState from '@/hooks/useState'
import { computed } from 'vue'

const store = useStore();
const router = useRouter();

const [ link, setLink ] = useState('/');

const menuList = computed(() => store.state.menuList.filter(item => !item.hidden));

const changeMenu = (e, item) => {
	setLink(item.link);

  router.push({ path: item.link });
}
</script>

<style lang="scss" scoped>
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  padding: 50px 0 60px 0;
  box-sizing: border-box;
  background: #EDEDED;
  color: #2F2F2F;
}

.content {
  display: flex;
  align-items: center;
  .iconfont {
    display: inline-block;
    margin: 0 5px;
    font-size: 20px;
  }
}

</style>