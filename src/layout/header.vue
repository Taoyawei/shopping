<template>
  <div class="header">我是头部</div>
</template>
<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {
}
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 50px;
  background: #ffffff;
  color: red;
}
</style>
