import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'
import {
    BASE_URL
} from '@/utils/commonUtil'

// 新增维修回访
export const repairRevisitAddService = (repairRevisitAddInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/repair/revisit",
        data: JSON.stringify(repairRevisitAddInfo),
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

// 根据Id查看回访
export const repairRevisitFindByIdService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/repair/revisit/"+id,
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


