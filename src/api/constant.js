import $ from 'jquery'
import {
    useTokenStore
} from '@/stores/token.js'
import { BASE_URL } from '@/utils/commonUtil'

// 获取客户列表
export const getComputerInfoService = () => {
    const tokenStore = useTokenStore()
    var nowtoken = tokenStore.token
    var result;
    $.ajax({
        headers: {
            "Authorization": nowtoken
        },
        url: BASE_URL + "/constant",
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

// 获取客户列表
export const updateComputerInfoService = (computerUpdateInfo) => {
  const tokenStore = useTokenStore()
  var nowtoken = tokenStore.token
  var result;
  $.ajax({
      headers: {
          "Authorization": nowtoken
      },
      url: BASE_URL + "/constant",
      type: "post",
      data: JSON.stringify(computerUpdateInfo),
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