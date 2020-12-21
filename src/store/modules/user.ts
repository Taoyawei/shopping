/**
 * @abstract vuex中的user模块，这里是用户信息，登录信息，路由信息处理模块
 * @author taoyawei
 */
import { UState } from '../interface'
import userGetter from './userGetter'
const state:UState = {
  menu: [],
  userInfo: null,
  bodyHeight: 0
}

const user = {
  state,
  mutations: {
    SET_MENU (state: UState, value: any[]) {
      state.menu = value
    },
    SET_USER (state: UState, value: any) {
      state.userInfo = value
    },
    DEL_USER (state: UState, value: any) {
      state.userInfo = null
    },
    SET_HEIGHT (state: UState, value: number) {
      state.bodyHeight = value
    }
  },
  actions: {},
  getters: userGetter
}

export default user