/**
 * @abstract 定义vuex数据类型接口
 * @author taoyawei
 */
export interface UState { // user.ts中的state数据接口
  menu: object[], // 菜单列表，是对象数组
  userInfo: any, // 用户信息
  bodyHeight: number // 视图高度
}