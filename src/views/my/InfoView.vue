<template>
  <div class="row layout-bottom" style="width: 100%; height: 100vh; margin: 0;">
    <div class="col-6" style="margin: auto;">
      <div class="card" >
        <div class="card-body">
          <div style="text-align: center; font-size: larger;">个人资料</div>
          <form target="iframe">
            <div class="row mb-3">
              <label for="username" class="col-sm-2 col-form-label">用户名</label>
              <div class="col-sm-10">
                <input v-model="this.userInfoUpdateDTO.username" type="text" class="form-control" id="username" readonly>
              </div>
            </div>
            <div class="row mb-3">
              <label for="name" class="col-sm-2 col-form-label">姓名</label>
              <div class="col-sm-10">
                <input v-model="this.userInfoUpdateDTO.name" type="text" class="form-control" id="name" readonly>
              </div>
            </div>
            <div class="row mb-3">
              <label for="phone" class="col-sm-2 col-form-label">电话</label>
              <div class="col-sm-10">
                <input v-model="this.userInfoUpdateDTO.phone"  type="text" class="form-control" id="phone">
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="col-sm-2 col-form-label">邮箱</label>
              <div class="col-sm-10">
                <input v-model="this.userInfoUpdateDTO.email" type="text" class="form-control" id="email">
              </div>
            </div>
            <div >
              <span style="float: right;">
                <button @click="updateUser()" type="submit" class="btn btn-primary" >更新</button>
              </span>
            </div>
          </form>
          <iframe id="frame" name="iframe" style="display:none;"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alertUtil from '@/utils/alertUtil';
import { useUserInfoStore } from '@/stores/userInfo.js'
import { updateUserService, userInfoService} from '@/api/user.js'
export default {
  data(){
    return{
      nowUser:{},
      userInfoUpdateDTO:{
        id:'',
        username:'',
        name:'',
        phone:'',
        email:''
      }
    }
  },
  methods:{
    updateUser(){
      let result = updateUserService(this.userInfoUpdateDTO)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          // 获取用户信息
          var userInformation = userInfoService().data
          // 把用户的信息也存到pinia中
          const userInfoStore = useUserInfoStore()
          userInfoStore.setInfo(userInformation)
      }
    }
  },
  created(){
    const userInfoStore = useUserInfoStore()
    this.nowUser = userInfoStore.info
    this.userInfoUpdateDTO.id = this.nowUser.id
    this.userInfoUpdateDTO.username = this.nowUser.username
    this.userInfoUpdateDTO.name = this.nowUser.name
    this.userInfoUpdateDTO.phone = this.nowUser.phone
    this.userInfoUpdateDTO.email = this.nowUser.email
  },
}
</script>

<style>

</style>