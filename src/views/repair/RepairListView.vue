<template>
  <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="repairRequestPageSearchInfo.customerName"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="客户名称">
        <input v-model="repairRequestPageSearchInfo.productModel"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="产品型号">
        <input v-model="repairRequestPageSearchInfo.createUser"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="创建人ID">
      </div>
    </div>

    <div class="col-12">
      <button @click="getPageInfo()" type="submit"  class="btn btn-primary">查询</button>
    </div>

  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

  <!-------------------------- 列表----------------------------->
  <table class="table" style="text-align: center;">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">流水号</th>
        <th scope="col">状态</th>
        <th scope="col">客户名</th>
        <th scope="col">服务日期</th>
        <th scope="col">服务类型</th>
        <th scope="col">产品类型</th>
        <th scope="col">产品型号</th>
        <th scope="col">产品序列号</th>
        <th scope="col">
          接线时间 
          <span style="margin-left: 5px; cursor:pointer" @click="sortByTimeChange()">↕️</span>
        </th>
        <th scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(repairRequest, index) in this.repairRequestPageList" :key="index">
        <th scope="row"> {{ index+1 }} </th>
        <td>{{ repairRequest.id }}</td>
        <td>
          <span v-if="getStatus(repairRequest.id).status == 0" style="background-color: red; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 1" style="background-color: orange; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 2" style="background-color: lightseagreen; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 3" style="background-color: green; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
        </td>
        <td>{{ repairRequest.customerName }}</td>
        <td>{{ repairRequest.serviceDate }}</td>
        <td>{{ repairRequest.serviceType }}</td>
        <td>{{ repairRequest.productType }}</td>
        <td>{{ repairRequest.productModel }}</td>
        <td>{{ repairRequest.productId }}</td>
        <td>{{ repairRequest.createTime }}</td>
        <td>
          <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getLookBtnId(repairRequest.id)>
            详情
          </button>
          <!-- 查看Modal -->
          <div class="modal fade" :id=getLookModelId(repairRequest.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">查看</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="requestIdLook" class="form-label">流水号</label>
                      <input type="text" class="form-control" id="requestIdLook" :value="repairRequest.id" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestStatusLook" class="form-label">状态</label>
                      <input type="text" class="form-control" id="requestStatusLook" :value="getStatus(repairRequest.id).statusName" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestCustomerNameLook" class="form-label">客户名</label>
                      <input type="text" class="form-control" id="requestCustomerNameLook" :value="repairRequest.customerName" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestEngineerNameLook" class="form-label">工程师名</label>
                      <input type="text" class="form-control" id="requestEngineerNameLook" :value="repairRequest.engineerName" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceDateLook" class="form-label">服务日期</label>
                      <input type="text" class="form-control" id="requestServiceDateLook" :value="repairRequest.serviceDate" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceTypeLook" class="form-label">服务类型</label>
                      <input type="text" class="form-control" id="requestServiceTypeLook" :value="repairRequest.serviceType" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestProductTypeLook" class="form-label">产品类别</label>
                      <input type="text" class="form-control" id="requestProductTypeLook" :value="repairRequest.productType" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestProductModelLook" class="form-label">产品型号</label>
                      <input type="text" class="form-control" id="requestProductModelLook" :value="repairRequest.productModel" readonly>
                    </div>
                    <div class="col-md-12">
                      <label for="requestProductIdLook" class="form-label">产品序列号</label>
                      <input type="text" class="form-control" id="requestProductIdLook" :value="repairRequest.productId" readonly>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text">客户对问题的描述</span>
                      <textarea v-model="repairRequest.serviceContent" class="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <div class="col-md-6">
                      <label for="createUserLook" class="form-label">创建人</label>
                      <input type="text" class="form-control" id="createUserLook" :value="getUsernameById(repairRequest.createUser)" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="createTimeLook" class="form-label">创建时间</label>
                      <input type="text" class="form-control" id="createTimeLook" :value="repairRequest.createTime" readonly>
                    </div>
                    <div class="col-md-6" v-if="repairRequest.updateUser != null">
                      <label for="updateUserLook" class="form-label">修改人</label>
                      <input type="text" class="form-control" id="updateUserLook" :value="getUsernameById(repairRequest.updateUser)" readonly>
                    </div>
                    <div class="col-md-6" v-if="repairRequest.updateTime != null">
                      <label for="updateTimeLook" class="form-label">修改时间</label>
                      <input type="text" class="form-control" id="updateTimeLook" :value="repairRequest.updateTime" readonly>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <router-link v-if="getStatus(repairRequest.id).status != 0"  target='_blank' :to="'/repair/service/' + repairRequest.id">维修记录</router-link>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import {getAllCustomerService} from '@/api/customer.js'
import {getUserListByRoleService, getUserInfoByIdService} from '@/api/user.js'
import { getAllTypeService } from '@/api/productType.js'
// import { getProductModelListService, getProductIdListService } from '@/api/product.js'
import {getRepairRequestListService, getRepairRequestStatusService} from '@/api/repairRequest.js'
// import alertUtil from '@/utils/alertUtil';
import { useUserInfoStore } from '@/stores/userInfo.js'

export default {
  data(){
    return {
      nowUser:{},
      customerList:{},
      engineerList:{},
      repairRequestPageList:{},
      repairRequestPageSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        customerName: "",
        engineerName: "",
        productModel:"",
        createUser:"",
        sortByTime: true,
      },
    }
  },
  created(){
    const userInfoStore = useUserInfoStore()
    this.nowUser = userInfoStore.info
    // this.repairRequestPageSearchInfo.engineerName = this.nowUser.name
    this.customerList = getAllCustomerService().data
    this.engineerList = getUserListByRoleService("WEI_XIU").data
    this.productTypeList = getAllTypeService().data
    this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
  },
  methods:{
    repairSetId(id){
      this.repairAddInfo.repairRequestId = id
    },
    sortByTimeChange(){
      this.repairRequestPageSearchInfo.sortByTime = !this.repairRequestPageSearchInfo.sortByTime
      this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
    },
    getLookBtnId(id){
      return "#Request" + id + "look"
    },
    getLookModelId(id){
      return "Request" + id + "look"
    },
    getStatus(id){
      return getRepairRequestStatusService(id).data
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    getPageInfo(){
      this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
    },
  },
}
</script>

<style>

</style>