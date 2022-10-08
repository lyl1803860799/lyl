import axios from 'axios'
import { message } from 'ant-design-vue'
import qs from 'qs'
import Cookies from 'js-cookie'
import { apiUrl } from '@/utils/api'
// axios默认配置
axios.defaults.timeout = 600000 // 超时时间
axios.defaults.baseURL = apiUrl // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// 异常拦截处理
const errorHandler = (response) => {
  if (response.data) {
    // 当后台返回的status不是200
    message.error(response.data.message)
  } else {
    // 浏览器请求失败
    message.error(response.message)
  }
  return Promise.reject(response)
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 发起请求时，取消掉当前正在进行的相同请求
    const token = sessionStorage.getItem('token')
    if (token) {
      // 设置请求头
      config.headers['token'] = token
    }
    const flag =
      config.headers['Content-Type'] &&
      config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1
    if (flag) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应
axios.interceptors.response.use((response) => {
  const { data, config } = response
  if (data.success || config.responseType === 'blob' 
  || config.url === '/mtv-api/mtv/web/template/createTemplate' 
  || config.url === '/mtv-api/mtv/web/template/resetTemplate'
  || config.url === '/mtv-api/mtv/web/program/createProgram'
  || config.url === '/mtv-api/mtv/web/program/resetProgram'
  || config.url === '/mtv-api/mtv/web/channel/createChannel'
  || config.url === '/mtv-api/mtv/web/channel/resetChannel') {
    return data
  }
  return errorHandler(response)
}, errorHandler)
export default axios
