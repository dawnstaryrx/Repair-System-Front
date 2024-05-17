<template>
  <h1 style="text-align: center; padding-bottom: 30px; padding-top: 20px;">仪表盘</h1>
  <div class="row">
    <div class="col-sm-3 mb-3 mb-sm-0" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">用户数</h3>
          <h4 class="card-text">{{ DashBoardVO.user }}</h4>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">客户数</h3>
          <h4 class="card-text">{{ DashBoardVO.customer }}</h4>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修请求次数</h3>
          <h4 class="card-text">{{ DashBoardVO.repairRequest }}</h4>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修次数</h3>
          <h4 class="card-text">{{ DashBoardVO.repair }}</h4>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修成功数</h3>
          <h4 class="card-text">{{ printData.repairSuccess }}</h4>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">回访次数</h3>
          <h4 class="card-text">{{ printData.revisit }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDashBoardInfoService} from '@/api/constant.js'
import {getPrintDataService} from '@/api/constant'

export default {
  data(){
    return{
      DashBoardVO:{},
      printDTO:{
        customerId:null,
        year:null
      },
      printData:null,
    }
  },
  created(){
    this.DashBoardVO = getDashBoardInfoService().data
    this.printData = getPrintDataService(this.printDTO).data
  },
  methods:{

  }
}
</script>

<style>

</style>