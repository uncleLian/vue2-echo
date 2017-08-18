import Vue from 'vue'
import Vuex from 'vuex'
import { fetch } from '@/config/fetch.js'

Vue.use(Vuex)

const state = {
    current_sound_data: null,
    play: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    listJson: {}
}

const getters = {
    current_sound_data: state => {
        return state.current_sound_data
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
        return state.progress
    },
    listJson: state => {
        return state.listJson
    }
}

const mutations = {
    set_current_sound_data(state, val) {
        state.current_sound_data = val
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
    set_progress(state, val) {
        state.progress = val
    },
    set_listJson(state, val) {
        state.listJson = val
    }
}

const actions = {

    // 获取推荐列表数据
    async get_banner_data() {
        let res = await fetch('GET', 'banner')
        return res
    },

    async get_recommend_data({ state, commit }) {
        let res = await fetch('GET', 'recommend')
        let list = {}
        for (var i = 0; i < res.data.length; i++) {
            list[res.data[i].sound.id] = res.data[i]
        }
        list = { ...state.listJson, ...list }
        commit('set_listJson', list)
        return res
    },

    get_sound_data({ state, commit }, id) {
        let res = state.listJson[id]
        return res
    }

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
