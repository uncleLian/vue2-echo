import { request } from '@/utils/request'

// 获取banner
export function getBanner() {
    let res = request('/banner', 'GET')
    return res
}
// 获取推荐列表
export function getList(page: number = 1) {
    let res = request(`/list?page=${page}`, 'GET')
    return res
}
// 获取音乐详情
export function getDetail(id: string | number) {
    let res = request(`/detail?id=${id}`, 'GET')
    return res
}
// 获取相关推荐
export function getOther() {
    let res = request('/other', 'GET')
    return res
}
