/**
 * @abstract 二次封装axios
 * @author taoyawei
 */
import Axios from 'axios'
import store from '@/store/index'
// 创建axios实例
const instance = Axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use(function (config):any {
  config.headers = {
    // token: store.getters.userInfo.token
    token: '7fe36acc02204c5a0f61e5b77b8e0793=1607939043459'
  } // 请求之前做处理
  return Promise.resolve(config)
}, function (error): any {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response): any { // 成功
  // 一系列处理
  return Promise.resolve(response)
}, function (error): any { // 失败
  // 一顿操作
  return Promise.reject(error)
})

export {
  instance as axios
}