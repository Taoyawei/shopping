/**
 *@abstract 用户列表接口
 *@author taoyawei
 */
import { axios } from '@/utils/request'
interface Data {
  [propName: string]: string | number
}
export function getList (params:Data) {
  return axios({
    url: '/user/get/list',
    method: 'post',
    data: params
  })
}