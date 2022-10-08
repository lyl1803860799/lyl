import request from '@/request'

// 查询树
export function queryTree(data) {
  return request({
    url: '/mbi/tree/find',
    method: 'get',
    params: data
  })
}
// 编辑树
export function editTree(data) {
  return request({
    url: '/mbi/tree/edit',
    method: 'post',
    data: data
  })
}
// 删除树
export function delTree(data) {
  return request({
    url: '/mbi/tree/del',
    method: 'post',
    data: data
  })
}
// 模糊查询树
export function findTreeByName(data) {
  return request({
    url: '/mbi/tree/findByName',
    method: 'post',
    data: data
  })
}
