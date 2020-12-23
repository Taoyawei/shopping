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
      <el-form ref="form" :model="menuInfo" label-width="150px">
        <el-form-item label="上级菜单：" class="body-item-casc">
          <el-select class="body-input" :value="menuInfo.parent_name">
            <el-option :value="menuInfo.parent_id" :label="menuInfo.parent_name" class="options">
              <el-tree  id="tree-option"
                ref="selectTree"
                :data="options"
                :props="parentConfig"
                @node-click="handleNodeClick"
              >
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" class="body-item">
          <el-input type="text" v-model="menuInfo.menu_name" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="编码" class="body-item">
          <el-input type="text" v-model="menuInfo.code" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="图标" class="body-item">
          <el-input type="text" v-model="menuInfo.menu_icon" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="排序" class="body-item">
          <el-input type="text" v-model="menuInfo.menu_ser" class="body-input"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="body-item-des">
          <el-input type="textarea" v-model="menuInfo.des" class="body-input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否启用" class="body-item-radio">
          <el-radio-group v-model="menuInfo.isEnable" class="body-input">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="add-suer-footer">
      <el-button class="footer-cancle" @click="doClose">取消</el-button>
      <el-button class="footer-comfirm" @click="comfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
import { repTree } from '@/utils/utils'
import {
  getList,
  addMenu,
  modifyMenu
} from '@/api/menu'
interface Role { // 表单数据接口
  parent_id: number,
  parent_name: string,
  menu_name: string,
  code: string,
  menu_ser: number,
  des: string,
  menu_icon: string
  // isEnable: boolean
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
export default class AddRole extends Vue {
  @Prop({type: Object}) readonly info!:Pinfo
  private visible:boolean = false // 弹窗显隐
  private title:string = '新增菜单' // 标题
  private propInfo:any = null // 用户传入的信息
  private menuInfo:Role = {
    parent_id: 0, // 上级菜单
    parent_name: '', // 上级菜单名称
    menu_name: '', // 菜单名称
    code: '', // 编码
    menu_ser: 1, // 排序
    des: '', // 描述
    menu_icon: '' // 图标
    // isEnable: false // 是否启用
  }
  private value:any = [] //选中的上级菜单
  private options:any = [] // 上级菜单列表
  private parentConfig:any = { // 上级菜单配置
    value: 'parent_id',
    label: 'menu_name'
  }
  private list:any[] = [] // 上级菜单列表

