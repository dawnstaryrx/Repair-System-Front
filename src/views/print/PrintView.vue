<template>
  <button  @click="openPrint()">点击打印</button>
  <div id="printContent">
    <table>
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
    </table>
    <div class="chart">
    <BarChartVue></BarChartVue>
  </div>
  </div>
  

</template>

<script>
import print from 'print-js'
import BarChartVue from './BarChart.vue'
export default {
  components:{BarChartVue},
  methods:{
    openPrint(){
      print({
        printable: 'printContent',
        type: 'html',
        targetStyles: ['*'],
        documentTitle:"aaa"
      })
    }
  }
}
</script>

<style>
.chart{
  width: 100%;
  height: 400px;
}
</style>