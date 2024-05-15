<template>
  <nav class="navbar navbar-expand-lg" data-bs-theme="dark" style="background-color: rgb(55, 143, 253); color: white;">
    <a class="navbar-brand" href="/" style="margin-left: 50px;">维修系统</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-right" id="navbarText" style="width: 100%;">
      <ul class="navbar-nav">
          <li class="nav-item">
              <a :href="this.companyInfo.companySite" class="nav-link"  target="_blank">{{ this.companyInfo.companyName }}</a>
          </li>
      </ul>
      <div class="collapse navbar-collapse justify-content-end" id="navbarText">
          <ul class="navbar-nav">
              <!-- <li class="nav-item ">
                  <a class="nav-link" href="#" style="color: white;">欢迎您，{{ nowUser.name }}</a>
              </li> -->
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
                    欢迎您，{{ nowUser.name }}
                  </a>
                  <div class="dropdown-menu">
                      <router-link class="dropdown-item" :to="{name:'MyInfo'}">个人资料</router-link>
                      <router-link class="dropdown-item" :to="{name:'MyReset'}">修改密码</router-link>
                      <a class="dropdown-item" @click="logout()" href="#">退出登录</a>
                  </div>
              </li>
              <!-- <li class="nav-item">
                  <a class="nav-link" @click="logout()" href="#">退出登录</a>
              </li> -->
          </ul>
      </div>
    </div>
</nav>


</template>

<script>
import { useUserInfoStore } from '@/stores/userInfo.js'
import { useTokenStore } from '@/stores/token.js'
import {getCompanyInfoService} from '@/api/constant.js'
import router from '@/router';

export default {
  data(){
    return{
      nowUser:{},
      companyInfo:{}
    }
  },
  created() {
      const userInfoStore = useUserInfoStore()
      this.nowUser = userInfoStore.info
      this.companyInfo = getCompanyInfoService().data
  },
  methods:{
    logout() {
      const tokenStore = useTokenStore()
      tokenStore.removeToken();
      const userInfoStore = useUserInfoStore()
      userInfoStore.removeInfo();
      router.push('/login')
    },
  }
}
</script>

<style>
.navbar{
  position: fixed;
  width: 100%;
  z-index: 1;
}
</style>