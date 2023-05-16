const toplistRouters = [
  {
    path: '/toplist',
    name: 'Toplist',
    component: () => import('../views/home/toplist/toplist.vue'),
    meta: {
      title: "排行榜"
    },
  },
]

export {
  toplistRouters
}