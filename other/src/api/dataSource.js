import request from '@/request'

// 根据条件查询数据源
export function queryDataSource(data) {
  return request({
    url: '/mbi/dataSource/find',
    method: 'post',
    data: data
  })
}
// 根据ID返回数据源
export function queryDataSourceDetail(data) {
  return request({
    url: '/mbi/dataSource/findById',
    method: 'get',
    params: data
  })
}

//编辑数据源
export function editDataSource(data) {
  return request({
    url: '/mbi/dataSource/edit',
    method: 'post',
    data: data
  })
}
//删除数据源
export function delDataSource(data) {
  return request({
    url: '/mbi/dataSource/del',
    method: 'post',
    data: data
  })
}
//查询数据源字典
export function dictDataSource(data) {
  return request({
    url: '/mbi/dataSource/dict/find',
    method: 'post',
    data: data
  })
}
//数据源链接测试
export function testDataSource(data) {
  return request({
    url: '/mbi/dataSource/test',
    method: 'post',
    data: data
    // timeout: 60000
  })
}
//根据sql及数据库配置获取数据
export function getDataBySql(data) {
  return request({
    url: '/mbi/dataSource/getDataBySql',
    method: 'post',
    data: data
  })
}
//根据数据库ID 获取数据库表结构
export function getDataTableByDataSource(data) {
  return request({
    url: '/mbi/dataSource/getDataTableByDataSource',
    method: 'post',
    data: data
  })
}
//根据数据模型中选择参数 查询数据
export function getDataByView(data) {
  return request({
    url: '/mbi/dataSource/getDataByView',
    method: 'post',
    data: data
  })
}
/**
 * @name 根据API接口获取数据
 * @param {String} apiUrl
 * @param {String} method
 * @param {String} body
 * @param {Object} headers
 */
export function getDataForApi(params) {
  return request({
    url: '/mbi/dataView/getDataForApi',
    method: 'post',
    data: params
  })
}

//上传文件
export function dataSourceFileUpload(data) {
  let param = new FormData()
  Object.keys(data).forEach((key) => {
    param.append(key, data[key])
  })
  return request({
    url: '/mbi/dataSource/fileUpload',
    method: 'post',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 下载模板
// export const crmLeadsExcelDownloadURL = process.env.VUE_APP_BASE_API + '/CrmLeads/downloadExcel'
// export function crmLeadsDownloadExcelAPI(data) {
//   return request({
//     url: '/CrmLeads/downloadExcel',
//     method: 'post',
//     data: data,
//     responseType: 'blob'
//   })
// }
