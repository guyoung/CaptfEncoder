import Vue from 'vue';
import Vuex from 'vuex';

import snackbar from './snackbar';
import extensions from './extensions';
import config from './config';
import window from './window';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        snackbar,
        extensions,
        config,
        window
    }
})

export default store