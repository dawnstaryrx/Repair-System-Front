<template>
  <lay-out-top></lay-out-top>
  <div style="padding-top: 60px;">
    <table class="table" style="text-align: center;">
      <thead>
        <tr>
          <th scope="col">回访次数</th>
          <!-- <th scope="col">维修请求流水号</th> -->
          <th scope="col">维修单号</th>
          <th scope="col">客户</th>
          <th scope="col">工程师</th>
          <th scope="col">评价</th>
          <th scope="col">建议</th>
          <th scope="col">创建时间</th>
          <th scope="col">创建人</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(repairRevisit, index) in this.repairRevisits" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <!-- <td>{{ repairRevisit.repairRequestId }}</td> -->
          <td>{{ getRepairRequestInfoById(repairRevisit.repairRequestId).orderNumber }}</td>
          <td>{{ getRepairRequestInfoById(repairRevisit.repairRequestId).customerName }}</td>
          <td>{{ getRepairRequestInfoById(repairRevisit.repairRequestId).engineerName }}</td>
          <td>{{ repairRevisit.evaluateName }}</td>
          <td>{{ repairRevisit.advice }}</td>
          <td>{{ repairRevisit.createTime }}</td>
          <td>{{ getUsernameById(repairRevisit.createUser) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
import LayOutTop from '@/components/LayOutTop.vue'
import {repairRevisitFindByIdService} from '@/api/repairRevisit.js'
import {getRepairRequestByIdService} from '@/api/repairRequest.js'
import {getUserInfoByIdService} from '@/api/user.js'

export default {
  components: { LayOutTop },
  data(){
    return {
      repairRevisits:{},
      id: null
    }
  },
  created(){
    this.id = this.$route.params.id
    this.repairRevisits = repairRevisitFindByIdService(this.id).data;
    console.log(this.repairRevisit)
  },
  methods:{
    getRepairRequestInfoById(id){
      return getRepairRequestByIdService(id).data
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
  }
}
</script>

<style>

</style>