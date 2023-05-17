import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/common.scss'
import './assets/styles/global.scss'
import './assets/styles/flex.scss'
import './assets/styles/positioning.scss'
import './assets/styles/typography.scss'
import './assets/font/iconfont.css'

createApp(App).use(store).use(router).mount('#app')

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  if (to.fullPath != '/login') {

    const currentMenu = to.matched[1].path;
    let tabList = [];
    store.state.menuList.forEach((item) => {
      if (item.link === currentMenu) {
        tabList = item
      } else {
        item.topMenus.forEach(citem => {
          if (citem.path.match(currentMenu)) {
            tabList = item
          }
        })
      }
    })
    
    let target = tabList.topMenus && tabList.topMenus.find(item => item.path.match(currentMenu));
    
    store.commit('SET_ACTIVE_MENU', tabList.link);
    store.commit('SET_TAB_LIST', tabList.topMenus);
    target && store.commit('SET_CURRENT_TAB', target.name);
  }

  // return false
})
