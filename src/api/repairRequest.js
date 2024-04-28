import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'

// 新增维修请求
export const repairRequestAddService = (repairRequestAddInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request",
        data: JSON.stringify(repairRequestAddInfo),
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

// 获取维修请求列表
export const getRepairRequestListService = (repairRequestPageSearchInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request",
        type: "get",
        data: repairRequestPageSearchInfo,
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

// 获取维修请求状态
export const getRepairRequestStatusService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request/status",
        type: "get",
        data: {
            id: id
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

// 获取维修请求
export const getRepairRequestByIdService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request/info",
        type: "get",
        data: {
            id: id
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

// 更新
export const repairRequestUpdateService = (repairRequestUpdateInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request",
        data: JSON.stringify(repairRequestUpdateInfo),
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

// 删除
export const repairRequestDeleteService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/request",
        data: {
            id: id
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