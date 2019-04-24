import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.ts'
import store from '@/store/index.ts'

// 第三方
import MintUI, { Indicator, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueProgressBar from 'vue-progressbar'

// 自定义
import '@/assets/index.js' // 字体、样式等资源
import '@/filters/index.js' // 全局过滤
import '@/mock/index.js' // 模拟数据

// 第三方
Vue.use(MintUI)
Vue.prototype.$indicator = Indicator // 全局挂在方法
Vue.prototype.$toast = Toast
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
