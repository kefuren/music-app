const playlistRouters = [
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../views/playlist/index.vue'),
    meta: {
      title: "歌单",
      link: '/playlist'
    },
  },
  {
    path: "/playlist-highquality",
    component: () => import("@/views/playlist/highquality.vue"),
    name: "playlist-highquality",
    meta: {
      title: "精品歌单",
      link: '/playlist'
    },
  },
  {
    path: '/playlist/:id',
    name: 'playlist-id',
    component: () => import('@/views/playlist/_id.vue'),
  },
]

export {
  playlistRouters
}