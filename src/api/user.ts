/**
 *@abstract 用户列表接口
 *@author taoyawei
 */
import { axios } from '@/utils/request'
interface Data {
  [propName: string]: any
}
// 获取用户列表
export function getList (params:Data) {
  return axios({
    url: '/user/get/list',
    method: 'post',
    data: params
  })
}

// 新增用户
export function addUser (params:Data) {
  return axios({
    url: '/user/add/user',
    method: 'post',
    data: params
  })
}
// 修改用户
export function modifyUser (params:Data) {
  return axios({
    url: '/user/mobile/basic',
    method: 'post',
    data: params
  })
}
// 删除用户
export function deleteUser (params:Data) {
  return axios({
    url: '/user/remove',
    method: 'post',
    data: params
  })
}
