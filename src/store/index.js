import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {},
  plugins: [createPersistedState({
    paths: [
      // 'playState', 
      'userInfo', 
      'currentPlaying', 
      'source', 
      'volume', 
      'currentTime', 
      'searchHistory'
    ]
  })],
})
