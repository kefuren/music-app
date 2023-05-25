const recommendRouters = [
  {
    path: '/personalized',
    name: 'Personalized',
    component: () => import('../views/home/personalized/index.vue'),
    meta: {
      title: "个性推荐",
      link: '/'
    },
  },
  {
    path: '/dj',
    name: 'DJ',
    component: () => import('../views/dj/index.vue'),
    meta: {
      title: "播客",
      link: '/dj'
    },
  },
  {
    path: '/fm',
    name: 'FM',
    component: () => import('../views/fm/index.vue'),
    meta: {
      title: "私人FM",
      link: '/dm'
    },
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video/index.vue'),
    meta: {
      title: "视频",
      link: '/video'
    },
  },
  {
    path: '/follows',
    name: 'Follows',
    component: () => import('../views/follows/index.vue'),
    meta: {
      title: "动态",
      link: '/follows'
    },
  }
]

export {
  recommendRouters
}