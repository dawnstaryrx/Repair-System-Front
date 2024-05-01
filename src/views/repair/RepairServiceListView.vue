<template>
  <lay-out-top></lay-out-top>
  <div style="padding-top: 60px;">
    <table class="table" style="text-align: center;">
      <thead>
        <tr>
          <th scope="col">维修次数</th>
          <!-- <th scope="col">维修请求流水号</th> -->
          <th scope="col">维修单号</th>
          <th scope="col">到达日期</th>
          <th scope="col">到达时间</th>
          <th scope="col">完成时间</th>
          <th scope="col">问题</th>
          <th scope="col">解决方法及结论</th>
          <th scope="col">是否维修成功</th>
          <th scope="col">遗留问题</th>
          <th scope="col">创建时间</th>
          <th scope="col">创建人</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(repair, index) in this.repairList" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <!-- <td>{{ repair.repairRequestId }}</td> -->
          <td>{{ getRequestInfo(repair.repairRequestId).orderNumber }}</td>
          <td>{{ repair.arriveDate }}</td>
          <td>{{ repair.arriveTime }}</td>
          <td>{{ repair.completeTime }}</td>
          <td>{{ repair.question }}</td>
          <td>{{ repair.solution }}</td>
          <td>{{ repair.repairSuccess }}</td>
          <td>{{ repair.questionLeave }}</td>
          <td>{{ repair.createTime }}</td>
          <td>{{ getUsernameById(repair.createUser) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LayOutTop from '@/components/LayOutTop.vue'
import {getRepairByIdService} from '@/api/repair.js'
import {getUserInfoByIdService} from '@/api/user.js'
import {getRepairRequestByIdService} from '@/api/repairRequest.js'

export default {
  components: { LayOutTop },
  data(){
    return {
      id:null,
      repairList:{},
    }
  },
  created(){
    this.id = this.$route.params.id
    this.repairList = getRepairByIdService(this.id).data;
  },
  methods:{
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    getRequestInfo(id){
      return getRepairRequestByIdService(id).data
    }
  }
}
</script>

<style>

</style>