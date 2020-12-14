<template>
  <div class="title">{{ title }}</div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {
  @Prop() title !:string // 标题
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  // height: 40px;
  text-indent: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  // line-height: 40px;
  padding-top: 10px;
}
</style>