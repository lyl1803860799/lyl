import request from '@/request'

// 节目左侧目录接口
export function getLeftProgramMenus() {
  return request({
    url: '/mtv-api/mtv/web/program/getLeftProgramMenus',
    method: 'get'
  })
}

// 左侧目录点击新增接口
export function addMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/program/createNewMenu',
    method: 'POST',
    data: data
  })
}

// 编辑节目名称分组接口
export function editMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/program/updateProgram',
    method: 'POST',
    data: data
  })
}


export function getProgramAllGroupInfo() {
  return request({
    url: '/mtv-api/mtv/web/program/getAllProgramGroup',
    method: 'get',
  })
}

// 删除节目接口
export function deleteMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/program/delProgram',
    method: 'POST',
    data: data
  })
}

// 节目列表接口
export function getProgramList(data) {
  return request({
    url: '/mtv-api/mtv/web/program/programListPage',
    method: 'POST',
    data: data
  })
}

// 查询指标信息接口
export function queryIndexInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getIndexInfo',
    method: 'post',
    data: data
  })
}

// 获取指标数据接口
export function getIndexData(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getIndexData',
    method: 'post',
    data: data
  })
}

//行情地图品种菜单
export function getBreedsInfo() {
  return request({
    url: '/mtv-api/mtv/web/common/getMarketMenu',
    method: 'get',
  })
}

//行情地图数据
export function getMapData(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getMarketData',
    method: 'post',
    data: data
  })
}

//新增节目接口
export function addProgram(data) {
  return request({
    url: '/mtv-api/mtv/web/program/createProgram',
    method: 'post',
    data: data
  })
}

//节目详情
export function programDetail(data) {
  return request({
    url: '/mtv-api/mtv/web/program/getProgramDetail',
    method: 'post',
    data: data
  })
}

//批量节目详情
export function programDetailBath(data) {
  return request({
    url: '/mtv-api/mtv/web/program/getProgramDetailBatch',
    method: 'post',
    data: data
  })
}

//编辑节目（节目内容）接口
export function editProgram(data) {
  return request({
    url: '/mtv-api/mtv/web/program/resetProgram',
    method: 'post',
    data: data
  })
}

//未命名节目数量
export function getUnNamedProgramCount() {
  return request({
    url: '/mtv-api/mtv/web/program/getUnNamedProgramCount',
    method: 'get'
  })
}

//节目共享
export function settingProgramShare(data) {
  return request({
    url: '/mtv-api/mtv/web/program/programShare',
    method: 'post',
    data: data
  })
}

//获取共享的账号的详情
export function getShareAccountInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getAccountInfo?accountName='+data,
    method: 'get'
  })
}

//获取共享的账号集合
export function getShareUsers(data) {
  return request({
    url: '/mtv-api/mtv/web/program/getShareUsers?programId='+data,
    method: 'get'
  })
}








