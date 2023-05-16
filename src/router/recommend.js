const recommendRouters = [
  {
    path: '/personalized',
    name: 'Personalized',
    component: () => import('../views/home/personalized/index.vue'),
    meta: {
      title: "个性推荐",
    },
  },
  {
    path: '/dj',
    name: 'DJ',
    component: () => import('../views/dj/index.vue'),
    meta: {
      title: "播客"
    },
  },
  {
    path: '/fm',
    name: 'FM',
    component: () => import('../views/fm/index.vue'),
    meta: {
      title: "私人FM"
    },
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video/index.vue'),
    meta: {
      title: "视频"
    },
  },
  {
    path: '/follows',
    name: 'Follows',
    component: () => import('../views/follows/index.vue'),
    meta: {
      title: "动态"
    },
  }
]

export {
  recommendRouters
}