import request from '@/request'

// 根据条件查询数据源
export function queryMaterialData(data) {
    return request({
        url: '/mtv-api/mtv/web/material/materialListPage',
        method: 'post',
        data: data
    })
}

// 查询素材数据源
export function getMaterialList() {
    return request({
        url: '/mtv-api/mtv/web/template/getMaterialList',
        method: 'get',
    })
}

// 删除素材接口
export function deleteMaterialData(data) {
    return request({
        url: '/mtv-api/mtv/web/material/delMaterial',
        method: 'post',
        params: data
    })
}
// 素材编辑接口（重命名）
export function renameMaterial(data) {
    return request({
        url: '/mtv-api/mtv/web/material/renameMaterial',
        method: 'post',
        data: data
    })
}
// 上传素材接口
export function uploadMaterial(data) {
    let param = new FormData();
    param.append('originFile', data.originFile);
    param.append('zipFile', data.zipFile);
    param.append('materialType', data.materialType);
    // Object.keys(data).forEach((key) => {
        
    // });
    param.forEach((value, key) => {
        console.log("key %s: value %s", key, value);
   })
    return request({
        url: '/mtv-api/mtv/web/material/uploadMaterial',
        method: 'post',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}