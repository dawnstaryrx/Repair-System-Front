<template>
  <div class="row layout-bottom" style="width: 100%; height: 100vh; margin: 0;">
    <div class="col-6" style="margin: auto;">
      <div class="card" >
        <div class="card-body">
          <div style="text-align: center; font-size: larger;">重置密码</div>
          <form target="iframe">
            <div class="row mb-3">
              <label for="oldPwd" class="col-sm-2 col-form-label">原密码</label>
              <div class="col-sm-10">
                <input v-model="resetPwdData.oldPwd" type="password" class="form-control" id="oldPwd">
              </div>
            </div>
            <div class="row mb-3">
              <label for="newPwd" class="col-sm-2 col-form-label">新密码</label>
              <div class="col-sm-10">
                <input v-model="resetPwdData.newPwd" type="password" class="form-control" id="newPwd">
              </div>
            </div>
            <div class="row mb-3">
              <label for="rePwd" class="col-sm-2 col-form-label">确认新密码</label>
              <div class="col-sm-10">
                <input v-model="resetPwdData.rePwd" type="password" class="form-control" id="rePwd">
              </div>
            </div>
            <div >
              <span style="float: right;">
                <button @click="reset()" type="submit" class="btn btn-primary" >重置</button>
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
import router from '@/router';
import {resetPwdService} from '@/api/user.js'
import { useUserInfoStore } from '@/stores/userInfo.js'
import { useTokenStore } from '@/stores/token.js'
export default {
  data(){
    return{
      nowUser:{},
      resetPwdData:{
        oldPwd:'',
        newPwd:'',
        rePwd:'',
      },
      resetPwdDTO:{
        id:'',
        oldPwd:'',
        newPwd:'',
      }
    }
  },
  methods:{
    reset(){
      // 两次密码要一致
      if(this.resetPwdData.newPwd != this.resetPwdData.rePwd){
          alertUtil.message("两次密码不一致", "danger");
          return;
      }
      this.resetPwdDTO.id = this.nowUser.id;
      this.resetPwdDTO.oldPwd = this.resetPwdData.oldPwd;
      this.resetPwdDTO.newPwd = this.resetPwdData.newPwd;
      let result = resetPwdService(this.resetPwdDTO)
      if(result.code === 1){
          alertUtil.message(result.message, "danger");
      }
      if(result.code === 0){
          alertUtil.message(result.message, "success");
          const tokenStore = useTokenStore()
          tokenStore.removeToken();
          const userInfoStore = useUserInfoStore()
          userInfoStore.removeInfo();
          router.push('/login')
      }
    },
  },
  created(){
    const userInfoStore = useUserInfoStore()
    this.nowUser = userInfoStore.info
  },
}
</script>

<style>

</style>