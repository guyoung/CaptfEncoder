const state = {
    // 全局消息条
    snackbar: { 
        show: false,
        timeout: 6000,
        color: 'grey darken-4',
        text: ''
    }
}

const getters = {
    snackbar: state => state.snackbar
}

const mutations = {
    showSnackbar(state, obj) {
        state.snackbar.text = obj
        state.snackbar.show = true
    },
    hideSnackbar(state) {
        state.snackbar.show = false
    }
}

const actions = {
    async showSnackbar({ commit }, obj) {
        commit('showSnackbar', obj)
    },
    async hideSnackbar({ commit }) {
        commit('hideSnackbar')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}