import request from '@/request'

// 根据条件查询可视化
export function queryDataView(data) {
  return request({
    url: '/mbi/dataView/find',
    method: 'post',
    data: data
  })
}
// 根据ID可视化页面信息
export function queryDataViewDetail(data) {
  return request({
    url: '/mbi/dataView/findById',
    method: 'get',
    params: data
  })
}

// 根据发布ID获取可视化页面信息
export function queryDataViewDetailByDeployId(data) {
  return request({
    url: '/mbi/dataView/findByDeployId',
    method: 'get',
    params: data
  })
}

// 编辑可视化
export function editDataView(data) {
  return request({
    url: '/mbi/dataView/edit',
    method: 'post',
    data: data
  })
}

// 发布可视化
export function deployDataView(data) {
  return request({
    url: '/mbi/dataView/deploy',
    method: 'post',
    data: data
  })
}

// 取消发布可视化
export function cancelDeployDataView(data) {
  return request({
    url: '/mbi/dataView/cancelDeploy',
    method: 'get',
    params: data
  })
}
// 取消发布单个可视化
export function cancelDeploySingleDataView(data) {
  return request({
    url: '/mbi/deploy/cancelDeploy',
    method: 'get',
    params: data
  })
}

// 删除可视化
export function delDataView(data) {
  return request({
    url: '/mbi/dataView/del',
    method: 'post',
    data: data
  })
}
// 复制可视化
export function copyDataView(data) {
  return request({
    url: '/mbi/dataView/copyDataView',
    method: 'get',
    params: data
  })
}

// 查图片链接
export function getSnapshotById(data) {
  return request({
    url: '/mbi/dataView/getSnapshotById',
    method: 'get',
    params: data
  })
}

// 根据可视化ID查询发布列表
export function findDeployList(data) {
  return request({
    url: '/mbi/dataView/findDeploy',
    method: 'post',
    data: data
  })
}
