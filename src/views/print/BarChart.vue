<template>
  <div id="main"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import {usePrintInfoStore} from '@/stores/printInfo.js'
import {getPrintDataService} from '@/api/constant'

//声明周期函数，自动执行初始化
onMounted(() => {
  init();
});
//初始化函数
function init() {
  // 基于准备好的dom，初始化echarts实例
  let Chart = echarts.init(document.getElementById("main"));
  const printInfoStore = usePrintInfoStore()
  let printDTO = printInfoStore.info
  let printData = getPrintDataService(printDTO).data
  let repair = printData.repairs
  console.log(repair)
  let rm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for(let i = 0; i < repair.length; i++){
    let m = repair[i].month
    rm[m-1] = repair[i].num
  }
  
  console.log(rm)
  // 绘制图表
  let options = {
    title: {
      text: '维修次数分析',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: rm,
        type: 'line'
      }
    ]
};

  // 渲染图表
  Chart.setOption(options);
}
</script>

<style>
#main {
  width: 100%;
  height: 300px;
}
</style>