import { createApp } from 'vue'
import Loading from './Loading.vue'

export default {
  install (app) {
    const loading = createApp(Loading)
    const oFrag = document.createDocumentFragment()
    const $loading = loading.mount(oFrag)

    app.config.globalProperties.$loading = $loading
  }
}