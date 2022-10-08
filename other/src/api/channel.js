import request from '@/request'

// 频道左侧目录接口
export function getLeftChannelMenus() {
  return request({
    url: '/mtv-api/mtv/web/channel/getLeftChannelMenus',
    method: 'get'
  })
}

// 左侧目录点击新增接口
export function addMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/createNewMenu',
    method: 'POST',
    data: data
  })
}

// 编辑频道名称分组接口
export function editMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/updateChannel',
    method: 'POST',
    data: data
  })
}


export function getChannelAllGroupInfo() {
  return request({
    url: '/mtv-api/mtv/web/channel/getAllChannelGroup',
    method: 'get',
  })
}

// 删除频道接口
export function deleteMenuInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/delChannel',
    method: 'POST',
    data: data
  })
}

// 频道列表分页查询接口
export function getChannelList(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/channelListPage',
    method: 'POST',
    data: data
  })
}

//新增频道接口
export function addChannel(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/createChannel',
    method: 'post',
    data: data
  })
}

//频道详情
export function channelDetail(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/getChannelDetail',
    method: 'get',
    params: data
  })
}

//频道共享
export function channelLimitType(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/channelLimitType',
    method: 'post',
    data: data
  })
}

//批量频道详情
export function channelDetailBatch(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/getChannelDetailBatch',
    method: 'post',
    data: data
  })
}

//编辑频道（频道内容）接口
export function editChannel(data) {
  return request({
    url: '/mtv-api/mtv/web/channel/resetChannel',
    method: 'post',
    data: data
  })
}

//未命名频道数量
export function getUnNamedChanneleCount() {
  return request({
    url: '/mtv-api/mtv/web/channel/getUnNamedChannelCount',
    method: 'get'
  })
}






