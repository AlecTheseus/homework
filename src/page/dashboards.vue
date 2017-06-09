
<template>
  <div>
    <div class="container">

      <myheader></myheader>
      <div class="col-md-6">
        <div class="charts" id="chart1"></div>
      </div>
      <div class="col-md-6">
        <div class="charts" id="chart2"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import myheader from '../components/header'
  /*chart data*/
  import logs from '../static/logs.json'
  import homedata from './home.vue'
  export default {
    data () {
      return {
        myData:[],
        chart1:{
          "title" : {
            "text": "Log Type",
            "x":"center"
          },
          "tooltip" : {
            "trigger": "item",
            "formatter": "{a} <br/>{b} : {c} ({d}%)"
          },
          "legend": {
            "orient": "horizontal",
            "x": "center",
            "top":"10%",
            "data": ["INFO","DEBUG","WARN","ERROR","FATAL"]
          },
          "series" : [
            {
              "name": "Log Type",
              "type": "pie",
              "radius" : "55%",
              "center": ["50%", "60%"],
              "label": {
                "normal": {
                  "show": false
                }
              },
              "labelLine": {
                "normal": {
                  "show": false
                }
              },
              "data":[
                {
                  "value":0,"name":"INFO",
                  "itemStyle":{
                    "normal":{"color":"#4F81DB"}
                  }
                },
                {
                  "value":0, "name":"DEBUG",
                  "itemStyle":{
                    "normal":{"color":"#C0504D"}
                  }
                },
                {
                  "value":0, "name":"WARN",
                  "itemStyle":{
                    "normal":{"color":"#9BBB59"}
                  }
                },
                {
                  "value":0, "name":"ERROR",
                  "itemStyle":{
                    "normal":{"color":"green"}
                  }

                },
                {
                  "value":0, "name":"FATAL",
                  "itemStyle":{
                    "normal":{"color":"cyan"}
                  }
                }
              ],
              "itemStyle": {
                "emphasis": {
                  "shadowBlur": 10,
                  "shadowOffsetX": 0,
                  "shadowColor": "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        }
        ,
        chart2:{
          "title": {
            "text": "Log Over Time",
            "left": "center"
          },
          "tooltip": {
            "trigger": "item",
            "formatter": "{a} <br/>{b} : {c}"
          },
          "legend": {
            "top":"8%",
            "data": ["INFO","DEBUG","WARN","ERROR","FATAL"]
          },
          "xAxis": {
            "type": "category",
            "name": "date",
            "splitLine": {"show": false},
            "data": []
          },
          "grid": {
            "left": "3%",
            "right": "8%",
            "top":"18%",
            "bottom": "3%",
            "containLabel": true
          },
          "yAxis": {
            "name": "count"
          },
          "series": [
            {
              "name": "INFO",
              "type": "line",
              "data": [],
              "itemStyle":{
                "normal":{"color":"#4F81DB"}
              }
            },
            {
              "name": "DEBUG",
              "type": "line",
              "data": [],
              "itemStyle":{
                "normal":{"color":"#9BBB59"}
              }
            },
            {
              "name": "WARN",
              "type": "line",
              "data": [],
              "itemStyle":{
                "normal":{"color":"#C0504D"}
              }
            },
            {
              "name": "ERROR",
              "type": "line",
              "data": [],
              "itemStyle":{
                "normal":{"color":"green"}
              }
            },
            {
              "name": "FATAL",
              "type": "line",
              "data": [],
              "itemStyle":{
                "normal":{"color":"cyan"}
              }
            },
          ]
        }

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
      //calculate data for charts
      let counterINFO = 0;
      let counterDEBUG = 0;
      let counterWARN = 0;
      let counterERROR = 0;
      let counterFATAL = 0;
      for(let i = 0 ;i<logs.myData.length;i++){
        switch(logs.myData[i].LogLevel)
        {
          case "INFO":
            counterINFO++;
            break;
          case "DEBUG":
            counterDEBUG++;
            break;
          case "WARN":
            counterWARN++;
            break;
          case "ERROR":
            counterERROR++;
            break;
          case "FATAL":
            counterFATAL++;
            break;
          default:
        }
      }
      this.chart1.series[0].data[0].value = counterINFO;
      this.chart1.series[0].data[1].value = counterDEBUG;
      this.chart1.series[0].data[2].value = counterWARN;
      this.chart1.series[0].data[3].value = counterERROR;
      this.chart1.series[0].data[4].value = counterFATAL;
      //create chart1
      let chart1 = document.getElementById('chart1');
      let myChart1 = echarts.init(chart1);
      myChart1.setOption(_this.chart1);

      //calculate chart2
      //get aAxis
      let timeArray = [];
      for(let i = 0 ;i<logs.myData.length;i++){
        let curTime = logs.myData[i].TimeStamp;
        curTime = curTime.slice(4,15);
        if(i>0){
          let preTime = logs.myData[i-1].TimeStamp;
          preTime = preTime.slice(4,15);
          if(preTime != curTime){
            timeArray.push(curTime);
          }
        }else{
          timeArray.push(curTime);
        }
      }
      this.chart2.xAxis.data = timeArray;
      //get statistics
      for(let i = 0 ;i<_this.chart2.series.length;i++){
        _this.chart2.series[i].data = logs.LogLevelList[i].statistics;
      }

      let chart2 = document.getElementById('chart2');
      let myChart2 = echarts.init(chart2);
      myChart2.setOption(_this.chart2);
    },
    methods:{
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .myContainer label{
    color:white;
    margin-bottom: 10px;
  }
  .charts{
    height: 400px;
  }


</style>
