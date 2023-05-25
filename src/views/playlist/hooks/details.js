import { reactive, watchEffect } from 'vue'
import { 
  getPlaylistDetailService,
  getTrackAllService,
  getSubscribersService,
} from '@/services/playlist'

const detialState = reactive({
  details: [],
  tracks: [],
  subscribers: [],
  filterSongs: []
});

export function useDetails(id, type) {

  const getDetail = () => {
    getPlaylistDetailService(id).then(res => {
      detialState.details = res.playlist;
      getTrackAll({ id: detialState.details.id });
      getSubscribers({ id: detialState.details.id })
    });
  }

  const getTrackAll = (params) => {
    getTrackAllService(params).then(res => {
      detialState.tracks = res.songs;
      detialState.filterSongs = JSON.parse(JSON.stringify(detialState.tracks));
    })
  }
  
  const getSubscribers = (params) => {
    getSubscribersService(params).then(res => detialState.subscribers = res.subscribers);
  }

  watchEffect(getDetail);

  return {
    detialState
  }
}