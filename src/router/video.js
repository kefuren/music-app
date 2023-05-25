const videoRoutes = [
  {
    path: "/video",
    component: () => import("@/views/video/index.vue"),
    name: "video",
    meta: {
      title: "视频",
      link: '/video'
    },
  },
  {
    path: "/mv",
    component: () => import("@/views/video/mv.vue"),
    name: "mv",
    meta: {
      title: "MV",
      link: '/video'
    },
  },
  {
    path: "/video/:id",
    component: () => import("@/views/video/_id/index.vue"),
    name: "video-detail",
  },
  {
    path: "/mv/:id",
    component: () => import("@/views/video/_id/mv.vue"),
    name: "mv-detail",
  },
  {
    path: "/first_mv",
    component: () => import("../views/video/mv_components/first_mv.vue"),
    name: "first_mv",
  },
  {
    path: "/hot_mv",
    component: () => import("../views/video/mv_components/hot_mv.vue"),
    name: "hot_mv",
  },
  {
    path: "/top_mv",
    component: () => import("../views/video/mv_components/top_mv.vue"),
    name: "top_mv",
  },
];

export { videoRoutes }