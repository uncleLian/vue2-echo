import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/config/fetch.js'
import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache.js'

Vue.use(Vuex)

const state = {
    current_sound_data: null,
    audio: null,
    play: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    playMode: 'listRepeat',
    playList: [],
    listJson: {}
}

const getters = {
    current_sound_data: state => {
        return state.current_sound_data
    },
    audio: state => {
        return state.audio
    },
    play: state => {
        return state.play
    },
    currentTime: state => {
        return state.currentTime
    },
    duration: state => {
        return state.duration
    },
    progress: state => {
        return (state.currentTime / state.duration * 100).toFixed(2) + '%'
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
    set_current_sound_data(state, val) {
        state.current_sound_data = val
    },
    set_audio(state, val) {
        state.audio = val
    },
    set_play(state, val) {
        state.play = val
    },
    set_duration(state, val) {
        state.duration = val
    },
    set_currentTime(state, val) {
        state.currentTime = val
    },
    set_playMode(state, val) {
        state.playMode = val
        set_local_cache('playMode', val)
    },
    set_playList(state, val) {
        state.playList = val
        set_local_cache('playList', val)
    },
    set_listJson(state, val) {
        state.listJson = val
        setCache('listJson', val)
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
            if (state.playList[i].sound.id === id) {
                is_has = true
                break
            }
        }
        if (!is_has) {
            let playList = [res, ...state.playList]
            commit('set_playList', playList)
        }
        return res
    },

    // 获取应用缓存
    get_app_cache({ state, commit }) {
        let listJson = JSON.parse(getCache('listJson'))
        let playList = JSON.parse(get_local_cache('playList'))
        let playMode = get_local_cache('playMode')
        if (listJson) {
            commit('set_listJson', listJson)
        }
        if (playList) {
            commit('set_playList', playList)
        }
        if (playMode) {
            commit('set_playMode', playMode)
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
