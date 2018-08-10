import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'mint-ui'

export const instance = axios.create({
    baseURL: 'http://localhost:8001/', // 基础链接
    timeout: 10 * 1000 // 超时时间
})

// 请求拦截
instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(response => {
    const res = response.data
    return Promise.resolve(res)
}, error => {
    // 输出错误信息
    Toast(error.message)
    return Promise.reject(error)
})

Plugin.install = function (Vue, options) {
    Vue.axios = instance
    window.axios = instance
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return instance
            }
        },
        $axios: {
            get() {
                return instance
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
