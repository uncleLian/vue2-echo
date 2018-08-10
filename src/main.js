// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 第三方库
import MintUI, { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueProgressBar from 'vue-progressbar'
// 自定义
import '@/assets/css/reset.css'
import '@/assets/css/global.css'
// 全局组件
import components from '@/components'
// 全局过滤
import filters from '@/filters'
import '@/mock'

Vue.config.productionTip = false

// 第三方
Vue.use(MintUI)
Vue.prototype.$indicator = Indicator
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})
// 注册全局组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
})
// 注册全局过滤
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
