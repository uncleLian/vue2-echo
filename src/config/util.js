// 自定义的全局方法
export default {
    sec2his: t => {
        if (~~t || t < 1) {
            var tt = Math.round(t)
            var m = Math.floor(t / 60)
            var s = tt % 60
            m = m >= 10 ? m : '0' + m
            s = s >= 10 ? s : '0' + s
            return m + ':' + s
        } else {
            return t
        }
    }
}
