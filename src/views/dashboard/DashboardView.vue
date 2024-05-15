<template>
  <h1 style="text-align: center; padding-bottom: 30px; padding-top: 20px;">仪表盘</h1>
  <div class="row">
    <div class="col-sm-3 mb-3 mb-sm-0" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">用户数</h3>
          <p class="card-text">{{ DashBoardVO.user }}</p>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">客户数</h3>
          <p class="card-text">{{ DashBoardVO.customer }}</p>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修请求次数</h3>
          <p class="card-text">{{ DashBoardVO.repairRequest }}</p>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修次数</h3>
          <p class="card-text">{{ DashBoardVO.repair }}</p>
        </div>
      </div>
    </div>
    <div class="col-sm-3" style="padding-top: 20px;">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">维修成功数</h3>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDashBoardInfoService} from '@/api/constant.js'
export default {
  data(){
    return{
      DashBoardVO:{}
    }
  },
  created(){
    this.DashBoardVO = getDashBoardInfoService().data
  },
  methods:{

  }
}
</script>

<style>

</style>