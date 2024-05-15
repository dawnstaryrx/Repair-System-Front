import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'
import {
    BASE_URL
} from '@/utils/commonUtil'

// 新增维修请求
export const repairAddService = (repairAddInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/repair",
        data: JSON.stringify(repairAddInfo),
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

// 根据请求Id获取
export const getRepairByIdService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/repair/info",
        type: "get",
        data: {
            requestId: id
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