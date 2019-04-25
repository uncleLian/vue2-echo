import axios from 'axios'
import { Toast } from 'mint-ui'

export const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20 * 1000
})

// request
instance.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

// response
instance.interceptors.response.use(response => {
    const res = response.data
    // 根据返回信息，可自定义一些报错规则
    return Promise.resolve(res)
}, error => {
    // 输出错误信息
    Toast(error.message)
    return Promise.reject(error)
})

/*
* request方法（统一axios请求方法的格式）
* url       请求URL
* type      请求类型
* data      参数
* isForm    是否表单数据
*/
export const request = async (url = '', type = 'GET', data = {}, isForm = false) => {
    let result
    type = type.toUpperCase()
    if (isForm) {
        let form = new FormData()
        Object.keys(data).forEach(key => {
            form.append(key, data[key])
        })
        data = form
    }
    let requestOptions = {
        method: type,
        url: url,
        headers: {
            'Content-type': isForm ? 'multipart/form-data' : 'application/json'
        },
        params: type === 'GET' ? data : '',
        data: type !== 'GET' ? data : ''
    }
    await instance(requestOptions).then(res => {
        result = res
    })
    return result
}
