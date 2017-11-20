import Vue from 'vue'
import Router from 'vue-router'

// 懒加载对应路由页面的资源，如果想避免后端路由配置对应资源的麻烦，就不使用
// const index = () => import ('@/page/index/index')
// const detail = () => import ('@/page/detail/detail')

import index from '@/page/index/index'
import detail from '@/page/detail/detail'

Vue.use(Router)

export default new Router({
    // 注意：开启history模式，在开发环境下刷新是没有问题的，但是项目上线之后刷新的话，页面就会出现404了，需要后端配置，我用过官网给出的niginx配置，直接贴上代码就搞定了。具体请看 https://router.vuejs.org/zh-cn/essentials/history-mode.html
    mode: 'history',
    // 注意：因为页面的高度是获取数据后撑开的，所以需要开启Keep-alive，返回的时候scrollBehavior才生效。或者你不想keep-alive数据，使用下面注释的代码把滚动位置的值先存到路由meta里，然后在组件里获取，等数据回来后再自己$(window).scrollTop(position.y)实现滚动，这种场景在vue2-health项目实践过，是可以的。
    // 注意：如果用了过渡动画，返回时滚动的体验并不好，因为vue-router滚动是瞬间完成的，视觉上会看到当前页面滚动了，然后才跳转页面，可以在app.vue打开过渡动画看看效果。
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // to.meta.position = savedPosition
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [{
            path: '/index',
            component: index
        },
        {
            path: '/detail/:id',
            component: detail
        },
        // 注意：开启history模式，后端就无法返回404页面了，所以前端需要对所有情况做一个统一处理，这里可以写一个404页面或者像我一样返回主页
        {
            path: '*',
            redirect: '/index'
        }
    ]
})
