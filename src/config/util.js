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
    },
    handleLocaltion: (type, vue) => {
        if (type === 'get') {
            vue.$nextTick(() => {
                if (vue.localtion > 0) {
                    $('body').scrollTop(vue.localtion)
                } else {
                    $('body').scrollTop(0)
                }
            })
        } else if (type === 'set') {
            let scrollTop = $('body').scrollTop()
            vue.localtion = scrollTop
        }
    }
}
