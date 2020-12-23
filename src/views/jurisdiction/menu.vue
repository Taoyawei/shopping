<template>
<div>
  <top :title="title"></top>
  <div class="user-find">
    <div class="user-find-input">
      <el-input class="find-el-input" v-model="name" placeholder="请输入姓名/账号/手机号">
        <div slot="suffix" class="input-icon">
          <icon type="iconsousuo" :size="16" color="#434146" class="find-el-icon" />
        </div>
      </el-input>
      <el-button class="find-el-btn">重置</el-button>
    </div>
    <div class="user-find-add" @click="doAdd">
      <el-button>添加</el-button>
    </div>
  </div>
  <div class="user-table">
    <el-tree
      :data="treeList"
      show-checkbox
      node-key="id"
      :props="defaultProps">
      <!-- , treeList -->
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.menu_name }}</span>
        <span style="margin-left: 12px">
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)"
          >
            <!-- @click="() => append(data)" -->
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => doMobile(data)"
          >
            <!-- @click="() => append(data)" -->
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => singDelete(data)"
          >
            <!-- @click="() => remove(node, data)" -->
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
  <!-- 添加juese -->
  <add-menu ref="menus" @success="addSuccess" :info="userInfo"></add-menu>
  <!-- 分配菜单 -->
  <!-- <dis-menu ref="disMenu"></dis-menu> -->
</div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import icon from '@/components/icon/icon.vue'
import top from '@/components/top/index.vue'
import { getHeight, repTree } from '@/utils/utils'
import AddMenu from './component/menu/addMenu.vue'
// import DisMenu from './component/role/disMenu.vue'
import {
  getList,
  deleteMenu
} from '@/api/menu'
interface Uinfo {
  type: string,
  [propName:string]: any
}
@Component({
  components: {
    icon,
    top,
    AddMenu
  }
})
export default class User extends Vue {
  /*****computed**********/
  get tableHeight () {
    const bHeight:number = this.$store.state.user.bodyHeight
    return getHeight(bHeight, 84) + 'px'
  }
  /*****data*******/ 
  private name: string = '' // 角色名称，id
  private title: string = '菜单列表'
  private pageNo:number = 1 // 页数
  private pageSize:number = 10 // 每页条数
  private total:number = 0 // 总条数
  private list: any[] = [
    {
      role_name: '管理员'
    }
  ] // 列表数据
  private userInfo: Uinfo = {
    type: 'add',
    row: null
  }
  private treeList:any = []
  private defaultProps:any = {
    children: 'children',
    label: 'label'
  }
  private ids:number[] = [] // 选中菜单id集合
  
  created () {
    this.doGetList()
  }
  /***********mehods******* */
  // 新增菜单
  append (data:any) {
    // console.log(data)
    this.userInfo.type = 'newAdd'
    this.userInfo.row = data
    let el:any = this.$refs.menus
    el.open()
  }
  // 获取菜单列表
  doGetList ():void {
    const req = {
      // pageNo: this.pageNo,
      // pageSize: this.pageSize
    }
    getList(req).then(res => {
      // console.log(res)
      this.treeList = repTree(res.data, -1)
      // console.log(this.treeList)
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 改变每页条数
  handleSizeChange (val:number):void {
    console.log(val)
  }
  // 改变页数
  handleCurrentChange (val:number):void {}
  // 点击添加
  public doAdd () {
    this.userInfo.type = 'add'
    this.userInfo.row = null
    let el:any = this.$refs.menus
    el.open()
  }
  // 点击分配权限
  // doAllocation ({row}:any) {
  //   // this.userInfo.type = 'modify'
  //   // this.userInfo.row = row
  //   let el:any = this.$refs.disMenu
  //   el.open()
  // }
  // 点击编辑
  doMobile (row:any) {
    this.userInfo.type = 'modify'
    this.userInfo.row = row
    let el:any = this.$refs.menus
    el.open()
  }
  // 点击单个删除
  singDelete (row:any) {
    this.ids = []
    this.ids.push(row.id)
    this.doDelete()
  }
  // 新增编辑成功
  addSuccess () {
    this.doGetList()
  }
  // 调用删除接口
  doDelete () {
    const req = {
      menu_id: this.ids
    }
    deleteMenu(req).then(data => {
      const res:any = data
      if (res.code === 0) {
        this.$message.success('删除成功')
        this.doGetList()
      }
    }).catch(err => {
      this.$message.error(err.message)
    })
  }
}
</script>
<style lang="scss" scoped>
.user-find {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  .user-find-input {
    height: 30px;
    margin-left: 16px;
    display: flex;
    align-items: center;
    .find-el-input {
      width: 240px;
      height: 30px;
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      position: relative;
      font-size: 12px;
      .input-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        right: -5px;
        top: 0px;
        border-left: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    .find-el-btn {
      width: 56px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-left: 12px;
      border: 1px solid #dcdfe6!important;
      border-radius: 2px;
      font-size: 12px;
      background: #ffffff;
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
    /deep/.el-input__inner {
      border: none!important;
      height: 30px!important;
      padding-right: 45px;
      // border: 1px solid blue;
    }
    // .find-el-icon {
    // }
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
  .user-find-add {
    width: 56px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    margin-right: 12px;
    border: 1px solid #dcdfe6!important;
    border-radius: 2px;
    font-size: 12px;
    background: #ffffff;
  }
}
.user-table {
  padding: 16px;
  /deep/.table-header {
    background: #f5f5f6;
  }
}
.user-page {
  text-align: right;
}
.span-btn {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
.span-btn-active {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
  margin-left: 8px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  font-size: 14px;
  // padding-left: 8px;
  // border: 1px solid red;
}
</style>
