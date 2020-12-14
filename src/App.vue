<template>
  <div id="app">
    <!-- <layout>
      <router-view/>
    </layout> -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// import layout from '@/layout/layout.vue'
@Component({
  // components: {
  //   layout
  // }
})
export default class App extends Vue {
  created () {
    this.$store.commit('SET_HEIGHT', document.body.clientHeight)
  }
}
</script>
<style lang="scss">
@import'./app.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
