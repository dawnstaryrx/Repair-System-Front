<template>
  <div class="row layout-bottom" style="width: 100%; height: 100vh; margin: 0;">
    <div class="col-4" style="margin: auto;">
      <div class="card" >
        <div class="card-body">
          <div style="text-align: center; font-size: larger;">维修系统-登录</div>
          <form target="iframe">
            <div class="row mb-3">
              <label for="username" class="col-sm-2 col-form-label">用户名</label>
              <div class="col-sm-10">
                <input v-model="loginData.username" type="text" class="form-control" id="username">
              </div>
            </div>
            <div class="row mb-3">
              <label for="password" class="col-sm-2 col-form-label">密码</label>
              <div class="col-sm-10">
                <input v-model="loginData.password" type="password" class="form-control" id="password">
              </div>
            </div>
            <div >
              <span style="float: right;">
                <button @click="login()" type="submit" class="btn btn-primary" >登录</button>
              </span>
              <span style="float: left;">无账号，去
                <router-link to="register" style="text-decoration: none;">注册</router-link>
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
import {userLoginService, userInfoService} from "@/api/user.js"
import alertUtil from '@/utils/alertUtil';
import router from '@/router';
import { useTokenStore } from '@/stores/token.js'
import { useUserInfoStore } from '@/stores/userInfo.js'

export default {
  data(){
    return{
        loginData: {
          username: '',
          password: ''
      },
    }
  },
  methods:{
    login(){
      let result = userLoginService(this.loginData)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          // 把得到的token存储到pinia中
          const tokenStore = useTokenStore()
          tokenStore.setToken(result.data)
          // 获取用户信息
          var userInformation = userInfoService().data
          // 把用户的信息也存到pinia中
          const userInfoStore = useUserInfoStore()
          userInfoStore.setInfo(userInformation)

          router.push('/')
      }
    },
  }
}
</script>

<style>

</style>