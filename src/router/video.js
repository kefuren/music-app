const videoRoutes = [
  {
    path: "/video",
    component: () => import("@/views/video/index.vue"),
    name: "video",
    meta: {
      title: "视频"
    },
  },
  {
    path: "/mv",
    component: () => import("@/views/video/mv.vue"),
    name: "mv",
    meta: {
      title: "MV"
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
];

export { videoRoutes }