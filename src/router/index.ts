import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routes from './config'
import store from '../store/index'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_MENU', routes[1].children)
  if (to.path === '/' && store.getters.userInfo) {
    // next('/layout')
    next()
  } else {
    next()
  }
})
export default router
