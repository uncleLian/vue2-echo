import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios // 这样设置就可以在组件内用 this.$http 使用axios了，但我一般封装一下方法，然后在vuex的actions里统一发起请求以减少组件的代码
axios.defaults.baseURL = 'http://localhost:8088/'

export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    if (type === 'GET') {
        await axios.get(url, { params: data })
        .then(res => {
            result = res.data
        })
    } else if (type === 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
}
