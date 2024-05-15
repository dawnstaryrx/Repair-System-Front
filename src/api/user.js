import $ from 'jquery'
import { useTokenStore } from '@/stores/token.js'
import { BASE_URL } from '@/utils/commonUtil'

// 获取客户列表
export const getUserListService = (userListSearchInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user",
        type: "get",
        data: userListSearchInfo,
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

// 更新用户信息
export const updateUserService = (userUpdateDTO) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user",
        type: "post",
        data: JSON.stringify(userUpdateDTO),
        contentType: "application/json; charset=utf-8",
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

// 管理员重置密码
export const resetPwdByManagerService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user/manager/reset",
        type: "post",
        data: {
            id:id
        },
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

// 用户重置密码
export const resetPwdService = (resetPwdDTO) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user/reset",
        type: "post",
        data: JSON.stringify(resetPwdDTO),
        contentType: "application/json; charset=utf-8",
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

// 获取用户是不是某角色
export const getUserIsRoleService = (id, role) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user/manage/role",
        type: "get",
        data: {
            id: id,
            role: role
        },
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

// 设置用户角色
export const addUserRoleService = (id, role) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user/manage/role",
        type: "put",
        data: {
            userId: id,
            role: role
        },
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}
export const delUserRoleService = (id, role) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/user/manage/role",
        type: "delete",
        data: {
            userId: id,
            role: role
        },
        async: false,
        success(resp) {
            result = resp;
        },
        error(resp) {
            result = resp;
        }
    })
    return result;
}

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
        url: BASE_URL + "/user/info",
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
        url: BASE_URL + "/user/"+id,
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
        url: BASE_URL + "/user/register",
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
        url: BASE_URL + "/user/login",
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
        url: BASE_URL + "/user/role",
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