export default {
    getSession: function (name: string): any {
        if (!name) return
        return window.sessionStorage.getItem(name)
    },
    setSession: function (name: string, content: any) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.sessionStorage.setItem(name, content)
    },
    removeSession: function (name: string) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
    getLocal: function (name: string): any {
        if (!name) return
        return window.localStorage.getItem(name)
    },
    setLocal: function (name: string, content: any) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    removeLocal: function (name: string) {
        if (!name) return
        window.localStorage.removeItem(name)
    }
}
