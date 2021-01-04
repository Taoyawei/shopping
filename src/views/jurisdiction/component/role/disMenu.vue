<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="visible"
    width="800px"
  >
  <div slot="title" class="user-header">
    <div class="user-header-title">分配菜单</div>
    <div class="user-header-icon" @click="doClose">
      <Icon type="iconguanbi" :size="16" color="9e9599"></Icon>
    </div>
  </div>
  <div class="user-body">
    <el-tree
      ref="tree"
      :data="treeList"
      show-checkbox
      node-key="id"
      :default-checked-keys="defaultCheck"
      :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.menu_name }}</span>
      </span>
    </el-tree>
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
import { repTree, repArray } from '@/utils/utils'
import {
  getMenu,
  setMenu
} from "@/api/role"
interface PropsType {
  label: string,
  children: string,
  isLeaf: string
}
@Component({
  components: {
    Icon
  }
})
export default class DisRole extends Vue {
  // @Prop({type: Object}) readonly info!:Pinfo!
  @Prop({type: Object}) readonly info:any
  private visible:boolean = false // 控制显隐
  private treeList:any = []
  private defaultProps:any = {
    children: 'children',
    label: 'label'
  }
  private defaultCheck: number[] = []
  // 打开弹窗
  open () {
    this.doGetMenu()
  }
  // 获取菜单
  doGetMenu () {
    console.log(this.info.row.id)
    const req = {
      role_id: this.info.row.id
    }
    getMenu(req).then(data => {
      const res:any = data
      this.defaultCheck = []
      res.data.forEach((r:any) => {
        if (r.isCheck) this.defaultCheck.push(r.id)
      })
      this.treeList = repTree(res.data, -1)
      this.visible = true
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 点击确认
  doOk () {
    const el:any = this.$refs.tree
    const ids = el.getCheckedKeys() // 获取选中的id集合
    const arr = repArray(this.treeList, []) // 数组扁平化
    // console.log(arr)
    arr.forEach((item:any) => {
      if (ids.indexOf(item.id) !== -1) item.isCheck = true
      else item.isCheck = false
    })
    const req = {
      role_id: this.info.row.id,
      list: arr
    }
    setMenu(req).then(data => {
      const res:any = data
      this.$message.success('配置成功')
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
  height: 650px;
  display: flex;
  overflow: auto;
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
