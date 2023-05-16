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
  plugins: [    
    createPersistedState({
      reducer(val) {
        return {
          currentPlaying: val.currentPlaying,
          source: val.source,
          currentTime: val.currentTime,
          volume: val.volume,
          userInfo: val.userInfo
        }      
      }
    })
  ],
})
