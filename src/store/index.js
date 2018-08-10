import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
    audio: {
        ele: null, // auido元素
        data: null, // audio音乐数据
        play: false, // audio播放状态
        duration: 0, // audio总时长
        currentTime: 0 // audio当前秒数
    },
    playMode: 'default', // 播放模式
    playList: [] // 播放列表
}

const getters = {
    // audio当前百分比%的播放进度
    audio_progress: state => {
        return (state.audio.currentTime / state.audio.duration * 100).toFixed(2) + '%'
    }
}

const mutations = {
    set_audio_ele(state, val) {
        state.audio.ele = val
    },
    set_audio_data(state, val) {
        state.audio.data = val
    },
    set_audio_play(state, val) {
        state.audio.play = val
    },
    set_audio_duration(state, val) {
        state.audio.duration = val
    },
    set_audio_currentTime(state, val) {
        state.audio.currentTime = val
    },
    set_playMode(state, val) {
        state.playMode = val
        cache.setSession('playMode', val)
    },
    set_playList(state, val) {
        // 不直接等于是解决数组引用的问题
        state.playList = val.slice()
        cache.setSession('playList', val)
    }
}

const actions = {
    // 获取应用缓存，如：播放列表，播放模式
    getAppCache({ commit }) {
        let playMode = cache.getSession('playMode')
        let playList = JSON.parse(cache.getSession('playList'))
        if (playMode) {
            commit('set_playMode', playMode)
        }
        if (playList && playList.length > 0) {
            commit('set_playList', playList)
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
