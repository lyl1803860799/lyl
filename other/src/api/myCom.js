import request from '@/request'

// 根据条件查询我的收藏
export function queryAssembly(data) {
  return request({
    url: '/mbi/assembly/find',
    method: 'post',
    data: data
  })
}
//删除我的收藏
export function delAssembly(data) {
  return request({
    url: '/mbi/assembly/del',
    method: 'post',
    data: data
  })
}
// 编辑 & 收藏
export function editAssembly(data) {
  return request({
    url: '/mbi/assembly/edit',
    method: 'post',
    data: data
  })
}

// 根据条件查询已发布组件
export function findDeploy(data) {
  return request({
    url: '/mbi/deploy/findDeploy',
    method: 'post',
    data: data
  })
}
// 发布组件
export function deployAssembly(data) {
  return request({
    url: '/mbi/assembly/deploy',
    method: 'post',
    data: data
  })
}

// 取消发布组件
export function cancelDeployAssembly(data) {
  return request({
    url: '/mbi/assembly/cancelDeploy',
    method: 'get',
    params: data
  })
}
