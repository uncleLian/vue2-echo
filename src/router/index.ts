import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '',
        redirect: '/index'
    },
    {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index.vue')
    },
    {
        name: 'detail',
        path: '/detail',
        component: () => import('@/views/detail/detail.vue')
    }
]
export default new Router({
    routes,
    // 使用<keep-alive>，scrollBehavior才能生效。
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
