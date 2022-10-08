import request from '@/request'

// 模板左侧目录接口
export function getLeftTemplateMenus() {
  return request({
    url: '/mtv-api/mtv/web/template/getLeftTemplateMenus',
    method: 'get'
  })
}

// 左侧目录点击新增接口
export function addMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/template/createNewMenu',
    method: 'POST',
    data: data
  })
}

// 编辑模板名称分组接口
export function editMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/template/updateTemplate',
    method: 'POST',
    data: data
  })
}


export function getTemplateAllGroupInfo() {
  return request({
    url: '/mtv-api/mtv/web/template/getAllTemplateGroup',
    method: 'get',
  })
}

// 删除模板接口
export function deleteMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/template/delTemplate',
    method: 'POST',
    data: data
  })
}

// 模板左侧目录接口
export function getTemplateList(data) {
  return request({
    url: '/mtv-api/mtv/web/template/templateListPage',
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

// 查询指标信息接口（涨跌和涨跌幅）
export function queryIndexData(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getChartData',
    method: 'post',
    data: data
  })
}

// 查询实时行情指标信息接口
export function queryRealTimeIndexInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/common/sharesInfo?indexCode='+data,
    method: 'get'
  })
}

// 查询实时行情指标信息接口（涨跌和涨跌幅）
export function queryRealTimeIndexData(data) {
  return request({
    url: '/mtv-api/mtv/web/common/sharesData',
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

//新增模板接口
export function addTemplate(data) {
  return request({
    url: '/mtv-api/mtv/web/template/createTemplate',
    method: 'post',
    data: data
  })
}

//模板详情
export function templateDetail(data) {
  return request({
    url: '/mtv-api/mtv/web/template/templateDetail',
    method: 'get',
    params: data
  })
}

//编辑模板（模板内容）接口
export function editTemplate(data) {
  return request({
    url: '/mtv-api/mtv/web/template/resetTemplate',
    method: 'post',
    data: data
  })
}

//未命名模板数量
export function getUnNamedTemplateCount() {
  return request({
    url: '/mtv-api/mtv/web/template/getUnNamedTemplateCount',
    method: 'get'
  })
}






