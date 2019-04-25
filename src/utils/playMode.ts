// 播放模式配置文件
const Options: any = {
    default: {
        label: '默认',
        value: 'default',
        icon: 'my-icon-more'
    },
    random: {
        label: '随机播放',
        value: 'random',
        icon: 'my-icon-random'
    },
    singleRepeat: {
        label: '单曲循环',
        value: 'singleRepeat',
        icon: 'my-icon-repeatone'
    },
    listRepeat: {
        label: '列表循环',
        value: 'listRepeat',
        icon: 'my-icon-repeat'
    }
}

export let ArrayOptions: any[] = []
Object.keys(Options).forEach((key: any) => {
    ArrayOptions.push(Options[key])
})

export default Options
