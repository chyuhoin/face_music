import Vue from 'vue'
import Router from 'vue-router'
import storage from 'good-storage'

const Discovery = () => import(/* webpackChunkName: "Discovery" */ '@/page/discovery')
const PlaylistDetail = () => import(/* webpackChunkName: "PlaylistDetail" */ '@/page/playlist-detail')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/page/playlists')
const Songs = () => import(/* webpackChunkName: "Songs" */ '@/page/songs')
const Search = () => import(/* webpackChunkName: "Search" */ '@/page/search')
const SearchSongs = () => import(/* webpackChunkName: "SearchSongs" */ '@/page/search/songs')
const SearchPlaylists = () => import(/* webpackChunkName: "SearchPlaylists" */ '@/page/search/playlists')
const SearchMvs = () => import(/* webpackChunkName: "SearchMvs" */ '@/page/search/mvs')

const AdminUser = () => import(/* webpackChunkName: "AdminUser" */ '@/page/admin-user')
const AdminData = () => import(/* webpackChunkName: "AdminData" */ '@/page/admin-data')
const AdminMusic = () => import(/* webpackChunkName: "AdminMusic" */ '@/page/admin-music')

const Mvs = () => import(/* webpackChunkName: "Mvs" */ '@/page/mvs')
const Mv = () => import(/* webpackChunkName: "Mv" */ '@/page/mv')

// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

// 需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '面部识别',
      icon: 'music',
    },
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu',
    },
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue',
    },
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '用户反馈',
      icon: 'mv',
    },
  },
]

//管理员界面的侧边栏菜单
export const adminMenuRoutes = [
  {
    path: '/admin-user',
    name: 'admin-user',
    component: AdminUser,
    meta: {
      title: '用户管理',
      icon: 'yonghu',
    },
  },
  {
    path: '/admin-music',
    name: 'admin-music',
    component: AdminMusic,
    meta: {
      title: '音乐管理',
      icon: 'music',
    },
  },
  {
    path: '/admin-data',
    name: 'admin-data',
    component: AdminData,
    meta: {
      title: '数据监测',
      icon: 'shrink',
    },
  }
]

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: (to) => {
        const isAdmin = storage.get('__role__')

        if (isAdmin) {
          return '/admin-user';
        } else {
          return '/discovery';
        }
      },
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistDetail,
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: Search,
      props: true,
      children: [
        {
          path: '/',
          redirect: 'songs',
        },
        {
          path: 'songs',
          name: 'searchSongs',
          component: SearchSongs,
        },
        {
          path: 'playlists',
          name: 'searchPlaylists',
          component: SearchPlaylists,
        },
        {
          path: 'mvs',
          name: 'searchMvs',
          component: SearchMvs,
        },
      ],
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      props: (route) =>  ({id: +route.params.id}),
    },
    ...menuRoutes,
    ...adminMenuRoutes
  ],
})
