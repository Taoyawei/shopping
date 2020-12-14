<template>
  <div class="menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div v-for="(item, index) in menuList" :key="index">
        <el-submenu :index="`t-${index}`">
          <template slot="title">
            <!--  @click="doMemu(item)" -->
            <div class="title-box">
              <Icon :type="item.meta.type" :size="18" color="#ffffff"></Icon>
              <span>{{ item.meta.title }}</span>
            </div>
          </template>
          <el-menu-item-group v-for="(res, i) in item.children" :key='`${index}-${i}`' :index="`${index}-${i}`">
            <el-menu-item :index="`${index}-${index}-${i}`">
              <div class="title-box" @click="doMemu(res)">
                <Icon :type="res.meta.type" :size="18" color="#ffffff"></Icon>
                <span>{{ res.meta.title }}</span>
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator'
import Icon from '@/components/icon/icon.vue'
@Component({
  name: 'Menu',
  components: {
    Icon
  }
})
export default class Menu extends Vue {
  // 获取菜单
  get menuList () {
    return this.$store.state.user.menu
  }
  mounted () {
    console.log(this.menuList)
  }
  // 点击子级菜单
  doMemu (res: any): void {
    // console.log(res)
    if (this.$route.path !== res.path) {
      this.$router.push({path: res.path})
    }
  }
}
</script>
<style lang='scss' scoped>
.menu {
  width: 180px;
  min-width: 180px;
  height: 100%;
  padding-bottom: 8px;
  padding-top: 8px;
  background: #304156;
  box-sizing: border-box;
  color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
  // border: 1px solid red;
}
.title-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/deep/.el-menu {
  border: none!important;
}
/deep/.el-menu-item {
  // min-width: 0px!important;
}
/deep/li.el-menu-item {
  // padding-right: 0px!important;
}
// .el-submenu .el-menu-item
</style>
