import { RouteConfig } from 'vue-router'
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: {
      title: '总架子'
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '主页',
          type: 'iconyonghu'
        },
        component: () => import('@/views/home/index.vue'),
        children: [
          {
            path: '/home/index',
            name: 'Home',
            meta: {
              title: '首页',
              type: 'iconyonghu'
            },
            component: () => import('@/views/home/home.vue')
          }
        ]
      },
      {
        path: '/com',
        name: 'Com',
        meta: {
          title: '商品',
          type: 'iconyonghu'
        },
        component: () => import('@/views/com/index.vue'),
        children: [
          {
            path: '/com/list',
            name: 'ComList',
            meta: {
              title: '商品列表',
              type: 'iconyonghu'
            },
            component: () => import('@/views/com/com.vue')
          },
          {
            path: '/com/rrr',
            name: 'ComRrr',
            meta: {
              title: '商品不',
              type: 'iconyonghu'
            },
            component: () => import('@/views/com/rrr.vue')
          }
        ]
      },
      {
        path: '/juris',
        name: 'Juris',
        meta: {
          title: '权限',
          type: 'iconquanxian'
        },
        component: () => import('@/views/jurisdiction/index.vue'),
        children: [
          {
            path: '/juris/user',
            name: 'User',
            meta: {
              title: '用户',
              type: 'iconyonghu1',
              parent: '/juris/'
            },
            component: () => import('@/views/jurisdiction/user.vue')
          },
          {
            path: '/juris/role',
            name: 'Role',
            meta: {
              title: '角色',
              type: 'iconrole',
              parent: '/juris/'
            },
            component: () => import('@/views/jurisdiction/role.vue')
          },
          {
            path: '/juris/menu',
            name: 'Menu',
            meta: {
              title: '菜单',
              type: 'iconcaidan',
              parent: '/juris/'
            },
            component: () => import('@/views/jurisdiction/menu.vue')
          }
        ]
      }
    ]
  }
]
export default routes