  /*******methods */
  // 切换选项
  handleNodeClick (node:any){
    this.menuInfo.parent_name = node[this.parentConfig.label]
    this.menuInfo.parent_id = node[this.parentConfig.value]
    // this.$emit('getValue',this.valueId)
    // this.defaultExpandedKey = []
  }
  // 打开弹窗
  public open () {
    this.propInfo = JSON.parse(JSON.stringify(this.info))
    if (this.propInfo.type === 'add' || this.propInfo.type === 'newAdd') this.title = '新增菜单'
    else this.title = '查看菜单'
    // if (this.propInfo.type !== 'add') this.doInit(this.propInfo.type)
    this.doGetList()
    this.visible = true
  }
  // 获取菜单列表
  doGetList () {
    const req = {
      // pageNo: this.pageNo,
      // pageSize: this.pageSize
    }
    getList(req).then(res => {
      this.list = JSON.parse(JSON.stringify(res.data))
      this.options = repTree(res.data, -1)
      if (this.propInfo.type !== 'add') this.doInit(this.propInfo.type)
    }).catch(err => {
      this.$message.error(err.message)
    })
  }
  // 关闭弹窗
  doClose () {
    this.visible = false
    this.doInit()
  }
  // 点击确定
  comfirm () {
    // console.log(this.menuInfo)
    if (!this.menuInfo.menu_name || !this.menuInfo.code || !this.menuInfo.menu_icon) {
      this.$message.error('参数不完整')
      return false
    }
    switch (this.propInfo.type) {
      case 'add':
        this.doAddRole()
        break
      case 'newAdd':
        this.doAddRole()
        break
      case 'modify':
        this.doModifyRole()
        break
    }
  }
  // 新增
  doAddRole () {
    const req = {
      parent_id: this.menuInfo.parent_id || -1,
      menu_name: this.menuInfo.menu_name,
      code: this.menuInfo.code,
      menu_icon: this.menuInfo.menu_icon,
      menu_ser: this.menuInfo.menu_ser,
      des: this.menuInfo.des,
    }
    addMenu(req).then(data => {
      const res:any = data
      if (res.code === 0) {
        this.$message.success('添加成功')
        this.$emit('success', 1)
        this.doClose()
      }
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 编辑
  doModifyRole () {
    const req = {
      id: this.propInfo.row.id,
      parent_id: this.menuInfo.parent_id || -1,
      menu_name: this.menuInfo.menu_name,
      code: this.menuInfo.code,
      menu_icon: this.menuInfo.menu_icon,
      menu_ser: this.menuInfo.menu_ser,
      des: this.menuInfo.des,
    }
    modifyMenu(req).then(data => {
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
  // 数据初始化
  doInit (type?: string) {
    this.$delete(this.menuInfo, 'parent_id')
    this.$delete(this.menuInfo, 'menu_name')
    this.$delete(this.menuInfo, 'code')
    this.$delete(this.menuInfo, 'menu_ser')
    this.$delete(this.menuInfo, 'des')
    this.$delete(this.menuInfo, 'menu_icon')
    this.$delete(this.menuInfo, 'parent_name')
    switch (type) {
      case 'modify':
        let names:string = ''
        this.list.forEach(item => {
          // console.log(item)
          if (item.id === this.propInfo.row.parent_id) names = item.menu_name
        })
        this.$set(this.menuInfo, 'parent_id', this.propInfo.row.parent_id)
        this.$set(this.menuInfo, 'parent_name', names)
        this.$set(this.menuInfo, 'menu_name', this.propInfo.row.menu_name)
        this.$set(this.menuInfo, 'code', this.propInfo.row.code)
        this.$set(this.menuInfo, 'menu_ser', this.propInfo.row.menu_ser)
        this.$set(this.menuInfo, 'des', this.propInfo.row.role_des)
        this.$set(this.menuInfo, 'menu_icon', this.propInfo.row.menu_icon)
        break
      case 'newAdd':
        let name:string = ''
        this.list.forEach(item => {
          // console.log(item)
          if (item.id === this.propInfo.row.id) name = item.menu_name
        })
        this.$set(this.menuInfo, 'parent_id', this.propInfo.row.id)
        this.$set(this.menuInfo, 'parent_name', name)
        this.$set(this.menuInfo, 'menu_name', '')
        this.$set(this.menuInfo, 'code', '')
        this.$set(this.menuInfo, 'menu_ser', 1)
        this.$set(this.menuInfo, 'des', '')
        this.$set(this.menuInfo, 'menu_icon', '')
        break
      default:
        this.$set(this.menuInfo, 'parent_id', 0)
        this.$set(this.menuInfo, 'parent_name', '')
        this.$set(this.menuInfo, 'menu_name', '')
        this.$set(this.menuInfo, 'code', '')
        this.$set(this.menuInfo, 'menu_ser', 1)
        this.$set(this.menuInfo, 'des', '')
        this.$set(this.menuInfo, 'menu_icon', '')
        break
    }
    // console.log(this.menuInfo)
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
  .body-item-casc {
    width: 100%;
    height: 28px;
    margin-top: 20px;
    /deep/input.el-input__inner {
      position: absolute;
    }
    .body-input {
      width: 240px;
      height: 28px;
      border: 1px solid #dde0e7!important;
      // margin-top: 6px;
      border-radius: 3px;
    }
  }
  .body-item {
    width: 100%;
    height: 28px;
    margin-top: 20px;
    .body-input {
      width: 240px;
      height: 28px;
      border: 1px solid #dde0e7!important;
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
/deep/i.el-select__caret.el-input__icon.el-icon-arrow-up {
    display: flex;
    align-items: center;
}
</style>
