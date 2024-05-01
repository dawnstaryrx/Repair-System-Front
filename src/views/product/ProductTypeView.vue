<template>
  <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="TypeListSearchInfo.name"  type="text" class="form-control" id="productType" placeholder="产品类型">
      </div>
    </div>
    <div class="col-12">
      <button @click="searchByName()" type="submit"  class="btn btn-primary">查询</button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProduct">
      新增产品类型
    </button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

    <!-- 新增Modal -->
    <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">新增产品类型</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3">
              <div class="col-md-12">
                <label for="productName" class="form-label">产品类型</label>
                <input v-model="name" type="text" class="form-control" id="productName">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
            <button @click="add()" type="button" class="btn btn-primary" >确认</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table" style="text-align: center;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">产品类型ID</th>
          <th scope="col">产品类型</th>
          <th scope="col">创建人</th>
          <th scope="col">
            创建时间 
            <span style="margin-left: 5px; cursor:pointer" @click="sortByTimeChange()">↕️</span>
          </th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(type, index) in this.TypeList" :key="index">
          <th scope="row"> {{ index+1 }} </th>
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td> {{ getUsernameById(type.createUser) }} </td>
          <td>{{ type.createTime }}</td>
          <td> 
            <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getDelBtnId(type.id)>
              删除
            </button>
            <!-- 查看Modal -->
            <div class="modal fade" :id=getDelModelId(type.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">删除</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" style="text-align: left;">
                    你确定删除产品类型 
                    <span style="font-weight: bold;"> {{ type.name }} </span> 吗？
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    <button @click="deleteType(type.id)" type="button" data-bs-dismiss="modal" class="btn btn-danger">确定</button>
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
        <select @click="getPageInfo()" v-model="TypeListSearchInfo.pageSize" class="form-select" aria-label="Default select example" style="width: 120px;">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <li class="page-item">
          <a class="page-link" @click="this.TypeListSearchInfo.pageNum -= 1; getPageInfo()" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a @click="this.TypeListSearchInfo.pageNum = 1; getPageInfo()" class="page-link" href="#">1</a></li>
        <li class="page-item"><a @click="this.TypeListSearchInfo.pageNum = 2; getPageInfo()" class="page-link" href="#">2</a></li>
        <li class="page-item"><a @click="this.TypeListSearchInfo.pageNum = 3; getPageInfo()" class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" @click="this.TypeListSearchInfo.pageNum += 1; getPageInfo()" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

</template>

<script>
import { typeAddService, getTypeListService, typeDeleteService } from '@/api/productType.js'
import alertUtil from '@/utils/alertUtil';
import {getUserInfoByIdService} from "@/api/user.js"
export default {
  data(){
    return{
      name:'',
      TypeListSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        sortByTime: false,
        name:'',
      },
      TypeList:{},
    }
  },
  methods:{
    add(){
      let result = typeAddService(this.name)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
          this.name = ''
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
          this.name = ''
      }
    },
    deleteType(id){
      let result = typeDeleteService(id)
      console.log("删除"+id)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
      }
    },
    sortByTimeChange(){
      this.TypeListSearchInfo.sortByTime = !this.TypeListSearchInfo.sortByTime
      this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    searchByName(){
      this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
    },
    getPageInfo(){
      this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
    },
    getDelBtnId(id){
      return "#Type" + id + "del"
    },
    getDelModelId(id){
      return "Type" + id + "del"
    }
  },
  created(){
    this.TypeList = getTypeListService(this.TypeListSearchInfo).data.items
  }
}
</script>

<style>

</style>