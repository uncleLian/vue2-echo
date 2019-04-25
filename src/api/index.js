import { request } from '@/utils/request'

// banner
export function getBanner() {
    let res = request('/banner', 'GET')
    return res
}
// 推荐列表
export function getList(page) {
    let res = request(`/list?page=${page}`, 'GET')
    return res
}
// 音乐详情
export function getDetail(id) {
    let res = request(`/detail?id=${id}`, 'GET')
    return res
}
// 相关列表
export function getOther() {
    let res = request('/other', 'GET')
    return res
}
