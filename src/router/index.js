import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/page/index/index')
const detail = () => import('@/page/detail/detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'index'
    },
    {
      name: 'index',
      path: '/index',
      component: index
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: detail
    }
  ]
})
