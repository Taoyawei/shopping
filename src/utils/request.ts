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

// const cancleToken = Axios.CancelToken
// const source = cancleToken.source

// 请求拦截器
instance.interceptors.request.use(function (config):any {
  config.headers = {
    token: store.getters.userInfo ? store.getters.userInfo.token : null
    // token: '7fe36acc02204c5a0f61e5b77b8e0793=1608097641823'
  } // 请求之前做处理
  return Promise.resolve(config)
}, function (error): any {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((response) => { // 成功
  // 一系列处理
  // console.log(response)
  const result = response.data
  // console.log(result.data)
  if (result.code === 0) return Promise.resolve(result)
  else return Promise.reject(result)
},(error) => { // 失败
  // 一顿操作
  return Promise.reject(error)
})

export {
  instance as axios
}