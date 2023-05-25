import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getRecommendPlaylistService(params) {
  return httpGet(obj2StrParams("/personalized", params));
}

// 歌单详情 
export function getPlaylistDetailService (id) {
	return httpGet('/playlist/detail?id=' + id)
}

// 歌单所有歌曲 id limit offset
export function getTrackAllService (params) {
	return httpGet(obj2StrParams('/playlist/track/all', params))
}

// 歌单收藏者 id limit offset
export function getSubscribersService (params) {
	return httpGet(obj2StrParams('/playlist/subscribers', params))
}

// 音乐是否可用
export function checkMusicService (id) {
	return httpGet('/check/music?id=' + id)
}

// 获取音乐url id level
export function getSongUrlService (params) {
	return httpGet(obj2StrParams('/song/url/v1', params))
}

// 歌单
export function getPlaylistService (params) {
	return httpGet(obj2StrParams('/top/playlist', params))
}

// 精品歌单
export function getHighqualityService (params) {
	return httpGet(obj2StrParams('/top/playlist/highquality', params))
}

// 精品歌单标签列表
export function getHighqualityTagsService () {
	return httpGet('/playlist/highquality/tags')
}

// 歌单分类
export function getCatlistService (limit, cat) {
	return httpGet('/playlist/catlist')
}

// 热门歌单分类
export function getHotService () {
	return httpGet('/playlist/hot')
}

// 更新歌单 登录后调用此接口,可以更新用户歌单
export function updatePlaylistService (id) {
	return httpGet('/playlist/update?id=' + id + '&name=新歌单&desc=描述&tags=全部')
}