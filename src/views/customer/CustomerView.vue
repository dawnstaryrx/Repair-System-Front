<template>
  <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="customerSearchInfo.name" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="客户名">
      </div>
    </div>

    <div class="col-12">
      <button type="submit" @click="searchByName()" class="btn btn-primary">查询</button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCustomer">
      新增客户
    </button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

  <!-- 新增Modal -->
  <div class="modal fade" id="addCustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增客户</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-md-12">
              <label for="nameAdd" class="form-label">客户名</label>
              <input v-model="customerAddData.name" type="text" class="form-control" id="nameAdd">
            </div>
            <div class="col-md-6">
              <label for="contactPersonAdd" class="form-label">联系人</label>
              <input v-model="customerAddData.contactPerson" type="text" class="form-control" id="contactPersonAdd">
            </div>
            <div class="col-md-6">
              <label for="phoneAdd" class="form-label">联系方式</label>
              <input v-model="customerAddData.phone" type="text" class="form-control" id="phoneAdd">
            </div>
            <div class="col-md-12">
              <label for="addressAdd" class="form-label">地址</label>
              <input v-model="customerAddData.address" type="text" class="form-control" id="addressAdd">
            </div>
            <div class="col-md-12">
              <label for="remarkAdd" class="form-label">备注</label>
              <input v-model="customerAddData.remark" type="text" class="form-control" id="remarkAdd">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          <button @click="addCustomer()" type="button" class="btn btn-primary">确认</button>
        </div>
      </div>
    </div>
  </div>

  <table class="table" style="text-align: center;">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">客户ID</th>
      <th scope="col">客户名</th>
      <th scope="col">联系人</th>
      <th scope="col">联系方式</th>
      <th scope="col">地址</th>
      <th scope="col">创建人</th>
      <th scope="col">
        创建时间 
        <span style="margin-left: 5px; cursor:pointer" @click="sortByTimeChange()">↕️</span>
      </th>
      <th scope="col">备注</th>
      <th scope="col">操作</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(customer, index) in this.customerInfo" :key="index">
      <th scope="row"> {{ index+1 }} </th>
      <td>{{ customer.id }}</td>
      <td>{{ customer.name }}</td>
      <td>{{ customer.contactPerson }}</td>
      <td>{{ customer.phone }}</td>
      <td>{{ customer.address }}</td>
      <td> {{ getUsernameById(customer.createUser) }} </td>
      <td>{{ customer.createTime }}</td>
      <td>{{ customer.remark }}</td>
      <td>
        <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getLookBtnId(customer.id)>
          查看
        </button>
        <!-- 查看Modal -->
        <div class="modal fade" :id=getLookModelId(customer.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">查看</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" style="text-align: left;">
                <form class="row g-3">
                  <div class="col-md-12">
                    <label for="id" class="form-label">客户ID</label>
                    <input type="text" class="form-control" id="id" :value="customer.id" readonly>
                  </div>
                  <div class="col-md-6">
                    <label for="name" class="form-label">客户名</label>
                    <input type="text" class="form-control" id="name" :value="customer.name" readonly>
                  </div>
                  <div class="col-md-6">
                    <label for="contactPersonLook" class="form-label">联系人</label>
                    <input type="text" class="form-control" id="contactPersonLook" :value="customer.contactPerson" readonly>
                  </div>
                  <div class="col-12">
                    <label for="phone" class="form-label">联系方式</label>
                    <input type="text" class="form-control" id="phone" :value="customer.phone" readonly>
                  </div>
                  <div class="col-12">
                    <label for="address" class="form-label">地址</label>
                    <input type="text" class="form-control" id="address" :value="customer.address" readonly>
                  </div>
                  <div class="col-md-6">
                    <label for="createUser" class="form-label">创建人</label>
                    <input type="text" class="form-control" id="createUser" :value="getUsernameById(customer.createUser)" readonly>
                  </div>
                  <div class="col-md-6">
                    <label for="createTime" class="form-label">创建时间</label>
                    <input type="text" class="form-control" id="createTime" :value="customer.createTime" readonly>
                  </div>
                  <div class="col-md-6" v-if="customer.updateUser != null">
                    <label for="updateUser" class="form-label">修改人</label>
                    <input type="text" class="form-control" id="updateUser" :value="getUsernameById(customer.updateUser)" readonly>
                  </div>
                  <div class="col-md-6" v-if="customer.updateTime != null">
                    <label for="updateTime" class="form-label">修改时间</label>
                    <input type="text" class="form-control" id="updateTime" :value="customer.updateTime" readonly>
                  </div>
                  <div class="col-md-12">
                    <label for="remark" class="form-label">备注</label>
                    <input type="text" class="form-control" id="remark" :value="customer.remark" readonly>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <button @click="updateUpdateData(customer.id,customer.name,customer.contactPerson,customer.phone,customer.address,customer.remark,customer.createTime,customer.createUser)" type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getEditBtnId(customer.id)>
          编辑
        </button>
        <!-- 编辑Modal -->
        <div class="modal fade" :id=getEditModelId(customer.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">编辑</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" style="text-align: left;">
                <form class="row g-3">
                  <div class="col-md-12">
                    <label for="idUpdate" class="form-label">客户ID</label>
                    <input v-model="customerUpdateData.id" type="text" class="form-control" id="idUpdate"  disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="nameUpdate" class="form-label">客户名</label>
                    <input v-model="customerUpdateData.name" type="text" class="form-control" id="nameUpdate" >
                  </div>
                  <div class="col-md-6">
                    <label for="contactPersonUpdate" class="form-label">联系人</label>
                    <input v-model="customerUpdateData.contactPerson" type="text" class="form-control" id="contactPersonUpdate" >
                  </div>
                  <div class="col-12">
                    <label for="phoneUpdate" class="form-label">联系方式</label>
                    <input v-model="customerUpdateData.phone" type="text" class="form-control" id="phoneUpdate" >
                  </div>
                  <div class="col-12">
                    <label for="addressUpdate" class="form-label">地址</label>
                    <input v-model="customerUpdateData.address" type="text" class="form-control" id="addressUpdate" >
                  </div>
                  <div class="col-md-6">
                    <label for="createUserUpdate" class="form-label">创建人</label>
                    <input :value="getUsernameById(customer.createUser)" type="text" class="form-control" id="createUserUpdate"  disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="createTimeUpdate" class="form-label">创建时间</label>
                    <input v-model="customerUpdateData.createTime" type="text" class="form-control" id="createTimeUpdate"  disabled>
                  </div>
                  <div class="col-md-6" v-if="customer.updateUser != null">
                    <label for="updateUserUpdate" class="form-label">修改人</label>
                    <input type="text" class="form-control" id="updateUserUpdate" :value="getUsernameById(customer.updateUser)"  disabled>
                  </div>
                  <div class="col-md-6" v-if="customer.updateTime != null">
                    <label for="updateTimeUpdate" class="form-label">修改时间</label>
                    <input type="text" class="form-control" id="updateTimeUpdate" :value="customer.updateTime"  disabled>
                  </div>
                  <div class="col-md-12">
                    <label for="remarkUpdate" class="form-label">备注</label>
                    <input v-model="customerUpdateData.remark" type="text" class="form-control" id="remarkUpdate">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                <button @click="updateCustomer()" type="button" class="btn btn-primary">保存</button>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getDelBtnId(customer.id)>
          删除
        </button>
        <!-- 查看Modal -->
        <div class="modal fade" :id=getDelModelId(customer.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">删除</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" style="text-align: left;">
                你确定删除客户 {{ customer.name }} （联系人：{{ customer.contactPerson }}）吗？
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                <button @click="deleteCustomer(customer.id)" type="button" data-bs-dismiss="modal" class="btn btn-danger">确定</button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <select @click="getPageInfo()" v-model="customerSearchInfo.pageSize" class="form-select" aria-label="Default select example" style="width: 100px;">
      <option value="2" selected>2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="3">Three</option>
    </select>
    <li class="page-item">
      <a class="page-link" @click="this.customerSearchInfo.pageNum -= 1; getPageInfo()" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a @click="this.customerSearchInfo.pageNum = 1; getPageInfo()" class="page-link" href="#">1</a></li>
    <li class="page-item"><a @click="this.customerSearchInfo.pageNum = 2; getPageInfo()" class="page-link" href="#">2</a></li>
    <li class="page-item"><a @click="this.customerSearchInfo.pageNum = 3; getPageInfo()" class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" @click="this.customerSearchInfo.pageNum += 1; getPageInfo()" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
import {customerInfoService, customerAddService, customerUpdateService, customerDeleteService} from "@/api/customer.js"
import {getUserInfoByIdService} from "@/api/user.js"
import alertUtil from '@/utils/alertUtil';

export default {
  data(){
    return{
      customerSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        name: "",
        sortByTime: false
      },
      customerInfo:{},
      customerAddData:{
        name:"",
        contactPerson:"",
        phone:"",
        address:"",
        remark:"",
        createTime: null,
        createUser: null
      },
      customerUpdateData:{
        id:null,
        name:"",
        contactPerson:"",
        phone:"",
        address:"",
        remark:"",
        createTime: null,
        createUser: null
      },
    }
  },
  methods:{
    addCustomer(){
      let result = customerAddService(this.customerAddData)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.customerAddData = {}
          this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
      }
    },
    deleteCustomer(id){
      let result = customerDeleteService(id)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
      }
    },
    updateCustomer(){
      let result = customerUpdateService(this.customerUpdateData)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.customerAddData = {}
          this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
      }
    },
    updateUpdateData(id,name,contactPerson, phone,address,remark,createTime,createUser){
      this.customerUpdateData.id = id
      this.customerUpdateData.name = name
      this.customerUpdateData.contactPerson = contactPerson
      this.customerUpdateData.phone = phone
      this.customerUpdateData.address = address
      this.customerUpdateData.remark = remark
      this.customerUpdateData.createTime = createTime
      this.customerUpdateData.createUser = createUser
    },
    sortByTimeChange(){
      this.customerSearchInfo.sortByTime = !this.customerSearchInfo.sortByTime
      this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
    },
    searchByName(){
      this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
    },
    getPageInfo(){
      this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    getEditBtnId(id){
      return "#Customer" + id + "edit"
    },
    getEditModelId(id){
      return "Customer" + id + "edit"
    },
    getLookBtnId(id){
      return "#Customer" + id + "look"
    },
    getLookModelId(id){
      return "Customer" + id + "look"
    },
    getDelBtnId(id){
      return "#Customer" + id + "del"
    },
    getDelModelId(id){
      return "Customer" + id + "del"
    }
  },
  created(){
    this.customerInfo = customerInfoService(this.customerSearchInfo).data.items
  }

}
</script>

<style>

</style>