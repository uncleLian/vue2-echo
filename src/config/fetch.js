import axios from 'axios'
import qs from 'qs'
let baseUrl = 'http://localhost:8088'

export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = baseUrl + '/' + url

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
