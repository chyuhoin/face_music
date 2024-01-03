import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'
import store from '@/store'
import storage from "good-storage"
import { TOKEN } from './config.js'


const BASE_URL = 'https://mu-api.yuk0.com/'
const LOCAL_URL = 'http://159.138.245.76/'
// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()
// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)
// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

export const myRequest = createMyBaseInstance()
// 连接后端的axios实例
function createMyBaseInstance() {
  const instance = axios.create({
    baseURL: LOCAL_URL,
  })

  instance.interceptors.request.use(
    config => {
      let token = storage.get(TOKEN) // 从本地存储中获取JWT令牌
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}` // 将JWT令牌添加到请求header中
      }
      return config
    }
  )

  instance.interceptors.response.use(x => x, error => {
    let msg = "";
    if (error.response) {

      if (error.response.status == 401) {
        if (error.response.data.msg === 'Token has expired') confirm('登录已经过期，请重新登录', '通知');
        if (error.response.data.msg === 'Missing Authorization Header') confirm('还没有登录，请先登录', '通知');
        throw error
      }

      msg += '响应状态码:' + error.response.status + "\n";
      msg += '响应数据:' + error.response.data + "\n";
      msg += '响应头部信息:' + error.response.headers + "\n";
    }
    if (error.request) {
      msg += '请求信息:'+ error.request + "\n";
    }
    msg += '错误信息:'+ error.message + "\n";
    confirm(msg, '调试信息');
    throw error
  })
  return instance
}

function handleError(e) {
  confirm(e.message, '出错啦~')
  throw e
}

function handleResponse(response) {
  return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
      store.commit(SET_AXIOS_LOADING, true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit(SET_AXIOS_LOADING, false)
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}
