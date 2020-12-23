/**
 * @abstract 菜单模块接口
 * @author taoyawei
 */
import {axios} from '@/utils/request'

// 获取菜单列表
export function getList (params:any) {
  return axios({
    url: '/menu/list',
    method: 'get',
    data: params
  })
}

// 新增菜单
export function addMenu (params:any) {
  return axios({
    url: '/menu/add',
    method: 'post',
    data: params
  })
}
// 编辑菜单
export function modifyMenu (params:any) {
  return axios({
    url: '/menu/modify',
    method: 'post',
    data: params
  })
}
// 删除菜单
export function deleteMenu (params:any) {
  return axios({
    url: '/menu/delete',
    method: 'post',
    data: params
  })
}