<template>
  <div class="layout">
    <div class="layout-content">
      <Menu></Menu>
      <div class="lay-content-right">
        <Header></Header>
        <div class="right-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator'
import Header from './header.vue'
import Menu from './menu.vue'
@Component({
  components: {
    Header,
    Menu
  }
})
export default class Layout extends Vue {
  private key = ''
  // 跳转路由
  // doActive (item: any): void {
  //   // this.$router.push({path: `${item.meta.parent}${item.path}`})
  //   this.$router.push({name: item.name})
  // }
}
</script>
<style lang="scss">
.layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #F2F2F2;
  // .layout-header {
  //   width: 100%;
  //   min-width: 1200px;
  //   // border-bottom: 1px solid #F2F2F2;
  // }
  .layout-content {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    display: flex;
    .lay-content-right {
      flex: 1;
      .right-box {
        margin: 8px;
        height: calc(100% - 66px);
        background: #ffffff;
      }
    }
  }
}
</style>
