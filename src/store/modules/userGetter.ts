/**
 * @abstract vuex中的getter
 * @author taoyawei
 */
import { UState } from '../interface'
const userGetters = {
  userInfo: (state: UState) => state.userInfo
}

export default userGetters
