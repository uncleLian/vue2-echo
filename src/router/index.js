import Vue from 'vue'
import Router from 'vue-router'

// 懒加载路由页面资源（减少应用体积，加快首次加载速度）
const index = () => import('@/page/index/index')
const detail = () => import('@/page/detail/detail')

// 全部加载
// import index from '@/page/index/index'
// import detail from '@/page/detail/detail'

Vue.use(Router)

export default new Router({
    // mode: 'history', // 后端支持可开
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            to.meta.position = savedPosition
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/index',
            component: index
        },
        {
            path: '/detail/:id',
            component: detail
        },
        // 注意：开启history模式，后端就无法返回404页面了，
        // 所以前端需要对所有情况做一个统一处理，这里可以写一个404页面或者像我一样返回主页
        {
            path: '*',
            redirect: '/index'
        }
    ]
})
