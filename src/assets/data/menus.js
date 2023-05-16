export default [
	{
		title: '发现音乐',
		icon: 'yinle',
		link: '/',
		topMenus: [
			{
				name: '个性推荐',
				path: '/personalized'
			},
			{
				name: '歌单',
				path: '/playlist|/playlist-highquality'
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
		title: '独家放送',
		icon: '',
		link: '/privatecontent',
		hidden: true,
		topMenus: [
			{
				name: '独家放送',
				path: '/privatecontent'
			}
		]
	},
	{
		title: '播客',
		icon: 'shengbo',
		link: '/dj',
		topMenus: []
	},
	{
		title: '私人FM',
		icon: 'a-tupianyihuifu-05',
		link: '/fm',
		topMenus: []
	},
	{
		title: '视频',
		icon: 'zhongxinshipin',
		link: '/video',
		topMenus: [
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
		title: '关注',
		icon: 'friend',
		link: '/follows',
		topMenus: [
			{
				name: '动态',
				path: '/follows',
			}
		]
	},
]