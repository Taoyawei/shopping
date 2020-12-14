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
  </div>
  <div class="user-table">
    <vxe-grid
      :border="false"
      resizable
      show-overflow
      :height="tableHeight"
      :columns="userCloumns"
      :data="list"
      header-row-class-name="table-header"
      header-cell-class-name="table-header-cell"
    ></vxe-grid>
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
</div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import icon from '@/components/icon/icon.vue'
import top from '@/components/top/index.vue'
import { getHeight } from '@/utils/utils'
import {
  getList
} from '@/api/user'
@Component({
  components: {
    icon,
    top
  }
})
export default class User extends Vue {
  /*****computed**********/
  get tableHeight () {
    const bHeight:number = this.$store.state.user.bodyHeight
    return getHeight(bHeight, 84) + 'px'
  }
  /*****data*******/ 
  private name: string = '' // 用户姓名，账号，手机号
  private title: string = '用户列表'
  private pageNo:number = 1 // 页数
  private pageSize:number = 10 // 每页条数
  private total:number = 0 // 总条数
  private list: any[] = [
    {
      account: '123',
      name: '陶亚伟',
      email: '789'
    }
  ] // 列表数据
  private userCloumns: any[] = [
    {
      field: 'account',
      title: '账号',
      minWidth: '100px'
    },
    {
      field: 'name',
      title: '姓名',
      minWidth: '100px'
    },
    {
      field: 'email',
      title: '邮箱',
      minWidth: '150px'
    },
    {
      field: 'add_time',
      title: '添加时间',
      minWidth: '150px'
    },
    {
      field: 'login_time',
      title: '登录时间',
      minWidth: '150px'
    },
    {
      filed: 'isEnable',
      title: '是否启用',
      minWidth: '120px'
    },
    {
      title: '操作',
      width: '192px',
      fixed: 'right',
      resizable: false
    }
  ]
  
  created () {
    this.doGetList()
  }
  /***********mehods******* */ 
  // 获取用户列表
  doGetList ():void {
    const req = {
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    getList(req).then(res => {
      console.log(res)
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
}
</script>
<style lang="scss" scoped>
.user-find {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
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
</style>
