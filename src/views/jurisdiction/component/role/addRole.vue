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
        <el-form-item label="角色名称：" class="body-item">
          <el-input v-model="userInfo.role_name" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="body-item-des">
          <el-input type="textarea" v-model="userInfo.role_des" class="body-input"></el-input>
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
      <el-button class="footer-comfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
interface User { // 表单数据接口
  role_name: string,
  role_des: string,
  isEnable: boolean
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
  private title:string = '新增角色' // 标题
  private propInfo:any = null // 用户传入的信息
  private userInfo:User = {
    role_name: '', // 角色名称
    role_des: '', // 描述
    isEnable: false // 是否启用
  }

  /*******methods */
  // 打开弹窗
  public open () {
    this.propInfo = JSON.parse(JSON.stringify(this.info))
    this.title = this.propInfo.type === 'add' ? '新增角色' : '查看角色'
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
    switch (type) {
      case 'modify':
        this.$set(this.userInfo, 'account', this.propInfo.row.account)
        this.$set(this.userInfo, 'name', this.propInfo.row.name)
        this.$set(this.userInfo, 'mobile', this.propInfo.row.mobile)
        this.$set(this.userInfo, 'password', this.propInfo.row.password)
        this.$set(this.userInfo, 'email', this.propInfo.row.email ? this.propInfo.row.email : '')
        break
      default:
        this.$set(this.userInfo, 'account', '')
        this.$set(this.userInfo, 'name', '')
        this.$set(this.userInfo, 'mobile', '')
        this.$set(this.userInfo, 'password', '')
        this.$set(this.userInfo, 'email', '')
        break
    }
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
  .body-item-des {
    width: 100%;
    // height: 28px;
    margin-top: 20px;
    .body-input {
      width: 240px;
      // height: 28px;
      // border: 1px solid #dde0e7;
      // margin-top: 6px;
      border-radius: 3px;
    }
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
    background: #409eff;
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
</style>
