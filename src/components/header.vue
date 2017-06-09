
<template>
    <div class="container myContainer">
      <router-link v-bind:to="'home'"><div class="col-md-2">Home</div></router-link>
      <router-link v-bind:to="'dashboards'"><div class="col-md-2">Dashboards</div></router-link>
      <div class="col-md-2 col-md-offset-6" @mouseenter = "showlogout" @mouseleave = "showlogout">
        <div >{{userId}}</div>
        <div id="logout" style="display: none"  @click="logout">Logout</div>
      </div>

    </div>
</template>
<script>
  var Cookies = require('js-cookie');
  export default {
    data () {
      return {
        userId:sessionStorage.userId
      }
    },
    mounted(){

    },
    methods:{
      showlogout(){
          $('#logout').toggle();
      },
      logout (){
        this.userId = '';
        Cookies.remove('userId');
        Cookies.remove('password');
        sessionStorage.clear();
        location.href="/#/";
      },

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .tableTitle{
    background-color: #ddd;
    color:#BDDCE1;
  }
  .myContainer{
    margin: 3rem auto;
    background-color: #00C6D7;
    padding: 3rem 0;
    overflow: auto;
    color:white;
    a{
      color:white;
    }
  }
  .myContainer label{
    color:white;
    margin-bottom: 10px;
  }
  #logout{
    position: absolute;
    top:20px;
  }


</style>
