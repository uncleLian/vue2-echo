// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
Vue.use(MuseUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

// mock
import './mock/mock.js'

// 组件
import banner from '@/components/banner'
import list from '@/components/list'
import loading from '@/components/loading'
Vue.component('my-banner', banner)
Vue.component('my-list', list)
Vue.component('my-loading', loading)

// import { swiper, goTop } from '@/components/directive.js'
import { goTop } from '@/components/directive.js'
// 右滑返回上一页 & 滑动input失去焦点
// Vue.directive('swiper', {
//     inserted: function(el, binding, vnode) {
//         if (binding.value) {
//             swiper(el, binding.arg, binding.value, vnode.context)
//         } else {
//             return
//         }
//     }
// })
// 点击回到页面顶部
Vue.directive('goTop', {
    inserted: function(el, binding, vnode) {
        if (binding.value) {
            goTop(el, binding.arg, vnode.context)
        } else {
            return
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
