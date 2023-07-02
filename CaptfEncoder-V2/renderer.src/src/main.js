
import Vue from 'vue'
import VueI18n from 'vue-i18n';
import VueClipboard from 'vue-clipboard2'

import "@mdi/font/css/materialdesignicons.css"

import App from './App'
import store from './store'
import router from './router'
import vuetify from '@/plugins/vuetify'

import CommandsPlugin from './plugins/commands'
import ExtendablePlugin from './extendable/extendable.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'default',
  messages: {
    default: require('./lang/default.js'),
    fallbackLocale: 'default',
  }
})



Vue.config.productionTip = false
Vue.prototype.console = window.console

// 使用剪切板
Vue.use(VueClipboard)

Vue.use(CommandsPlugin)
Vue.use(ExtendablePlugin)



new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  i18n,
  components: { App },
  template: '<App/>'
})
