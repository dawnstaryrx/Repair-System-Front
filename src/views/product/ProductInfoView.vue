<template>
    <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="productListSearchInfo.productTypeName" type="text" class="form-control" id="productTypeFind" placeholder="产品类别">
        <input v-model="productListSearchInfo.productModel" type="text" class="form-control" id="productModelFind" placeholder="产品型号">
        <input v-model="productListSearchInfo.createUser" type="text" class="form-control" id="createUserFind" placeholder="创建用户ID">
      </div>
        
    </div>
    <div class="col-12">
      <button @click="searchByInfo()"  type="submit"  class="btn btn-primary">查询</button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProductInfo">
      新增产品信息
    </button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

    <!-- 新增Modal -->
    <div class="modal fade" id="addProductInfo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">新增产品信息</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3">
              <div class="col-md-12">
                <label for="productType" class="form-label">产品类型</label>
                <select v-model="productAddInfo.productType" id="productType" class="form-select" aria-label="Default select example">
                  <option   v-for="(type, index) in this.productTypeInfo" :key="index" :value="type.id"> {{ type.name }} </option>
                </select>
              </div>
              <div class="col-md-12">
                <label for="productModel" class="form-label">产品型号</label>
                <input v-model="productAddInfo.productModel" type="text" class="form-control" id="productModel">
              </div>
              <div class="col-md-12">
                <label for="productId" class="form-label">产品序列号</label>
                <input v-model="productAddInfo.productId" type="text" class="form-control" id="productId">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            <button @click="addProduct()" type="button" class="btn btn-primary" >确认</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table" style="text-align: center;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">产品ID</th>
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
        <tr v-for="(product, index) in this.productList" :key="index">
          <th scope="row"> {{ index+1 }} </th>
          <td>{{ product.id }}</td>
          <td>{{ product.productTypeName }}</td>
          <td>{{ product.productModel }}</td>
          <td> {{ product.productId }} </td>
          <td> {{ getUsernameById(product.createUser) }} </td>
          <td>{{ product.createTime }}</td>
          <td>
            <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getLookBtnId(product.id)>
              查看
            </button>
            <!-- 查看Modal -->
            <div class="modal fade" :id=getLookModelId(product.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">查看</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" style="text-align: left;">
                    <form class="row g-3">
                      <div class="col-md-12">
                        <label for="idLook" class="form-label">产品ID</label>
                        <input type="text" class="form-control" id="idLook" :value="product.id" readonly>
                      </div>
                      <div class="col-md-6">
                        <label for="typeLook" class="form-label">产品类别</label>
                        <input type="text" class="form-control" id="typeLook" :value="product.productTypeName" readonly>
                      </div>
                      <div class="col-md-6">
                        <label for="nameLook" class="form-label">产品型号</label>
                        <input type="text" class="form-control" id="nameLook" :value="product.productModel" readonly>
                      </div>
                      <div class="col-md-12">
                        <label for="xidLook" class="form-label">产品序列号</label>
                        <input type="text" class="form-control" id="xidLook" :value="product.productId" readonly>
                      </div>
                      <div class="col-md-6">
                        <label for="createUserLook" class="form-label">创建人</label>
                        <input type="text" class="form-control" id="createUserLook" :value="getUsernameById(product.createUser)" readonly>
                      </div>
                      <div class="col-md-6">
                        <label for="createTimeLook" class="form-label">创建时间</label>
                        <input type="datetime" class="form-control" id="createTimeLook" :value="product.createTime" readonly>
                      </div>
                      <div class="col-md-6" v-if="product.updateUser != null">
                        <label for="updateUserLook" class="form-label">修改人</label>
                        <input type="text" class="form-control" id="updateUserLook" :value="getUsernameById(product.updateUser)" readonly>
                      </div>
                      <div class="col-md-6" v-if="product.updateTime != null">
                        <label for="updateTimeLook" class="form-label">修改时间</label>
                        <input type="datetime" class="form-control" id="updateTimeLook" :value="product.updateTime" readonly>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <button @click="updateUpdateData(product.id, product.productType, product.productTypeName, product.productModel, product.productId)" type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getEditBtnId(product.id)>
              编辑
            </button>
            <!-- 查看Modal -->
            <div class="modal fade" :id=getEditModelId(product.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">编辑</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" style="text-align: left;">
                    <form class="row g-3">
                      <div class="col-md-12">
                        <label for="idLook" class="form-label">产品ID</label>
                        <input type="text" class="form-control" id="idLook" :value="product.id" disabled>
                      </div>
                      <div class="col-md-6">
                        <label for="productTypeEdit" class="form-label">产品类别</label>
                        <select v-model="productUpdateInfo.productType" id="productTypeEdit" class="form-select" aria-label="Default select example">
                          <option   v-for="(type, index) in this.productTypeInfo" :key="index" :value="type.id"> {{ type.name }} </option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="nameLook" class="form-label">产品型号</label>
                        <input v-model="productUpdateInfo.productModel" type="text" class="form-control" id="nameLook">
                      </div>
                      <div class="col-md-12">
                        <label for="xidLook" class="form-label">产品序列号</label>
                        <input v-model="productUpdateInfo.productId" type="text" class="form-control" id="xidLook">
                      </div>
                      <div class="col-md-6">
                        <label for="createUserLook" class="form-label">创建人</label>
                        <input type="text" class="form-control" id="createUserLook" :value="getUsernameById(product.createUser)" disabled>
                      </div>
                      <div class="col-md-6">
                        <label for="createTimeLook" class="form-label">创建时间</label>
                        <input type="datetime" class="form-control" id="createTimeLook" :value="product.createTime" disabled>
                      </div>
                      <div class="col-md-6" v-if="product.updateUser != null">
                        <label for="updateUserLook" class="form-label">修改人</label>
                        <input type="text" class="form-control" id="updateUserLook" :value="getUsernameById(product.updateUser)" disabled>
                      </div>
                      <div class="col-md-6" v-if="product.updateTime != null">
                        <label for="updateTimeLook" class="form-label">修改时间</label>
                        <input type="datetime" class="form-control" id="updateTimeLook" :value="product.updateTime" disabled>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button @click="updateProduct()" type="button" data-bs-dismiss="modal" class="btn btn-primary">保存</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <button v-if="userIsRole('GUAN_LI')" type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getDelBtnId(product.id)>
              删除
            </button>
            <!-- 删除Modal -->
            <div class="modal fade" :id=getDelModelId(product.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">删除</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" style="text-align: left;">
                    你确定删除产品 
                    <span style="font-weight: bold;"> {{ product.productModel }} {{ product.productId }} </span> 吗？
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button @click="deleteProduct(product.id)" type="button" data-bs-dismiss="modal" class="btn btn-danger">确定</button>
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
        <select @click="getPageInfo()" v-model="productListSearchInfo.pageSize" class="form-select" aria-label="Default select example" style="width: 100px;">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <li class="page-item">
          <a class="page-link" @click="this.productListSearchInfo.pageNum -= 1; getPageInfo()" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a @click="this.productListSearchInfo.pageNum = 1; getPageInfo()" class="page-link" href="#">1</a></li>
        <li class="page-item"><a @click="this.productListSearchInfo.pageNum = 2; getPageInfo()" class="page-link" href="#">2</a></li>
        <li class="page-item"><a @click="this.productListSearchInfo.pageNum = 3; getPageInfo()" class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" @click="this.productListSearchInfo.pageNum += 1; getPageInfo()" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

</template>

<script>
import { getAllTypeService } from '@/api/productType.js'
import { productAddService, getProductListService, productUpdateService, productDeleteService } from '@/api/product.js'
import alertUtil from '@/utils/alertUtil';
import {getUserInfoByIdService} from "@/api/user.js"
import {getUserIsRoleService} from '@/api/user.js'
import { useUserInfoStore } from '@/stores/userInfo.js'


export default {
  data(){
    return{
      productTypeInfo:{},
      productAddInfo:{
        productType: null,
        productModel: "",
        productId: ""
      },
      productListSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        sortByTime: false,
        productTypeName: "",
        productModel: "",
        createUser: "",
      },
      productList:{},
      productUpdateInfo:{
        id: null,
        productType: null,
        productModel: "",
        productId: 0,
      },
      // productUpdateDTO:{},
    }
  },
  created(){
    this.productTypeInfo = getAllTypeService().data
    this.productList = getProductListService(this.productListSearchInfo).data.items
    console.log(this.productList)
  },
  methods:{
    userIsRole(role){
      const userInfoStore = useUserInfoStore()
      let nowUser = userInfoStore.info
      return getUserIsRoleService(nowUser.id, role).data
    },
    getLookBtnId(id){
      return "#Product" + id + "look"
    },
    getLookModelId(id){
      return "Product" + id + "look"
    },
    getDelBtnId(id){
      return "#Product" + id + "del"
    },
    getDelModelId(id){
      return "Product" + id + "del"
    },
    getEditBtnId(id){
      return "#Product" + id + "Edit"
    },
    getEditModelId(id){
      return "Product" + id + "Edit"
    },
    searchByInfo(){
      this.productList = getProductListService(this.productListSearchInfo).data.items
    },
    getPageInfo(){
      this.productList = getProductListService(this.productListSearchInfo).data.items
    },
    addProduct(){
      let result = productAddService(this.productAddInfo);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.productList = getProductListService(this.productListSearchInfo).data.items
          this.productAddInfo = {
            productType: null,
            productId: "",
            productModel: ""
          }
      }
    },
    updateUpdateData(id, productType, productModel, productId){
      this.productUpdateInfo.id = id
      this.productUpdateInfo.productType = productType
      this.productUpdateInfo.productModel = productModel
      this.productUpdateInfo.productId = productId
    },
    updateProduct(){
      let result = productUpdateService(this.productUpdateInfo);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.productList = getProductListService(this.productListSearchInfo).data.items
      }
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    sortByTimeChange(){
      this.productListSearchInfo.sortByTime = !this.productListSearchInfo.sortByTime
      this.productList = getProductListService(this.productListSearchInfo).data.items
    },
    deleteProduct(id){
      let result = productDeleteService(id);
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.productList = getProductListService(this.productListSearchInfo).data.items
      }
    }
  },
}
</script>

<style>

</style>