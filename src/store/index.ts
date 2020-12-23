import Vue from 'vue'
import Vuex from 'vuex'
import VueXAlong from 'vuex-along'

Vue.use(Vuex)
import user from './modules/user'
interface Plug {
  name: string,
  local: any
  session: any
}
const item:Plug = {
  name: 'along', //存放在localStroage或者sessionStroage 中的名字
  local: {
    list: ['user'],
    isFilter: true,
  }, //是否存放在local中  false 不存放 如果存放按照下面session的配置配
  session: { // 如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    list: []
    // isFilter: true
  }
}
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  plugins: [VueXAlong(item)]
})
