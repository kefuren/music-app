import menus from '../assets/data/menus'

export default {
	// 菜单状态
	activeMenu: '',
	currentTab: '',
	tabList: [],
	menuList: menus,
	// 播放信息
	audioRef: null,
	currentPlaying: {},
	playState: false,
	source: '',
	currentTime: 0,
	volume: .5,
	playInfoShow: false,
	// 用户信息
	showLogin: false,
	userInfo: {},
	likedsongIds: [], // 喜欢的歌曲id列表
	// 搜索
	searchHistory: []
}