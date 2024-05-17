<template>
  <form target="iframe">
    <div class="row mb-3">
      <label for="customer" class="col-sm-2 col-form-label">客户</label>
      <select v-model="cus.customerId" id="customer" class="form-select" aria-label="Default select example">
        <option v-for="(customer, index) in this.customerList" :key="index" :value="customer.id">{{ customer.name }}</option>
      </select>
    </div>
    <div class="row mb-3">
      <label for="customer" class="col-sm-2 col-form-label">年份</label>
      <select v-model="cus.year" id="year" class="form-select" aria-label="Default select example">
        <option v-for="(y, index) in this.yearList" :key="index" :value="y">{{ y }}</option>
      </select>
    </div>
  </form>
  <button @click="updateData()" type="button" class="btn btn-primary" style="margin-right: 20px;">更新图表</button>
  <button type="button" class="btn btn-light" @click="openPrint()">打印</button>
  <span v-if="getCusInfo(cus.customerId) != null">图表表示客户：{{ getCusInfo(cus.customerId).name }}</span>
  <span v-if="getCusInfo(cus.customerId) != null">图表表示年份：{{ cus.year }}</span>
  <button @click="year2null()" type="button" class="btn btn-primary" style="margin-right: 20px;">取消年份</button>
  <button @click="cus2null()" type="button" class="btn btn-primary" style="margin-right: 20px;">取消客户</button>
  <div id="printContent" >
    <h1 style="text-align: center;">
      <span v-if="cus.year != null">{{ cus.year }}年度</span>
      <span v-if="getCusInfo(cus.customerId) != null">{{ getCusInfo(cus.customerId).name }}</span>
      维修总结
    </h1>
    <table class="table" >
      <tbody>
        <tr v-if="printDTO.customerId != null">
          <th scope="row">客户</th>
          <td>{{ getCusInfo(printDTO.customerId).name }}</td>
        </tr>
        <tr>
          <th scope="row">维修请求次数</th>
          <td>{{ getData().repairRequest }}</td>
        </tr>
        <tr>
          <th scope="row">维修次数</th>
          <td>{{ getData().repair }}</td>
        </tr>
        <tr>
          <th scope="row">维修成功次数</th>
          <td>{{ getData().repairSuccess }}</td>
        </tr>
        <tr>
          <th scope="row">回访次数</th>
          <td>{{ getData().revisit }}</td>
        </tr>
      </tbody>
    </table>
    <div class="chart">
      <PieChartVue :fData="printData"></PieChartVue>
      <BarChartVue></BarChartVue>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import BarChartVue from './BarChart.vue'
import PieChartVue from './PieChart.vue'
import {getPrintDataService} from '@/api/constant'
import {getCompanyInfoService} from '@/api/constant.js'
import {getAllCustomerService, customerInfoByIdService} from '@/api/customer.js'
import {usePrintInfoStore} from '@/stores/printInfo.js'

export default {
  components:{BarChartVue,PieChartVue},
  data(){
    return {
      printDTO:{
        customerId:null,
        year:null
      },
      printData:null,
      companyInfo:null,
      customerList:{},
      yearList:[2024, 2025, 2026, 2027, 2028,2029, 2030, 2031, 2032, 2033, 2034],
      cus:null
    }
  },
  methods:{
    openPrint(){
      print({
        printable: 'printContent',
        type: 'html',
        targetStyles: ['*'],
        documentTitle:this.companyInfo.companyName,
        margin:'10mm',
      })
    },
    updateData(){
      // this.printData = getPrintDataService(this.printDTO).data

      // this.printData = getPrintDataService(this.cus).data
      // const printInfoStore = usePrintInfoStore()
      // printInfoStore.setInfo(this.cus)

      location.reload();
    },
    getData(){
      return getPrintDataService(this.cus).data
    },
    getCusInfo(id){
      return customerInfoByIdService(id).data
    },
    year2null(){
      this.cus.year = null
      const printInfoStore = usePrintInfoStore()
      printInfoStore.setInfo(this.cus)
    },
    cus2null(){
      this.cus.customerId = null
      const printInfoStore = usePrintInfoStore()
      printInfoStore.setInfo(this.cus)
    },
    getCus(){
      const printInfoStore = usePrintInfoStore()
      this.cus = printInfoStore.info
    }
  },
  created(){
    this.printData = getPrintDataService(this.printDTO).data
    this.companyInfo = getCompanyInfoService().data
    this.customerList = getAllCustomerService().data
    const printInfoStore = usePrintInfoStore()
    this.cus = printInfoStore.info
  }
}
</script>

<style>
.chart{
  width: 800px;
  height: 400px;
}
</style>