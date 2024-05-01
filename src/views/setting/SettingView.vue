<template>
  <form target="iframe">
    <div class="row mb-3">
      <label for="computerName" class="col-sm-2 col-form-label">公司名称</label>
      <div class="col-sm-10">
        <input v-model="computerInfo.computerName" type="text" class="form-control" id="computerName">
      </div>
    </div>
    <div class="row mb-3">
      <label for="computerSite" class="col-sm-2 col-form-label">公司网址</label>
      <div class="col-sm-10">
        <input v-model="computerInfo.computerSite" type="text" class="form-control" id="computerSite">
      </div>
    </div>
    <button @click="updateComputerInfo()" type="submit" class="btn btn-primary">修改</button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>
</template>

<script>
import {getComputerInfoService, updateComputerInfoService} from '@/api/constant.js'
import alertUtil from '@/utils/alertUtil';
export default {
  data(){
    return{
      computerInfo:{}
    }
  },
  created() {
      this.computerInfo = getComputerInfoService().data
  },
  methods:{
    updateComputerInfo(){
      let result = updateComputerInfoService(this.computerInfo)
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