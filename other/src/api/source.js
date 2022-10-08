import request from '@/request'

/**
 * @name 新建资源
 * @param {String} sourceName
 * @param {Int} sourceType
 * @param {String} sourceUrl
 * @param {String} setJson
 */
export function createSource(params) {
  return request({
    url: '/mbi/sourceBank/add',
    method: 'post',
    data: params
  })
}

/**
 * @name 删除资源
 * @param {Int} id
 */
export function delSource(params) {
  return request({
    url: '/mbi/sourceBank/del',
    method: 'post',
    data: params
  })
}

/**
 * @name 查询资源列表
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function getSourceList(params) {
  return request({
    url: '/mbi/sourceBank/find',
    method: 'post',
    data: params
  })
}

/**
 * @name 查询天气城市编码列表
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function weatherSource(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getMapAddressCode',
    method: 'get',
    params: data
  })
}

/**
 * @name 查询城市天气信息
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function weatherInfo(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getMapWeatherInfo',
    method: 'get',
    params: data
  })
}

/**
 * @name 查询行情信息
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function priceSource() {
  return request({
    url: '/mysteel-api/api/index/data/indicator',
    method: 'get'
  })
}

/**
 * @name 查询资讯信息
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function getHomeNewsMenu(data) {
  let param = '';
  let list = data.channelId;
  let pageSize = data.pageSize;
  list.map(item=>{
    param+='channelId='+item+'&'
  });
  param += 'pageSize='+pageSize;
  return request({
    url: '/mtv-api/mtv/web/common/newsHome?'+param,
    method: 'get'
  })
}


/**
 * @name 查询热榜信息
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function hotNewsInfo() {
  return request({
    url: '/mtv-api/mtv/web/common/getNewsFlashDayHot',
    method: 'post'
  })
}

/**
 * @name 判断是否为最新内容
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function isNewest(data) {
  let param = '';
  let list = data.channelId;
  let showTime = data.showTime;
  list.map(item=>{
    param+='channelId='+item+'&'
  });
  param += 'showTime='+showTime;
  return request({
    url: '/mtv-api/mtv/web/common/isNewest?'+param,
    method: 'get'
  })
}

/**
 * @name 快讯栏目接口
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function flashColumnInfo() {
  return request({
    url: '/mtv-api/mtv/web/common/getNewsFlashColumnLabelList',
    method: 'get'
  })
}

/**
 * @name 快讯品种接口 
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function flashBreedInfo() {
  return request({
    url: '/mtv-api/mtv/web/common/getNewsFlashBreedLabelList',
    method: 'get'
  })
}

/**
 * @name 快讯查询接口 
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function flashQueryList(data) {
  return request({
    url: '/mtv-api/mtv/web/common/listSearch',
    method: 'post',
    data:data
  })
}

/**
 * @name 获取期货交易所名称接口
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function futuresNameList() {
  return request({
    url: '/mtv-api/mtv/web/common/getFuturesExchange',
    method: 'get'
  })
}

/**
 * @name 指定交易所下商品名称及包含的合约接口
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function futuresProductContractList(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getFuturesExchangeProductContract',
    method: 'get',
    params: data
  })
}

/**
 * @name 获取合约价格数据接口 
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function getContractData(data) {
  return request({
    url: '/mtv-api/mtv/web/common/getContractData',
    method: 'post',
    data:data
  })
}

/**
 * @name 资讯目录树查询接口
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function getNewsColumnTree() {
  return request({
    url: '/mtv-api/mtv/web/common/columnTree',
    method: 'get'
  })
}

/**
 * @name 资讯查询接口
 * @param {Int} sourceType
 * @param {Int} pageSize
 * @param {Int} pageNum
 */
export function getNewsList(data) {
  return request({
    url: '/mtv-api/mtv/web/common/listSearchNew',
    method: 'post',
    data:data
  })
}

