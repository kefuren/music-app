<template>
  <header class="header flex">
    <div class="controls">
      <Controls />
    </div>
		<nav class="nav flex items-center" v-if="!store.state.playInfoShow">
			<tabs
				v-model="currentTab"
			>
				<tab 
					v-for="item in store.state.tabList" 
					:key="item.path" 
					:name="item.name" 
					:label="item.name"
					@click="changeTab(item)"
				></tab>
			</tabs>
		</nav>
		<div class="quick-menu">
			<QuickMenu />
		</div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Controls from './Controls.vue'
import QuickMenu from './QuickMenu.vue'
import { Tabs, Tab } from '../tabs'

const store = useStore();
const router = useRouter();

const currentTab = computed({
  get() {
    return store.state.currentTab
  },
  set(newValue) {
    store.commit('SET_CURRENT_TAB', newValue)
  }
})

const changeTab = (item) => {
	let path = item.path.split('|')[0];
	router.push({
    path: path
  });
}


</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	height: 50px;
	width: 100%;
	background: #F9F9F9;
	box-sizing: border-box;
	-webkit-app-region: drag;
}

.controls {
	width: 200px;
	height: 100%;
	background: #F6F6F6;
}

.nav {
  flex: 1;
  margin-left: 30px
}

.quick-menu {
	position: absolute;
	right: 0;
}
</style>