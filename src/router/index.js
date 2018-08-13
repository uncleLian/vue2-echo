import Vue from 'vue'
import Router from 'vue-router'

// 懒加载路由页面资源（加快首屏加载）
const index = () => import('@/pages/index/index')
const detail = () => import('@/pages/detail/detail')

Vue.use(Router)

const routes = [
    {
        path: '',
        redirect: '/index'
    },
    {
        name: 'index',
        path: '/index',
        component: index
    },
    {
        name: 'detail',
        path: '/detail',
        component: detail
    }
]
export default new Router({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
