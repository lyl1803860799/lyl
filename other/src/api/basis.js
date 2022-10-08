import request from '@/request'

// 左侧目录点击新增接口
export function addChannelMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/channel/createNewMenu',
        method: 'POST',
        data: data
    })
}

// 编辑频道名称分组接口
export function editChannelMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/channel/updateChannel',
        method: 'POST',
        data: data
    })
}


// 删除频道接口
export function deleteChannelMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/channel/delChannel',
        method: 'POST',
        data: data
    })
}

// 左侧目录点击新增接口
export function addProgramMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/program/createNewMenu',
        method: 'POST',
        data: data
    })
}

// 编辑节目名称分组接口
export function editProgramMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/program/updateProgram',
        method: 'POST',
        data: data
    })
}


// 删除节目接口
export function deleteProgramMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/program/delProgram',
        method: 'POST',
        data: data
    })
}

// 左侧目录点击新增接口
export function addTemplateMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/template/createNewMenu',
        method: 'POST',
        data: data
    })
}

// 编辑模板名称分组接口
export function editTemplateMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/template/updateTemplate',
        method: 'POST',
        data: data
    })
}

// 删除模板接口
export function deleteTemplateMenuInfo(data) {
    return request({
        url: '/mtv-api/mtv/web/template/delTemplate',
        method: 'POST',
        data: data
    })
}