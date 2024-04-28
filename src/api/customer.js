import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'
import { BASE_URL } from '@/utils/commonUtil'

// 获取客户列表
export const customerInfoService = (customerSearchInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer",
        type: "get",
        data: customerSearchInfo,
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

// 获取客户
export const customerInfoByIdService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer/" + id,
        type: "get",
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

// 获取全部客户
export const getAllCustomerService = () => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer/list",
        type: "get",
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

// 新增客户
export const customerAddService = (customerAddData) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer",
        // data: customerAddData,
        data: JSON.stringify({
            "name": customerAddData.name,
            "contactPerson": customerAddData.contactPerson,
            "phone": customerAddData.phone,
            "address": customerAddData.address,
            "createTime": customerAddData.createTime,
            "createUser": customerAddData.createData,
            "remark": customerAddData.remark
        }),
        contentType: "application/json; charset=utf-8",
        type: "put",
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

// 编辑客户
export const customerUpdateService = (customerUpdateData) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer",
        data: JSON.stringify({
            "id": customerUpdateData.id,
            "name": customerUpdateData.name,
            "contactPerson": customerUpdateData.contactPerson,
            "phone": customerUpdateData.phone,
            "address": customerUpdateData.address,
            "createTime": customerUpdateData.createTime,
            "createUser": customerUpdateData.createData,
            "remark": customerUpdateData.remark
        }),
        contentType: "application/json; charset=utf-8",
        type: "post",
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

// 删除客户
export const customerDeleteService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/customer",
        data: {
            id: id,
        },
        type: "delete",
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