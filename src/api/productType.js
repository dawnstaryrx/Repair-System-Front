import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'
import {
    BASE_URL
} from '@/utils/commonUtil'

// 新增产品类型
export const typeAddService = (name) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/type",
        data: {
            name: name,
        },
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

// 产品类型列表
export const getTypeListService = (TypeListSearchInfo) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/type",
        type: "get",
        data: TypeListSearchInfo,
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

export const getAllTypeService = () => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/type/all",
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

// 删除产品类型
export const typeDeleteService = (id) => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/type",
        type: "delete",
        data: {
            id: id,
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