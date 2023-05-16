export default [
	{
		name: '发现音乐',
		path: '/',
		icon: 'yinle',
		menus: [
			{
				name: '个性推荐',
				path: '/personalized'
			},
			{
				name: '歌单',
				path: '/playlist'
			},
			{
				name: '排行榜',
				path: '/toplist'
			},
			{
				name: '歌手',
				path: '/artist'
			},
			{
				name: '最新音乐',
				path: '/newsong'
			},
		]
	},
	{
		name: '播客',
		path: '/dj',
		icon: 'shengbo',
		menus: []
	},
	{
		name: '私人FM',
		path: '/fm',
		icon: 'a-tupianyihuifu-05',
		menus: []
	},
	{
		name: '视频',
		path: '/video_view',
		icon: 'zhongxinshipin',
		menus: [
			{
				name: '视频',
				path: '/video'
			},
			{
				name: 'MV',
				path: '/mv'
			}
		]
	},
	{
		name: '关注',
		path: '/follows',
		icon: 'friend',
		menus: [
			{
				name: '动态',
				path: '/update',
			}
		]
	}
]