const { ipcRenderer } = require('electron')

const navigatorLanguage = (navigator.language || navigator.userLanguage).substr(0, 2);

const state = {
    locale: navigatorLanguage,    
    theme: {},

    languages: {},
    themes: [],    
}

const getters = {    
    locale: state => state.locale,
    theme: state => state.theme,

    languages: state => state.languages,
    themes: state => state.themes,    
}

const mutations = {
    setConfiguration(state, obj) {
        if (obj) {

            state.locale = obj.locale;

            state.theme = obj.ui.theme;

            state.languages = obj.languages;

            state.themes = obj.themes;       
        }
    },

    setLocale(state, obj) {
        if (obj) {
            state.locale = obj;
        }
    },


    setTheme(state, obj) {
        if (obj) {
            state.theme.name = obj;
        }
    },

    setThemeDark(state, obj) {
        state.theme.dark = obj;
    }

}

const actions = {
    async loadConfiguration({ commit }) {
        let configuration = await ipcRenderer.invoke('cfg.mgr.getAll');       

        commit('setConfiguration', configuration);
    },

    async setLocale({ commit }, obj) {
        if (obj) {
            await ipcRenderer.invoke('cfg.mgr.set', 'locale', obj);

            commit('setLocale', obj);
        }
    },

    async setTheme({ commit }, obj) {
        if (obj) {
            await ipcRenderer.invoke('cfg.mgr.set', 'ui.theme.name', obj);

            commit('setTheme', obj);
        }
    },

    async setThemeDark({ commit }, obj) {
        await ipcRenderer.invoke('cfg.mgr.set', 'ui.theme.dark', obj);

        commit('setThemeDark', obj);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}