<template>
  <h2>公司信息修改</h2>
  <form target="iframe">
    <div class="row mb-3">
      <label for="companyName" class="col-sm-2 col-form-label">公司名称</label>
      <div class="col-sm-10">
        <input v-model="companyInfo.companyName" type="text" class="form-control" id="companyName">
      </div>
    </div>
    <div class="row mb-3">
      <label for="companySite" class="col-sm-2 col-form-label">公司网址</label>
      <div class="col-sm-10">
        <input v-model="companyInfo.companySite" type="text" class="form-control" id="companySite">
      </div>
    </div>
    <button @click="updateCompanyInfo()" type="submit" class="btn btn-primary">修改</button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>
  <hr>
  <h2>报表信息修改</h2>
  <button @click="year2null();cus2null()" type="button" class="btn btn-primary" style="margin-right: 20px;">报表信息还原</button>
</template>

<script>
import {getCompanyInfoService, updateCompanyInfoService} from '@/api/constant.js'
import alertUtil from '@/utils/alertUtil';
import {usePrintInfoStore} from '@/stores/printInfo.js'
import {getAllCustomerService} from '@/api/customer.js'

export default {
  data(){
    return{
      companyInfo:{},
      cus:null,
      customerList:{},
      yearList:[2024, 2025, 2026, 2027, 2028,2029, 2030, 2031, 2032, 2033, 2034],
    }
  },
  created() {
    this.customerList = getAllCustomerService().data
    this.companyInfo = getCompanyInfoService().data
    const printInfoStore = usePrintInfoStore()
    this.cus = printInfoStore.info
  },
  methods:{
    updateCompanyInfo(){
      let result = updateCompanyInfoService(this.companyInfo)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message + "，请刷新页面。", "success");
      }
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
  }
}
</script>

<style>

</style>