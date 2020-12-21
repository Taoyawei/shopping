<template>
  <div class="header">
    <div></div>
    <div>
      <el-button class="header-close" @click="closeLogin">退出</el-button>
    </div>
  </div>
</template>
<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {
  // 点击退出
  closeLogin () {
    this.$store.commit('DEL_USER', null)
    this.$router.push({path: '/login'})
  }
}
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 50px;
  background: #ffffff;
  // color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-close {
    width: 56px;
    height: 30px;
    background: #409eff!important;
    color: #ffffff;
    margin-right: 16px;
  }
}
</style>
