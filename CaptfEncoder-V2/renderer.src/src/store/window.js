const { ipcRenderer } = require('electron')

const state = {
    window: {
        maximized: false,
        
    }
  
}

const getters = {
    window: state => state.window
}

const mutations = {
    setMaximize(state, obj) {
        state.window.maximized = obj;
    },
   
}

const actions = {
    async maximizeWindow({ commit }) {
        let result = await ipcRenderer.invoke('win.mgr.maximize_window');

        if(result) {
            commit('setMaximize', true);
        }        
    },
    async unmaximizeWindow({ commit }) {
        let result = await ipcRenderer.invoke('win.mgr.unmaximize_window');

        if(result) {
            commit('setMaximize', false);
        }        
    },
   
}

export default {
    state,
    getters,
    mutations,
    actions
}