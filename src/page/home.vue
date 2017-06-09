
<template>
  <div class="container">
    <myheader></myheader>
    <div class="col-md-2 " >
      <select class="form-control" v-model="selected">
        <option>ALL</option>
        <option v-for="item in LogLevelList">{{item.LogLevel}}</option>
      </select>
    </div>
    <div class="col-md-10">
      <div class=" myContainer">
        <table class="table  table-hover" >
          <thead>
          <tr class="tableTitle">
            <td class="text-center">TimeStamp</td>
            <td class="text-center">Log Marker</td>
            <td class="text-center">Logger</td>
            <td class="text-center">Log Level</td>
            <td class="text-center">Current Thread</td>
            <td class="text-center">Log Message</td>
          </tr>
          </thead>
          <tbody>
          <tr v-if="selected == 'ALL'" v-for="item in myData">
            <td class="text-center">{{item.TimeStamp}}</td>
            <td class="text-center">{{item.LogMarker}}</td>
            <td class="text-center">{{item.Logger}}</td>
            <td class="text-center">{{item.LogLevel}}</td>
            <td class="text-center">{{item.CurrentThread}}</td>
            <td class="text-center">{{item.LogMessage}}</td>
          </tr>
          <tr v-if="selected != 'ALL'" v-for="item in newData">
            <td class="text-center">{{item.TimeStamp}}</td>
            <td class="text-center">{{item.LogMarker}}</td>
            <td class="text-center">{{item.Logger}}</td>
            <td class="text-center">{{item.LogLevel}}</td>
            <td class="text-center">{{item.CurrentThread}}</td>
            <td class="text-center">{{item.LogMessage}}</td>
          </tr>
          </tbody>
          <tr v-show="myData.length==0">
            <td colspan="6" class="text-center">
              <p>no data</p>
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
  import myheader from '../components/header'
  //get json
  import tableInfo from '../static/logs.json'

    export default {
    data () {
      return {
        "myData": [],
        "LogLevelList": [],
        newData:[],
        selected:"ALL"
      }
    },
    components:{
      myheader
    },
    mounted(){
      if(sessionStorage.userId == undefined){
        location.href="/#/";
      }

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
      /*INSTEAD AJAX*/
      this.myData = tableInfo.myData;
      this.LogLevelList = tableInfo.LogLevelList;
    },
    watch:{
      selected: function () {
        //form new data
        console.log('reset');
        let _this = this;
        _this.newData = [];
        for(let i = 0 ;i<_this.myData.length;i++){
          if(_this.myData[i].LogLevel == _this.selected){
            _this.newData.push({
              TimeStamp: _this.myData[i].TimeStamp,
              LogMarker: _this.myData[i].LogMarker,
              Logger: _this.myData[i].Logger,
              LogLevel: _this.myData[i].LogLevel,
              CurrentThread: _this.myData[i].CurrentThread,
              LogMessage: _this.myData[i].LogMessage
            });
          }
        }

      }
    },
    computed: {
    }
  }
</script>
<style lang="scss" scoped>
  .tableTitle{
    background-color:#ddd ;
    color:#00C6D7;
  }
  .myContainer{
    color:white;

  }
  @media only screen and (max-width: 476px){
    .myContainer {
      overflow-x: scroll;
    }
  }
  tbody{
    color:#00C6D7;
  }


</style>
