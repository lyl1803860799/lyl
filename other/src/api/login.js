import request from '@/request'

// 登录接口
export function mtvLogin(data) {
  return request({
    url: '/uniuser-api/v2/common/login',
    method: 'post',
    data: data
  })
}

//查询登录用户信息
export function mtvUserInfo() {
  return request({
    url: '/uniuser-api/v2/common/getUserInfo',
    method: 'get'
  })
}

//查询设备限制信息
export function getMtvLimitInfo(data) {
  return request({
    url: '/uniuser-api/v2/extraUser/getMtvUserInfo?accountName='+data,
    method: 'get'
  })
}


//登出
export function logout() {
  return request({
    url: '/uniuser-api/v2/common/logout',
    method: 'get'
  })
}

//心跳方法
export function keepAlive() {
  return request({
    url: '/uniuser-api/v2/common/keepAlive',
    method: 'get'
  })
}

//发送验证码方法
export function sendPwdSms(data) {
  return request({
    url: '/uniuser-api/v2/common/sendPwdSms',
    method: 'get',
    params: data
  })
}

//验证修改密码短信验证码
export function checkPwdSms(data) {
  return request({
    url: '/uniuser-api/v2/common/checkPwdSms',
    method: 'get',
    params: data
  })
}

//验证修改密码短信验证码
export function modifiedPwd(data) {
  return request({
    url: '/uniuser-api/v2/common/modifiedPwd',
    method: 'post',
    data: data
  })
}

//用户权限判定
export function accountAuth() {
  return request({
    url: '/mtv-api/mtv/web/common/userAuth',
    method: 'get',
  })
}

