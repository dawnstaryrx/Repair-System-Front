<template>
  <form class="row row-cols-lg-auto g-3 align-items-center" target="iframe">
    <div class="col-12">
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input v-model="userListSearchInfo.name" type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="用户名">
      </div>
    </div>

    <div class="col-12">
      <button type="submit" @click="searchByName()" class="btn btn-primary">查询</button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUser">
      新增用户
    </button>
  </form>
  <iframe id="frame" name="iframe" style="display:none;"></iframe>

  <!-- 新增Modal -->
  <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增用户</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form target="iframe">
            <div class="row mb-3">
              <label for="username" class="col-sm-2 col-form-label">用户名</label>
              <div class="col-sm-10">
                <input v-model="registerData.username" type="text" class="form-control" id="username">
              </div>
            </div>
            <div class="row mb-3">
              <label for="name" class="col-sm-2 col-form-label">姓名</label>
              <div class="col-sm-10">
                <input v-model="registerData.name" type="text" class="form-control" id="name">
              </div>
            </div>
            <div class="row mb-3">
              <label for="password" class="col-sm-2 col-form-label">密码</label>
              <div class="col-sm-10">
                <input v-model="registerData.password" type="password" class="form-control" id="password">
              </div>
            </div>
            <div class="row mb-3">
              <label for="rePassword" class="col-sm-2 col-form-label">确认密码</label>
              <div class="col-sm-10">
                <input v-model="registerData.rePassword" type="password" class="form-control" id="rePassword">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          <button @click="register()" type="button" class="btn btn-primary">确认</button>
        </div>
      </div>
    </div>
  </div>

  <table class="table" style="text-align: center;">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">用户ID</th>
      <th scope="col">用户名</th>
      <th scope="col">姓名</th>
      <th scope="col">联系方式</th>
      <th scope="col">邮箱</th>
      <th scope="col">
        注册时间 
        <span style="margin-left: 5px; cursor:pointer" @click="sortByTimeChange()">↕️</span>
      </th>
      <th scope="col">操作</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user, index) in this.userInfo" :key="index">
      <th scope="row"> {{ index+1 }} </th>
      <td>{{ user.id }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.createTime }}</td>
      <td>
        <button v-if="user.username != 'admin'"  type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target=getupdateRoleBtnId(user.id)>
          更改权限
        </button>
        <!-- 更改权限Modal -->
        <div class="modal fade" :id=getupdateRoleModelId(user.id) tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">更改权限</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form target="iframe">
                  <div class="row mb-3">
                    <label for="username" class="col-sm-2 col-form-label">用户名</label>
                    <div class="col-sm-10">
                      <input :value="user.username" type="text" class="form-control" id="username" readonly>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="name" class="col-sm-2 col-form-label">姓名</label>
                    <div class="col-sm-10">
                      <input :value="user.name" type="text" class="form-control" id="name" readonly>
                    </div>
                  </div>
                  <table class="table" style="text-align: center;">
                    <thead>
                      <tr>
                        <th scope="col">角色</th>
                        <th scope="col">是/否</th>
                        <th scope="col">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"> 接线员</th>
                        <td>
                          <span v-if="ifUserIsRole(user.id, 'JIE_XIAN').data == true">是</span>
                          <span v-if="ifUserIsRole(user.id, 'JIE_XIAN').data == false">否</span>
                        </td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <th scope="row"> 维修工程师</th>
                        <td>
                          <span v-if="ifUserIsRole(user.id, 'WEI_XIU').data == true">是</span>
                          <span v-if="ifUserIsRole(user.id, 'WEI_XIU').data == false">否</span>
                        </td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <th scope="row"> 回访员</th>
                        <td>
                          <span v-if="ifUserIsRole(user.id, 'HUI_FANG').data == true">是</span>
                          <span v-if="ifUserIsRole(user.id, 'HUI_FANG').data == false">否</span>
                        </td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <th scope="row"> 管理员</th>
                        <td>
                          <span v-if="ifUserIsRole(user.id, 'GUAN_LI').data == true">是</span>
                          <span v-if="ifUserIsRole(user.id, 'GUAN_LI').data == false">否</span>
                        </td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <th scope="row"> 禁用</th>
                        <td>
                          <span v-if="ifUserIsRole(user.id, 'JIN_YONG').data == true">是</span>
                          <span v-if="ifUserIsRole(user.id, 'JIN_YONG').data == false">否</span>
                        </td>
                        <td>3</td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button v-if="user.username != 'admin'" type="button" class="btn btn-link" data-bs-toggle="modal">
          重置密码
        </button>
      </td>
    </tr>
  </tbody>
</table>

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <select @click="getPageInfo()" v-model="userListSearchInfo.pageSize" class="form-select" aria-label="Default select example" style="width: 100px;">
      <option value="10" selected>10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="50">50</option>
    </select>
    <li class="page-item">
      <a class="page-link" @click="this.userListSearchInfo.pageNum -= 1; getPageInfo()" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a @click="this.userListSearchInfo.pageNum = 1; getPageInfo()" class="page-link" href="#">1</a></li>
    <li class="page-item"><a @click="this.userListSearchInfo.pageNum = 2; getPageInfo()" class="page-link" href="#">2</a></li>
    <li class="page-item"><a @click="this.userListSearchInfo.pageNum = 3; getPageInfo()" class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" @click="this.userListSearchInfo.pageNum += 1; getPageInfo()" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
import {getUserInfoByIdService, userRegisterService, getUserListService, getUserIsRoleService} from "@/api/user.js"
import alertUtil from '@/utils/alertUtil';

export default {
  data(){
    return{
      registerData: {
          username: '',
          name: '',
          password: '',
          rePassword: ''
      },
      userInfo:{},
      userListSearchInfo:{
        pageNum: 1,
        pageSize: 10,
        name: "",
        sortByTime: false
      }
    }
  },
  methods:{
    ifUserIsRole(id, role){
      return getUserIsRoleService(id, role);
    },
    register(){
      // 两次密码要一致
      if(this.registerData.password != this.registerData.rePassword){
          alertUtil.message("两次密码不一致", "danger");
          return;
      }

      let result = userRegisterService(this.registerData)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          this.registerData = {
            username: '',
            name: '',
            password: '',
            rePassword: ''
            }
      }
    },
    sortByTimeChange(){
      this.userListSearchInfo.sortByTime = !this.userListSearchInfo.sortByTime
      this.userInfo = getUserListService(this.userListSearchInfo).data.items
    },
    searchByName(){
      this.userInfo = getUserListService(this.userListSearchInfo).data.items
    },
    getPageInfo(){
      this.userInfo = getUserListService(this.userListSearchInfo).data.items
    },
    getUsernameById(id){
      return getUserInfoByIdService(id).data.name
    },
    getupdateRoleBtnId(id){
      return "#User" + id + "updateRole"
    },
    getupdateRoleModelId(id){
      return "User" + id + "updateRole"
    }
  },
  created(){
    this.userInfo = getUserListService(this.userListSearchInfo).data.items
    console.log(this.userInfo)
  }

}
</script>

<style>

</style>