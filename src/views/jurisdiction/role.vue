<template>
<div>
  <top :title="title"></top>
  <div class="user-find">
    <div class="user-find-input">
      <el-input class="find-el-input" v-model="name" placeholder="请输入姓名/账号/手机号">
        <div slot="suffix" class="input-icon" @click="findList">
          <icon type="iconsousuo" :size="16" color="#434146" class="find-el-icon" />
        </div>
      </el-input>
      <el-button class="find-el-btn" @click="doResert">重置</el-button>
    </div>
    <div class="user-find-add" @click="doAdd">
      <el-button>添加</el-button>
    </div>
  </div>
  <div class="user-table">
    <vxe-table
      :border="false"
      resizable
      show-overflow
      :height="tableHeight"
      :data="list"
      header-row-class-name="table-header"
      header-cell-class-name="table-header-cell"
    >
      <vxe-table-column field="role_name" title="角色名称" min-width="100px"></vxe-table-column>
      <vxe-table-column field="role_des" title="描述" min-width="100px"></vxe-table-column>
      <vxe-table-column field="add_time" title="添加时间" min-width="100px"></vxe-table-column>
      <vxe-table-column field="isEnable" title="是否启用" min-width="100px">
        <template v-slot="{row}">
          <el-switch
            v-model="row.isEnable"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            @change="changeRole({row})"
          >
          </el-switch>
        </template>
      </vxe-table-column>
      <vxe-table-column field="option" title="操作" min-width="100px">
        <template v-slot="{row}">
          <div>
            <span class="span-btn" @click="doAllocation({row})">分配菜单</span>
            <span class="span-btn-active" @click="doMobile({row})">编辑</span>
            <span class="span-btn-active" @click="doDelete({row})">删除</span>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
  <div class="user-page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- 添加juese -->
  <add-role ref="roles" :info="userInfo" @success="personList"></add-role>
  <!-- 分配菜单 -->
  <dis-menu ref="disMenu" :info="userInfo"></dis-menu>
</div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import icon from '@/components/icon/icon.vue'
import top from '@/components/top/index.vue'
import { getHeight, transTime } from '@/utils/utils'
import AddRole from './component/role/addRole.vue'
import DisMenu from './component/role/disMenu.vue'
import {
  getList,
  deleteRole
} from '@/api/role'
interface Uinfo {
  type: string,
  [propName:string]: any
}
@Component({
  components: {
    icon,
    top,
    AddRole,
    DisMenu
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
  private title: string = '角色列表'
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
  private ids:number[] = [] // 选中角色id
  
  created () {
    this.doGetList()
  }
  /***********mehods******* */ 
  // 查询
  findList () {
    this.pageNo = 1
    this.pageSize = 10
    this.doGetList()
  }
  // 点击重置
  doResert () {
    this.name = ''
    this.pageNo = 1
    this.pageSize = 10
    this.doGetList()
  }
  // 获取用户列表
  doGetList () {
    const req = {
      name: this.name,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    getList(req).then(data => {
      // console.log(res)
      const res:any = data
      if (res.code === 0) {
        this.list = res.data.rows ? res.data.rows : []
        this.total = res.data.count ? res.data.count : 0
        if (this.list.length === 0 && this.total !==0 && this.pageNo !== 1) {
          this.pageNo = 1
          this.pageSize = 10
          this.doGetList()
        }
        this.list.forEach(item => {
          item.add_time = transTime(item.add_time)
        })
      }
    }).catch(err => {
      this.$message.error(err)
    })
  }
  // 改变每页条数
  handleSizeChange (val:number) {
    // console.log(val)
    this.pageSize = val
    this.doGetList()
  }
  // 改变页数
  handleCurrentChange (val:number) {
    this.pageNo = val
    this.doGetList()
  }
  // 点击添加
  public doAdd () {
    this.userInfo.type = 'add'
    this.userInfo.row = null
    let el:any = this.$refs.roles
    el.open()
  }
  // 添加编辑成功
  personList (msg:number) {
    this.pageNo = 1
    this.pageSize = 10
    this.name = ''
    this.doGetList()
  }
  // 点击分配权限
  doAllocation ({row}:any) {
    // this.userInfo.type = 'modify'
    this.userInfo.row = row
    let el:any = this.$refs.disMenu
    el.open()
  }
  // 点击编辑
  doMobile ({row}:any) {
    this.userInfo.type = 'modify'
    this.userInfo.row = row
    let el:any = this.$refs.roles
    el.open()
  }
  // 切换状态
  changeRole ({row}:any) {
    this.userInfo.row = row
    let el:any = this.$refs.roles
    console.log(row)
    el.doModifyRole(row)
  }
  // 点击删除
  doDelete ({row}:any) {
    this.ids = []
    this.ids.push(row.id)
    this.removeRole()
  }
  // 调用删除接口
  removeRole () {
    const req = {
      role_id: this.ids
    }
    deleteRole(req).then(data => {
      const res:any = data
      if (res.code === 0) {
        this.$message.success('删除成功')
        this.doGetList()
      }
    }).catch(err => {
      this.$message.error(err)
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
</style>
