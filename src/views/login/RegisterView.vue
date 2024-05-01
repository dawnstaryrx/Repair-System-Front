<template>
  <div class="row layout-bottom" style="width: 100%; height: 100vh; margin: 0;">
    <div class="col-4" style="margin: auto;">
      <div class="card" >
        <div class="card-body">
          <div style="text-align: center; font-size: larger;">维修系统-注册</div>
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
            <div >
              <span style="float: right;">
                <button @click="register()" type="submit" class="btn btn-primary" >注册</button>
              </span>
              <span style="float: left;">已有账号，去
                <router-link to="login" style="text-decoration: none;">登录</router-link>
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
import {userRegisterService} from "@/api/user.js"
import alertUtil from '@/utils/alertUtil';
import router from '@/router';
export default {
  data(){
    return{
      registerData: {
        username: '',
        name: '',
        password: '',
        rePassword: ''
      },
    }
  },
  methods:{
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
          router.push('/user/login')
      }
    },
  }
}
</script>

<style>

</style>