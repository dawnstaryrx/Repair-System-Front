<template>
  <div id="pie-main"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted} from "vue";
import {usePrintInfoStore} from '@/stores/printInfo.js'
import {getPrintDataService} from '@/api/constant'

//声明周期函数，自动执行初始化
onMounted(() => {
  init();
});

//初始化函数
function init() {
  // 基于准备好的dom，初始化echarts实例
  let Chart = echarts.init(document.getElementById("pie-main"));
  const printInfoStore = usePrintInfoStore()
  let printDTO = printInfoStore.info
  let printData = getPrintDataService(printDTO).data
  // this.$router.go(0)
  // 绘制图表
  let options = {
    title: {
      text: '维修情况分析',
      subtext: '占比分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: printData.repairSuccess, name: '维修成功' },
          { value: printData.repair-printData.repairSuccess, name: '维修失败' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 渲染图表
  Chart.setOption(options);
}
</script>

<style>
#pie-main {
  width: 100%;
  height: 300px;
}
</style>