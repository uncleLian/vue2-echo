import { instance } from '@/utils/request'

// 获取banner
export function getBanner() {
    let res = instance.get('/banner')
    return res
}
// 获取推荐列表
export function getList(page) {
    let res = instance.get(`/list?page=${page}`)
    return res
}
// 获取音乐详情
export function getDetail(id) {
    let res = instance.get(`/detail?id=${id}`)
    return res
}
// 获取相关推荐
export function getOther() {
    let res = instance.get('/other')
    return res
}
