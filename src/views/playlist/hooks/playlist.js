import { ref, reactive, onMounted } from 'vue';
import { 
  getPlaylistService, 
  getCatlistService,
  getHotService,
  getHighqualityService,
  getHighqualityTagsService
} from '@/services/playlist';

const playListState = reactive({
  playlist: [],
  playlisCatlist: [],
  listHot: [],
  highquality: {},
  highqualityFirst: {},
  highqualityTags: {},
});

const cache = ref({});
const timer = 1000 * 60 * 5; // 5分钟重新请求

export function usePlayList() {
  const changeTag = (tag) => {
    getCacheData('playlist_' + tag.name, getPlaylist.bind(null, { cat: tag.name }));
    getCacheData('highquality_' + tag.name, getHighquality.bind(null, { cat: tag.name }));
  }

  const getPlaylist = (params) => {
    getPlaylistService(params).then(res => {
      cache.value['playlist_' + params.cat] = res.playlists;
      cache.value['playlist_' + params.cat].requestTime = new Date().getTime();
      playListState.playlist = cache.value['playlist_' + params.cat];
    })
  }

  const getHighquality = (params) => {
    getHighqualityService(params).then(res => {
      playListState.highquality = cache.value['highquality_' + params.cat] = res.playlists;
      cache.value['highquality_' + params.cat].requestTime = new Date().getTime();
      playListState.highqualityFirst = cache.value['highquality_' + params.cat][0];
    })
  }

  const getListHot = () => {
    getHotService().then(res => playListState.listHot = res.tags);
  }

  const getlisCatlist = () => {
    getCatlistService().then(res => playListState.playlisCatlist = res)
  }

  const getListHighqualityTags = () => {
    getHighqualityTagsService().then(res => playListState.highqualityTags = res.tags)
  }

  function getCacheData(key, callback) {
    const cur = new Date().getTime();
    const chechData = cache.value[key];
    const propsName = key.split('_')[0];
    const catType = key.split('_')[1];
    
    if (chechData && (cur - chechData.requestTime) < timer) {
      playListState[propsName] = chechData;
      if (propsName == 'playlist') {
        playListState.highqualityFirst = cache.value['highquality_' + catType][0];
      }
    } else {
      callback && callback();
    }
  }

  onMounted(() => {
    getPlaylist({ cat: '全部' })
    getHighquality({ cat: '全部' })
    getListHot();
    getlisCatlist();
    getListHighqualityTags();
  })
  
  return {
    changeTag,
    playListState
  }
}