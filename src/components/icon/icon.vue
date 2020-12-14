<template>
  <div>
    <svg class="icon" aria-hidden="true" :style="{ width: size + 'px', height: size + 'px', color: color }">
      <use :xlink:href="`#${type}`"></use>
    </svg>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Icon extends Vue {
  @Prop({default: 12}) size!: number // 大小
  @Prop({default: '#333333'}) color!: string // 颜色
  @Prop({default: null}) type!: string // 图标类型
}
</script>