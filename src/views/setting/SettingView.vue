<template>
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
</template>

<script>
import {getCompanyInfoService, updateCompanyInfoService} from '@/api/constant.js'
import alertUtil from '@/utils/alertUtil';
export default {
  data(){
    return{
      companyInfo:{}
    }
  },
  created() {
      this.companyInfo = getCompanyInfoService().data
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
    }
  }
}
</script>

<style>

</style>