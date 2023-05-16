const djRouters = [
  {
    path: '/dj',
    name: 'DJ',
    component: () => import('../views/dj/index.vue'),
    meta: {
      title: "播客"
    },
  },
]

export {
  djRouters
}