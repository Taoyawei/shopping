/**
 * @abstract  角色模块接口
 * @author taoyawei
 */
import {axios} from '@/utils/request'
// 获取角色
export function getList(params:any) {
  return axios({
    url: '/role/get/list',
    method: 'post',
    data: params
  })
}
// 添加角色
export function addRole(params:any) {
  return axios({
    url: '/role/add',
    method: 'post',
    data: params
  })
}
// 编辑角色
export function modifyRole(params:any) {
  return axios({
    url: '/role/mobile/role',
    method: 'post',
    data: params
  })
}
// 删除角色
export function deleteRole(params:any) {
  return axios({
    url: '/role/delete',
    method: 'post',
    data: params
  })
}
