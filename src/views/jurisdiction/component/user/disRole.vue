<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="visible"
    width="750px"
  >
  <div slot="title" class="user-header">
    <div class="user-header-title">分配角色</div>
    <div class="user-header-icon" @click="doClose">
      <Icon type="iconguanbi" :size="16" color="9e9599"></Icon>
    </div>
  </div>
  <div class="user-body">
    <!-- :multiple-limit="2" -->
    <el-select
      clearable
      v-model="role_ids"
      multiple
      filterable
      allow-create
      default-first-option
      class="body-input"
      placeholder="请选择角色">
      <el-option
        v-for="item in roleList"
        :key="item.id"
        :label="item.role_name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
  <div class="add-suer-footer">
    <el-button class="footer-cancle" @click="doClose">取消</el-button>
    <el-button class="footer-comfirm" @click="doOk">确认</el-button>
  </div>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
import {
  getRole,
  setRole
} from '@/api/user'
@Component({
  components: {
    Icon
  }
})
export default class DisRole extends Vue {
  @Prop({type: Object}) readonly info:any
  private visible:boolean = false // 控制显隐
  private role_ids:number[] = [] // 角色id集合
  private roleList:any = [] // 角色列表
  // 打开弹窗
  open () {
    this.doGetRole()
  }
  // 获取角色列表
  doGetRole () {
    const req = {
      user_id: this.info.row.id
    }
    getRole(req).then(data => {
      const res:any = data
      this.role_ids = []
      this.roleList = res.data
      this.roleList.forEach((item:any) => {
        if (item.default) this.role_ids.push(item.id)
      })
      this.visible = true
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 点击确认
  doOk () {
    console.log(this.role_ids)
    const req  ={
      user_id: this.info.row.id,
      role_ids: this.role_ids
    }
    setRole(req).then(data => {
      this.$message.success('添加成功')
      this.doClose()
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 点击关闭
  doClose () {
    this.visible = false
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
.user-body {
  width: 100%;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
  .body-input {
    width: 600px;
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
