<template>
  <div class="login" @keyup.enter.prevent="doLogin">
    <div class="login-box">
      <div class="box-center">
        <div class="center-top"></div>
        <div class="center-icon">
          <Icon type="iconshangdian" :size="56" color="#409eff"></Icon>
        </div>
        <div class="center-title">商城管理中心</div>
        <div class="center-item">
          <Icon class="item-icon" type="iconyonghu" :size="16" color="#409eff"></Icon>
          <el-input
            class="item-input"
            placeholder="请输入账号"
            v-model="account"
            clearable>
          </el-input>
        </div>
        <div class="center-item">
          <Icon class="item-icon" type="iconmima" :size="16" color="#409eff"></Icon>
          <el-input
            type="password"
            class="item-input"
            placeholder="请输入密码"
            v-model="password"
            clearable>
          </el-input>
        </div>
        <div class="item-btn">
          <el-button @click="doLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
import  {
  goLogin
} from '@/api/login'
@Component({
  components: {
    Icon
  }
})
export default class Login extends Vue {
  private account:string = '' // 账号
  private password:string = '' // 密码
  
  mounted () {
    // const arr:[string, number] = ['hello', 123]
    // console.log(arr)
  }
  // 登录
  doLogin (): void {
    const req = {
      account: this.account,
      password: this.password
    }
    goLogin(req).then((res: any) => {
      console.log(res)
      this.$store.commit('SET_USER', res.data)
      this.$router.push({path: '/home/index'})
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .login-box {
    width: 100%;
    height: 345px;
    background: url('../../assets/login_center_bg.png') no-repeat center / 100% 100%;
    background-color: #409eff;
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .box-center {
      width: 365px;
      height: 390px;
      background: #ffffff;
      margin-top: -60px;
      box-shadow: 0px 0px 1px 0px #b9b6b6;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-wrap: wrap;
      // border-top: 10px solid  #409eff;
      .center-top {
        width: 100%;
        height: 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: #409eff;
      }
      .center-icon {
        margin-top: 20px;
        text-align: center;
      }
      .center-title {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        color:#409eff;
        text-align: center;
        margin-top: 30px;
      }
      .center-item {
        width: 318px;
        height: 38px;
        margin-top: 22px;
        position: relative;
        .item-icon {
          position: absolute;
          top: 13px;
          left: 14px;
          z-index: 2;
        }
        /deep/.el-input__inner {
          border: none!important;
          padding-left: 35px!important;
          border: 1px solid #dcdfe6!important;
        }
      }
      .item-btn {
        width: 100%;
        margin-top: 22px;
        text-align: center;
        /deep/.el-button {
          border: none;
          // font-weight: 0;
          padding: 0;
          border-radius: none;
          height: 40px;
          width: 318px;
          line-height: 40px;
          font-size: 16px;
          background: #409eff!important;
          color: #ffffff;
        }
        /deep/.el-button:hover {
          background: #409eff!important;
          color: #ffffff;
        }
      }
    }
  }
}
</style>