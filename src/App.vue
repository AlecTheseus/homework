<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script type="text/javascript">
</script>
<script>
import $ from 'jquery'
window.$ = $
window.jQuery = $
export default {
  name:"app",
  data () {
    return {
      message: 'Name'
    }
  },
  methods:{
    logout() {
    }
  },
  beforeMount(){

  },
  mounted(){
  }
}
</script>

<style scoped>
.myContainer{
  margin:3rem auto 4rem auto;
}
</style>
