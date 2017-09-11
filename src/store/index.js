import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/config/fetch.js'
import { getCache, setCache } from '@/config/cache.js'

Vue.use(Vuex)

const state = {
    audio: {
        data: null,
        ele: null,
        state: {
            play: false,
            duration: 0,
            currentTime: 0
        }
    },
    playMode: 'listRepeat',
    playList: [],
    listJson: {}
}

const getters = {
    audio_data: state => {
        return state.audio.data
    },
    audio_ele: state => {
        return state.audio.ele
    },
    audio_play: state => {
        return state.audio.state.play
    },
    audio_currentTime: state => {
        return state.audio.state.currentTime
    },
    audio_duration: state => {
        return state.audio.state.duration
    },
    audio_progress: state => {
        return (state.audio.state.currentTime / state.audio.state.duration * 100).toFixed(2) + '%'
    },
    playMode: state => {
        return state.playMode
    },
    playList: state => {
        return state.playList
    },
    listJson: state => {
        return state.listJson
    }
}

const mutations = {
    set_audio_data(state, val) {
        state.audio.data = val
    },
    set_audio_ele(state, val) {
        state.audio.ele = val
    },
    set_audio_play(state, val) {
        state.audio.state.play = val
    },
    set_audio_duration(state, val) {
        state.audio.state.duration = val
    },
    set_audio_currentTime(state, val) {
        state.audio.state.currentTime = val
    },
    set_audio_playMode(state, val) {
        state.playMode = val
        setCache('playMode', val)
    },
    set_playList(state, val) {
        // 不直接等于是解决删除数组时的引用问题
        state.playList = []
        state.playList.push(...val)
        setCache('playList', val)
    },
    set_listJson(state, val) {
        state.listJson = val
        setCache('listJson', val)
    },
    // 获取应用缓存
    set_app_cache(state, val) {
        let listJson = JSON.parse(getCache('listJson'))
        let playList = JSON.parse(getCache('playList'))
        let playMode = getCache('playMode')
        if (listJson) {
            state.listJson = listJson
        }
        if (playList) {
            state.playList = playList
        }
        if (playMode) {
            state.playMode = playMode
        }
    }
}

const actions = {

    // 获取banner数据
    async get_banner_data({ state, commit }) {
        let res = await fetch('GET', 'banner')
        let list = {}
        for (var i = 0; i < res.data.length; i++) {
            list[res.data[i].sound.id] = res.data[i]
        }
        list = { ...state.listJson, ...list }
        commit('set_listJson', list)
        return res
    },

    // 获取推荐数据
    async get_recommend_data({ state, commit }) {
        let res = await fetch('GET', 'recommend')
        if (res.data) {
            let list = {}
            for (var i = 0; i < res.data.length; i++) {
                list[res.data[i].sound.id] = res.data[i]
            }
            list = { ...state.listJson, ...list }
            commit('set_listJson', list)
        }
        return res
    },

    // 获取声音数据
    async get_sound_data({ state, commit }, id) {
        // 获得sound数据
        let res = await state.listJson[id]
        // 判断播放列表是否存在sound数据，有则跳过，无则添加
        let is_has = false
        for (var i = 0; i < state.playList.length; i++) {
            if (state.playList[i] && state.playList[i].sound.id === id) {
                is_has = true
                break
            }
        }
        if (!is_has) {
            let playList = [res, ...state.playList]
            commit('set_playList', playList)
        }
        return res
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
