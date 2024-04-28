import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'

// 新增维修回访
export const repairRevisitAddService = (repairRevisitAddInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: "http://127.0.0.1:8080/repair/revisit",
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
        url: "http://127.0.0.1:8080/repair/revisit/"+id,
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


