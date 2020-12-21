<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="visible"
    width="750px"
    >
    <div slot="title" class="user-header">
      <div class="user-header-title">{{ title }}</div>
      <div class="user-header-icon" @click="doClose">
        <Icon type="iconguanbi" :size="16" color="9e9599"></Icon>
      </div>
    </div>
    <div class="user-body">
      <el-form ref="form" :model="userInfo" label-width="150px">
        <el-form-item label="账号：" class="body-item">
          <el-input v-model="userInfo.account" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" class="body-item">
          <el-input v-model="userInfo.name" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" class="body-item">
          <el-input v-model="userInfo.mobile" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="密码：" class="body-item">
          <el-input v-model="userInfo.password" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" class="body-item">
          <el-input v-model="userInfo.email" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" class="body-item-radio">
          <el-radio-group v-model="userInfo.isEnable" class="body-input">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-suer-footer">
      <el-button class="footer-cancle" @click="doClose">取消</el-button>
      <el-button class="footer-comfirm" @click="doPerson">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
import {
  addUser,
  modifyUser
} from '@/api/user'
interface User { // 表单数据接口
  account: string,
  name: string,
  mobile: string,
  password: string,
  isEnable: boolean,
  email?: string
  id?: number
}
interface Pinfo { // 传入信息的数据接口
  type: string,
  [propName:string]: any
}
@Component({
  components: {
    Icon
  }
})
export default class AddUser extends Vue {
  @Prop({type: Object}) readonly info!:Pinfo
  private visible:boolean = false // 弹窗显隐
  private title:string = '添加用户' // 标题
  private propInfo:any = null // 用户传入的信息
  private userInfo:User = {
    account: '', // 账号
    name: '', // 姓名
    mobile: '', // 手机号
    password: '', // 密码
    isEnable: false, // 是否启用
    email: '' // 邮箱
  }

  /*******methods */
  // 打开弹窗
  public open () {
    this.propInfo = JSON.parse(JSON.stringify(this.info))
    this.title = this.propInfo.type === 'add' ? '新增用户' : '查看用户'
    if (this.propInfo.type !== 'add') 
    this.doInit(this.propInfo.type)
    this.visible = true
  }
  // 关闭弹窗
  doClose () {
    this.visible = false
    this.doInit()
  }
  // 数据初始化
  doInit (type?: string) {
    this.$delete(this.userInfo, 'account')
    this.$delete(this.userInfo, 'name')
    this.$delete(this.userInfo, 'mobile')
    this.$delete(this.userInfo, 'password')
    this.$delete(this.userInfo, 'email')
    this.$delete(this.userInfo, 'isEnable')
    switch (type) {
      case 'modify':
        this.$set(this.userInfo, 'account', this.propInfo.row.account)
        this.$set(this.userInfo, 'name', this.propInfo.row.name)
        this.$set(this.userInfo, 'mobile', this.propInfo.row.mobile)
        this.$set(this.userInfo, 'password', this.propInfo.row.password_account)
        this.$set(this.userInfo, 'email', this.propInfo.row.email ? this.propInfo.row.email : '')
        this.$set(this.userInfo, 'isEnable', this.propInfo.row.isEnable)
        this.userInfo.id = this.propInfo.row.id
        break
      default:
        this.$set(this.userInfo, 'account', '')
        this.$set(this.userInfo, 'name', '')
        this.$set(this.userInfo, 'mobile', '')
        this.$set(this.userInfo, 'password', '')
        this.$set(this.userInfo, 'email', '')
        this.$set(this.userInfo, 'isEnable', false)
        this.$set(this.userInfo, 'id', null)
        break
    }
  }
  // 点击确认
  doPerson () {
    if (!this.userInfo.account || !this.userInfo.name || !this.userInfo.mobile || !this.userInfo.password || !this.userInfo.email) {
      return this.$message.error('参数不完整')
    }
    switch (this.propInfo.type) {
      case 'add':
        this.addPerson()
        break
      case 'modify':
        this.doModify()
        break
    }
  }
  // 新增
  addPerson () {
    const req:any = {
      account: this.userInfo.account,
      name: this.userInfo.name,
      mobile: this.userInfo.mobile,
      password: this.userInfo.password,
      email: this.userInfo.email,
      isEnable: this.userInfo.isEnable
    }
    addUser(req).then(data => {
      const res: any = data
      if (res.code === 0) {
        this.$message.success('新增成功')
        this.$emit('success', 1)
        this.doClose()
      }
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 编辑
  doModify (item?:any) {
    if (item) {
      this.userInfo = JSON.parse(JSON.stringify(item))
      this.userInfo.password = item.password_account
    }
    const req:any = {
      id: this.userInfo.id,
      account: this.userInfo.account,
      name: this.userInfo.name,
      mobile: this.userInfo.mobile,
      password: this.userInfo.password,
      email: this.userInfo.email,
      isEnable: this.userInfo.isEnable
    }
    modifyUser(req).then(data => {
      const res:any = data
      if (res.code === 0) {
        this.$message.success('编辑成功')
        this.$emit('success', 1)
        this.doClose()
      }
    }).catch(err => {
      this.$message.error(err)
    })
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0;
}
.user-header {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-header-title {
    font-size: 18px;
    color: #333333;
    text-indent: 16px;
    font-weight: 500;
  }
  .user-header-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.user-body{
  padding: 0 16px;
  // height: 500px;
  margin-top: 20px;
  .body-item {
    width: 100%;
    height: 28px;
    margin-top: 20px;
    .body-input {
      width: 240px;
      height: 28px;
      border: 1px solid #dde0e7;
      // margin-top: 6px;
      border-radius: 3px;
    }
  }
}
.add-suer-footer {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .footer-comfirm {
    width: 58px;
    height: 30px;
    background: #409eff;
    color: #FFFFFF;
    margin-right: 16px;
  }
  .footer-comfirm:hover {
    background: #409eff!important;
    color: #FFFFFF;
  }
  .footer-cancle {
    width: 58px;
    height: 30px;
    // background: #409eff;
    border: 1px solid #dcdfe6;
    color: #333333;
  }
}
/deep/.el-input__inner {
  border: none!important;
  height: 26px!important;
  // padding-right: 45px;
  // border: 1px solid blue;
}
/deep/.el-input {
  height: 26px!important;
}
/deep/.el-form-item__content {
  line-height: 0;
}
/deep/.el-button {
  padding: 0;
  border: none;
}
/deep/.el-button:hover {
  background: #ffffff;
}
/deep/.el-button:active {
  background: #ffffff;
}
.body-item-radio {
  width: 100%;
  // height: 28px;
  // margin-top: 20px;
  display: flex;
  align-items: center;
  /deep/.el-form-item__content {
    margin-left: 0px!important;
  }
  .body-input {
    width: 240px;
    // height: 28px;
    // border: 1px solid #dde0e7;
    // margin-top: 6px;
    border-radius: 3px;
  }
}
</style>
