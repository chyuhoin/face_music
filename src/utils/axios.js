import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'
import store from '@/store'
import storage from "good-storage"
import { TOKEN } from './config.js'


const BASE_URL = 'https://mu-api.yuk0.com/'
const LOCAL_URL = 'http://localhost:5000'
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
      console.log(`TOKEN: ${TOKEN}, token: ${token}`)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}` // 将JWT令牌添加到请求header中
      }
      return config
    }
  )

  // instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleError(e) {
  if(e.message === 'Request failed with status code 404')
    e.message = '用户名或密码错误';
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
