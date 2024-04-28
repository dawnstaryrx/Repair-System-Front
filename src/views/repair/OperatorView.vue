<template>
  <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="repairRequestPageSearchInfo.customerName"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="客户名称">
        <input v-model="repairRequestPageSearchInfo.engineerName"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="工程师姓名">
        <input v-model="repairRequestPageSearchInfo.productModel"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="产品型号">
        <input v-model="repairRequestPageSearchInfo.createUser"  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="创建人ID">
      </div>
    </div>

    <div class="col-12">
      <button @click="getPageInfo()" type="submit"  class="btn btn-primary">查询</button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addRepairRequest">
      新增维修请求
    </button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

  <!------------ 新增Modal ----------->
  <div class="modal fade" id="addRepairRequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增维修请求</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-md-6">
              <label for="customerAdd" class="form-label">客户</label>
              <select v-model="repairRequestInfo.customerId" id="customerAdd" class="form-select" aria-label="Default select example">
                <option v-for="(customer, index) in this.customerList" :key="index" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="engineerAdd" class="form-label">维修工程师</label>
              <select v-model="repairRequestInfo.engineerId" id="engineerAdd" class="form-select" aria-label="Default select example">
                <option v-for="(user, index) in this.engineerList" :key="index" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label  for="serviceTimeAdd" class="form-label">服务日期</label>
              <input v-model="repairRequestInfo.serviceDate" type="date" class="form-control" id="serviceTimeAdd">
            </div>
            <div class="col-md-6">
              <label for="serviceTypeAdd" class="form-label">服务类型</label>
              <select v-model="repairRequestInfo.serviceType" id="serviceTypeAdd" class="form-select" aria-label="Default select example">
                <option value="驻场维护" selected>驻场维护</option>
                <option value="故障报修">故障报修</option>
                <option value="远程支持">远程支持</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="productTypeAdd" class="form-label">产品类别</label>
              <select @change="getModelList()" v-model="repairRequestInfo.productType"  id="productTypeAdd" class="form-select" aria-label="Default select example">
                <option    v-for="(type, index) in this.productTypeList" :key="index" :value="type.id"> {{ type.name }} </option>
              </select>
            </div>
            <div  class="col-md-6">
              <label for="productModelAdd" class="form-label">产品型号</label>
              <select @change="getIdList()" v-model="repairRequestInfo.productModel"  id="productModelAdd" class="form-select" aria-label="Default select example">
                <option    v-for="(model, index) in this.productModelList" :key="index" :value="model"> {{ model }} </option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="productIdAdd" class="form-label">产品序列号</label>
              <select  v-model="repairRequestInfo.productId" id="productIdAdd" class="form-select" aria-label="Default select example">
                <option    v-for="(id, index) in this.productIdList" :key="index" :value="id"> {{ id }} </option>
              </select>
            </div>
            <div class="input-group">
              <span class="input-group-text">客户对问题的描述</span>
              <textarea v-model="repairRequestInfo.serviceContent" class="form-control" aria-label="With textarea"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          <button @click="addRepairRequest()" type="button" data-bs-dismiss="modal" class="btn btn-primary">确认</button>
        </div>
      </div>
    </div>
  </div>

  <!-------------------------- 列表----------------------------->
  <table class="table" style="text-align: center;">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">流水号</th>
        <th scope="col">状态</th>
        <th scope="col">客户名</th>
        <th scope="col">工程师名</th>
        <th scope="col">服务日期</th>
        <th scope="col">服务类型</th>
        <th scope="col">产品类型</th>
        <th scope="col">产品型号</th>
        <th scope="col">产品序列号</th>
        <th scope="col">创建人</th>
        <th scope="col">
          创建时间 
          <span style="margin-left: 5px; cursor:pointer" @click="sortByTimeChange()">↕️</span>
        </th>
        <th scope="col">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(repairRequest, index) in this.repairRequestPageList" :key="index">
        <th scope="row"> {{ index+1 }} </th>
        <td>{{ repairRequest.id }}</td>
        <td v-if="getStatus(repairRequest.id).status != null">
          <span v-if="getStatus(repairRequest.id).status == 0" style="background-color: red; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 1" style="background-color: orange; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 2" style="background-color: lightseagreen; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 3" style="background-color: green; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
          <span v-else-if="getStatus(repairRequest.id).status == 5" style="background-color: blue; color: white;">{{ getStatus(repairRequest.id).statusName }}</span>
        </td>
        <td>{{ repairRequest.customerName }}</td>
        <td>{{ repairRequest.engineerName }}</td>
        <td>{{ repairRequest.serviceDate }}</td>
        <td>{{ repairRequest.serviceType }}</td>
        <td>{{ repairRequest.productType }}</td>
        <td>{{ repairRequest.productModel }}</td>
        <td>{{ repairRequest.productId }}</td>
        <td> {{ getUsernameById(repairRequest.createUser) }} </td>
        <td>{{ repairRequest.createTime }}</td>
        <td>
          <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getLookBtnId(repairRequest.id)>
            查看
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
                      <label for="requestIdLook" class="form-label">维修请求ID</label>
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
          <button @click="updateUpdateData(repairRequest.id, repairRequest.customerId, repairRequest.engineerId, repairRequest.serviceDate, repairRequest.serviceContent, repairRequest.serviceType, repairRequest.productType, repairRequest.productModel, repairRequest.productId)" type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getEditBtnId(repairRequest.id)>
            编辑
          </button>
          <!-- 编辑Modal -->
          <div class="modal fade" :id=getEditModelId(repairRequest.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">编辑</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                  <form class="row g-3">
                    <div class="col-md-6">
                      <label for="requestIdLook" class="form-label">维修请求ID</label>
                      <input type="text" class="form-control" id="requestIdLook" :value="repairRequest.id" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestStatusUpdate" class="form-label">状态</label>
                      <input type="text" class="form-control" id="requestStatusUpdate" :value="getStatus(repairRequest.id).statusName" readonly>
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceCustomerNameUpdate" class="form-label">客户</label>
                      <select v-model="repairRequestUpdateInfo.customerId" id="requestServiceCustomerNameUpdate" class="form-select" aria-label="Default select example">
                        <option v-for="(customer, index) in this.customerList" :key="index" :value="customer.id">{{ customer.name }}</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceEngineerNameUpdate" class="form-label">维修工程师</label>
                      <select v-model="repairRequestUpdateInfo.engineerId" id="requestServiceCustomerNameUpdate" class="form-select" aria-label="Default select example">
                        <option v-for="(user, index) in this.engineerList" :key="index" :value="user.id">{{ user.name }}</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceDateUpdate" class="form-label">服务日期</label>
                      <input v-model="repairRequestUpdateInfo.serviceDate" type="date" class="form-control" id="requestServiceDateUpdate" >
                    </div>
                    <div class="col-md-6">
                      <label for="requestServiceTypeUpdate" class="form-label">服务类型</label>
                      <select v-model="repairRequestUpdateInfo.serviceType" id="requestServiceTypeUpdate" class="form-select" aria-label="Default select example">
                        <option value="驻场维护" selected>驻场维护</option>
                        <option value="故障报修">故障报修</option>
                        <option value="远程支持">远程支持</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="requestProductTypeUpdat" class="form-label">产品类别</label>
                      <select @change="getUpdateModelList()" v-model="repairRequestUpdateInfo.productType"  id="requestProductTypeUpdat" class="form-select" aria-label="Default select example">
                        <option    v-for="(type, index) in this.productTypeUpdateList" :key="index" :value="type.id"> {{ type.name }} </option>
                      </select>
                    </div>
                    <div  class="col-md-6">
                      <label for="requestProductModelUpdate" class="form-label">产品型号</label>
                      <select @change="getUpdateIdList()" v-model="repairRequestUpdateInfo.productModel"  id="requestProductModelUpdate" class="form-select" aria-label="Default select example">
                        <option    v-for="(model, index) in this.productModelUpdateList" :key="index" :value="model"> {{ model }} </option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <label for="requestProductIdUpdate" class="form-label">产品序列号</label>
                      <select  v-model="repairRequestUpdateInfo.productId" id="requestProductIdUpdate" class="form-select" aria-label="Default select example">
                        <option    v-for="(id, index) in this.productIdUpdateList" :key="index" :value="id"> {{ id }} </option>
                      </select>
                    </div>
                    <div class="input-group">
                      <span class="input-group-text">客户对问题的描述</span>
                      <textarea v-model="repairRequestUpdateInfo.serviceContent" class="form-control" aria-label="With textarea"></textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                  <button @click="updateRepairRequest()" type="button" class="btn btn-primary" data-bs-dismiss="modal">保存</button>
                </div>
              </div>
            </div>
          </div>

          <button v-if="getStatus(repairRequest.id).status == 0" type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getDelBtnId(repairRequest.id)>
            删除
          </button>
          <!-- 查看Modal -->
          <div class="modal fade" :id=getDelModelId(repairRequest.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">删除</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                  你确定删除客户
                  <span style="font-weight: bolder;">{{repairRequest.customerName}}</span>
                  的维修请求 <span style="font-weight: bolder;">{{repairRequest.id}}</span> 吗？
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                  <button @click="deleteRepairRequest(repairRequest.id)" type="button" data-bs-dismiss="modal" class="btn btn-danger">确定</button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import {getAllCustomerService} from '@/api/customer.js'
import {getUserListByRoleService, getUserInfoByIdService} from '@/api/user.js'
import { getAllTypeService } from '@/api/productType.js'
import { getProductModelListService, getProductIdListService } from '@/api/product.js'
import {repairRequestDeleteService, repairRequestUpdateService, repairRequestAddService, getRepairRequestListService, getRepairRequestStatusService} from '@/api/repairRequest.js'
import alertUtil from '@/utils/alertUtil';

export default {
  data(){
    return {
      customerList:{},
      engineerList:{},
      productTypeList:{},
      productModelList:{},
      productIdList:{},

      productTypeUpdateList:{},
      productModelUpdateList:{},
      productIdUpdateList:{},

      repairRequestInfo:{
        customerId: "",
        engineerId:"",
        serviceDate:"",
        serviceType:"",
        serviceContent:"",
        productType:null,
        productModel:"",
        productId:""
      },
      repairRequestPageList:{},
      repairRequestPageSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        customerName: "",
        engineerName:"",
        productModel:"",
        createUser:"",
        sortByTime:true,
      },
      repairRequestUpdateInfo:{
        id:null,
        customerId:null,
        engineerId:null,
        serviceDate:"",
        serviceContent:"",
        serviceType:"",
        productType:"",
        productModel:"",
        productId:""
      },
    }
  },
  created(){
    this.customerList = getAllCustomerService().data
    this.engineerList = getUserListByRoleService("WEI_XIU").data
    this.productTypeList = getAllTypeService().data
    
    this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
  },
  methods:{
    deleteRepairRequest(id){
      let result = repairRequestDeleteService(id);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
      }
    },
    sortByTimeChange(){
      this.repairRequestPageSearchInfo.sortByTime = !this.repairRequestPageSearchInfo.sortByTime
      this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
    },
    updateUpdateData(id, customerId, engineerId, serviceDate, serviceContent, serviceType, productType, productModel, productId){
      this.repairRequestUpdateInfo.id = id
      this.repairRequestUpdateInfo.customerId = customerId
      this.repairRequestUpdateInfo.engineerId = engineerId
      this.repairRequestUpdateInfo.serviceDate = serviceDate
      this.repairRequestUpdateInfo.serviceContent = serviceContent
      this.repairRequestUpdateInfo.serviceType = serviceType
      this.repairRequestUpdateInfo.productType = productType
      this.repairRequestUpdateInfo.productModel = productModel
      this.repairRequestUpdateInfo.productId = productId

      this.productTypeUpdateList = getAllTypeService().data
      this.productModelUpdateList = getProductModelListService(this.repairRequestUpdateInfo.productType).data;
      this.productIdUpdateList = getProductIdListService(this.repairRequestUpdateInfo.productModel).data;
    },
    updateRepairRequest(){
      console.log(this.repairRequestUpdateInfo)
      let result = repairRequestUpdateService(this.repairRequestUpdateInfo);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
      }
    },
    getLookBtnId(id){
      return "#Request" + id + "look"
    },
    getLookModelId(id){
      return "Request" + id + "look"
    },
    getEditBtnId(id){
      return "#Request" + id + "Edit"
    },
    getEditModelId(id){
      return "Request" + id + "Edit"
    },
    getDelBtnId(id){
      return "#Request" + id + "Del"
    },
    getDelModelId(id){
      return "Request" + id + "Del"
    },
    getStatus(id){
      return getRepairRequestStatusService(id).data
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    getModelList(){
      this.productModelList = getProductModelListService(this.repairRequestInfo.productType).data;
      this.productIdList = {}
    },
    getIdList(){
      this.productIdList = getProductIdListService(this.repairRequestInfo.productModel).data;
    },
    getUpdateModelList(){
      this.productModelUpdateList = getProductModelListService(this.repairRequestUpdateInfo.productType).data;
      this.productIdUpdateList = {}
    },
    getUpdateIdList(){
      this.productIdUpdateList = getProductIdListService(this.repairRequestUpdateInfo.productModel).data;
    },
    getPageInfo(){
      this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
    },
    addRepairRequest(){
      let result = repairRequestAddService(this.repairRequestInfo);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.repairRequestInfo = {
            customerId: "",
            engineerId:"",
            serviceDate:"",
            serviceType:"",
            serviceContent:"",
            productType:null,
            productModel:"",
            productId:""
          }
          this.repairRequestPageList = getRepairRequestListService(this.repairRequestPageSearchInfo).data.items
      }
    }
  },
}
</script>

<style>

</style>