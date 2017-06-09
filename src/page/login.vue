
<template>
  <div>
    <div class="container myContainer">
      <p class="title">Log In <i class="fa fa-lock"></i></p>
      <div class="form-group">
        <label >User ID :</label>
        <input type="text" class="form-control"  v-model="userId">
      </div>
      <div class="form-group">
        <label >Password :</label>
        <input type="password" class="form-control"  v-model="password">
      </div>
      <p class="hint">{{hint}}</p>
      <button @click="submit" id="submit" class="btn btn-default">Log In <i class="fa fa-arrow-right"></i></button>
    </div>
  </div>
</template>
<script>
  //get json
  import users from '../static/users.json'
  export default {
  name: 'hello',
  data () {
    return {
      userId:Cookies.get('userId'),
      password:Cookies.get('password'),
      userIdFlag:false,//user id validate
      passwordFlag:false,//password validate
      vCoolDown:0,
      hint:''
    }
  },
  methods: {
    // 检查手机与密码正确
    validate(){
      if(this.userIdFlag&&this.passwordFlag){
          return true;
      }else{
        return false;
      }
    },
    //发送验证请求
    submit() {
      console.log(this.userIdFlag+"___"+this.passwordFlag);
      if(this.validate()){
        let _this = this;
        //AJAX get json
        /*$.ajax({
         url:"../static/logs.json",
         type: "POST",
         data: "",
         dataType: "json",
         error:function(msg){
         //alert('err:'+msg)
         } ,
         success:function(msg){
         _this.myData = tableInfo.myData;
         _this.LogLevelList = tableInfo.LogLevelList;
         }
         })*/
        /*INSTEAD AJAX,  use import*/
        //check password and user id
        for(let i = 0;i<users.data.user.length;i++){
            if(users.data.user[i].userId == _this.userId && users.data.user[i].password == md5(_this.password) ){
              sessionStorage.userId = this.userId;
              console.log(sessionStorage);
              Cookies.set('userId', _this.userId, { expires: 7 });
              Cookies.set('password', _this.password, { expires: 7 });
              localStorage.setItem('userId',this.userId);
              location.href="/#/home";
              break;
            }else{
              _this.hint='Invalid user ID or password';
            }
        }
      }
    },
  },
  watch:{
    userId(curVal,oldVal){
      let _this = this;
      if(curVal.length>3){
        _this.userIdFlag = true;
        _this.hint='';
      }else{
        _this.userIdFlag = false;
        _this.hint='User ID must be at least 4 characters'
      }
    },
    password(curVal,oldVal){
      let _this = this;
      if(curVal.length>5){
        _this.passwordFlag = true;
        _this.hint='';
      }else{
        _this.passwordFlag = false;
        _this.hint='Password must be at least 6 characters';
      }
    },
  },
  mounted(){
      if(Cookies.get('userId')!=undefined && Cookies.get('password')!=undefined){
        this.passwordFlag = true;
        this.userIdFlag = true;
      }
    console.log(users);
    console.log(users.data.user.length);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
  .myContainer{
    max-width: 500px;
    background-color: #38B2CA;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 40px;
    border-radius: 10px;
  }
  .myContainer label{
    color:white;
    margin-bottom: 10px;
  }
  .title{
    margin-bottom: 30px;
    color:#BDDCE1;
    font-size: 3rem;
  }
  #submit{
    background-image: -webkit-linear-gradient(top,#F6F6F6,#9B9797);
    border:1px solid #0D6A92;
    margin-top: 20px;
    color:#0D6A92;
    padding: 3px 20px;
  }
  .hint{
    height: 20px;
    color: white;
  }

</style>
