import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/index.vue'
import Home from '../components/pageborad/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/personalized',
    children: [
      {
        path: '/personalized',
        name: 'Personalized',
        component: () => import('../views/home/personalized/index.vue'),
        meta: {
          title: "个性推荐",
        },
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('../views/playlist/index.vue'),
        meta: {
          title: "歌单",
          keepAlive: true
        },
      },
      {
        path: "/playlist-highquality",
        component: () => import("@/views/playlist/highquality.vue"),
        name: "playlist-highquality",
        meta: {
          title: "精品歌单",
          keepAlive: true
        },
      },
      {
        path: '/playlist/:id',
        name: 'playlist-id',
        component: () => import('@/views/playlist/_id.vue'),
      },
      {
        path: '/toplist',
        name: 'Toplist',
        component: () => import('../views/home/toplist/toplist.vue'),
        meta: {
          title: "排行榜",
          keepAlive: true
        },
      },
      {
        path: '/artist',
        name: 'Artist',
        component: () => import('../views/home/artist/artist.vue'),
        meta: {
          title: "歌手",
          keepAlive: true
        },
      },
      {
        path: '/newsong',
        name: 'Newsong',
        component: () => import('../views/home/newsong/newsong.vue'),
        meta: {
          title: "最新音乐",
          keepAlive: true
        },
      },
      {
        path: '/privatecontent',
        name: 'PrivateContent',
        component: () => import('../views/home/privatecontent/privatecontent.vue'),
        meta: {
          title: "独家放送"
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
        path: '/mv',
        name: 'mv',
        component: () => import('../views/video/mv.vue'),
        meta: {
          title: "MV"
        },
      },
      {
        path: '/mv/:id',
        name: 'mv-id',
        component: () => import('@/views/video/_id/mv.vue'),
      },
      {
        path: '/mv-list',
        name: 'mv-list',
        component: () => import('../views/video/components/mv-list.vue'),
        meta: {
          title: "mv-list"
        },
      },
      {
        path: '/follows',
        name: 'Follows',
        component: () => import('../views/follows/index.vue'),
        meta: {
          title: "动态"
        },
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/search/index.vue'),
        meta: {
          title: "搜索页"
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    redirect: '/qrcodeLogin',
    children: [
      {
        path: '/phoneLogin',
        name: 'phoneLogin',
        component: () => import('../views/login/PhoneLogin.vue'),
      },
      {
        path: '/qrcodeLogin',
        name: 'qrcodeLogin',
        component: () => import('../views/login/QrcodeLogin.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/login/Register.vue'),
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'link--active'
})

export default router
