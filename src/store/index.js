import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/utils/cache'
import playMode from '@/utils/playMode'

Vue.use(Vuex)

const state = {
    audio: {
        ele: null, // auido元素
        data: null, // audio音乐数据
        play: false, // audio播放状态
        duration: 0, // audio总时长
        currentTime: 0 // audio当前秒数
    },
    playMode: playMode.default.value, // 播放模式
    playList: [] // 播放列表
}

const getters = {
    // audio当前百分比%的播放进度
    audio_progress: state => {
        return (state.audio.currentTime / state.audio.duration * 100).toFixed(2) + '%'
    }
}

const mutations = {
    SET_AUDIO_ELE(state, val) {
        state.audio.ele = val
    },
    SET_AUDIO_DATA(state, val) {
        state.audio.data = val
    },
    SET_AUDIO_PLAY(state, val) {
        state.audio.play = val
    },
    SET_AUDIO_DURATION(state, val) {
        state.audio.duration = val
    },
    SET_AUDIO_CURREN_TIME(state, val) {
        state.audio.currentTime = val
    },
    SET_PLAY_MODE(state, val) {
        state.playMode = val
        cache.setSession('playMode', val)
    },
    SET_PLAY_LIST(state, val) {
        // 不直接等于是解决数组引用的问题
        state.playList = val.slice()
        cache.setSession('playList', val)
    }
}

const actions = {
    // 获取应用缓存，如：播放列表，播放模式
    INIT_APP_CACHE({ commit }) {
        let playMode = cache.getSession('playMode')
        let playList = JSON.parse(cache.getSession('playList'))
        if (playMode) {
            commit('SET_PLAY_MODE', playMode)
        }
        if (playList && playList.length > 0) {
            commit('SET_PLAY_LIST', playList)
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
