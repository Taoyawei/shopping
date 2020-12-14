/**
 * @abstract 登录接口
 * @author taoyawei
 */
import { axios } from '@/utils/request'
export function goLogin (params: object): any {
  return axios({
    method: 'post',
    url: '/login',
    data: params
  })
}