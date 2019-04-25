// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// 第三方库
import MintUI, { Indicator, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueProgressBar from 'vue-progressbar'

// 自定义
import '@/assets' // 字体、样式等资源
import '@/filters' // 全局过滤器
import '@/mock' // 模拟数据

// 第三方
Vue.use(MintUI)
Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

// 全局错误捕捉，防止单页面卡死
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (error, vm, info) {
        console.log(error)
        Toast(info)
    }
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
