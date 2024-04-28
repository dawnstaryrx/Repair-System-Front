import $ from 'jquery'
import { useTokenStore } from '@/stores/token.js'

// 获取当前用户信息
export const userInfoService = () => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    // tokenStore.removeToken();
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/user/info",
        type: "get",
        async : false,
        success(resp){
            result = resp;
        },
        error(resp){
            result = resp;
        }
    })
    return result;
}

// 根据Id获取用户信息
export const getUserInfoByIdService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/user/"+id,
        type: "get",
        async : false,
        success(resp){
            result = resp;
        },
        error(resp){
            result = resp;
        }
    })
    return result;
}

export const userRegisterService = (registerData) => {
    var result;
    $.ajax({
        url: "http://127.0.0.1:8080/user/register",
        type: "post",
        data: JSON.stringify(registerData),
        // data: JSON.stringify({
        //     "email": registerData.email,
        //     "code": registerData.code,
        //     "password": registerData.password
        // }),
        contentType: "application/json",
        dataType:"json",
        async : false,
        success(resp){
            result = resp;
        },
        error(resp){
            result = resp;
        }
    })
    return result;
}

export const userLoginService = (loginData) => {
    var result;
    $.ajax({
        url: "http://127.0.0.1:8080/user/login",
        type: "post",
        data: JSON.stringify(loginData),
        contentType: "application/json",
        dataType:"json",
        async : false,
        success(resp){
            result = resp;
        },
        error(resp){
            result = resp;
        }
    })
    return result;
}

// 根据角色获取用户信息
export const getUserListByRoleService = (role) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/user/role",
        type: "get",
        data:{
            role:role
        },
        async : false,
        success(resp){
            result = resp;
        },
        error(resp){
            result = resp;
        }
    })
    return result;
}