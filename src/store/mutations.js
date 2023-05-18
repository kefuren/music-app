import { 
  SET_TAB_LIST,
  SET_CURRENT_TAB,
  SET_ACTIVE_MENU,
  SET_CURRENT_PLAYING,
  SET_PLAY_STATE
} from './mutation-types'

export default {
  [ SET_TAB_LIST ]: (state, payload) => {
    state.tabList = payload;
  },
  [ SET_CURRENT_TAB ]: (state, payload) => {
    state.currentTab = payload;
  },
  [ SET_ACTIVE_MENU ]: (state, payload) => {
    state.activeMenu = payload;
  },
  SET_AUDIO_REF(state, audio) {
    state.audioRef = audio;
  },
  SET_CURRENT_PLAYING(state, payload) {
    state.currentPlaying = payload;
  },
  SET_SOURCE(state, payload) {
    state.source = payload;
  },
  SET_PLAY_STATE(state, isPlay) {
    state.playState = isPlay;
  },
  SET_VOLUME(state, volume) {
    state.volume = volume;
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  SET_CURRENT_TIME(state, val) {
    state.currentTime = val;
  },
  SET_PLAY_INFO_SHOW(state, show) {
    state.playInfoShow = show
  },
  SET_SEARCH_HISTORY(state, payload) {
    if (Object.prototype.toString.call(payload) === '[object Array]') {
      state.searchHistory = [];
      return
    }
    const index = state.searchHistory.findIndex(item => item.searchWord == payload.searchWord)
    if (index == -1) {
      state.searchHistory.push(payload)
    }
  }
}