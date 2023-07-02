import { ipcRenderer, shell, nativeImage, clipboard } from 'electron';

import urlParse from 'url-parse';

const CommandsPlugin = {
  install(Vue, options) {
    // 添加全局方法或 property
    /*
    Vue.myGlobalMethod = function () {
      
    }
    */

    // 添加全局资源
    /* 
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        
      }
      
    })
    */


    // 注入组件选项
    /* 
    Vue.mixin({
      created: function () {
        
      }
      
    })
    */

    // 添加实例方法
    /* 
    Vue.prototype.$myMethod = function (methodOptions) {
      
    }
    */

    Vue.prototype.$createWindow = async function (title, hash, query) {
      const result = await ipcRenderer.invoke('win.mgr.create_window', title, hash, query);

      return result;
    };


    Vue.prototype.$minimizeWindow = async function () {
      let result = await ipcRenderer.invoke('win.mgr.minimize_window');

      return result;
    };

    Vue.prototype.$closeWindow = async function () {
      let result = await ipcRenderer.invoke('win.mgr.close_window');

      return result;
    };

    Vue.prototype.$openFile = async function (dialogTitle, dialogFilters) {
      let options = {};

      if (dialogTitle) {
        options.title = dialogTitle;
      }

      if (dialogFilters) {
        options.filters = dialogFilters;
      }

      const result = await ipcRenderer.invoke('dlg.mgr.open_file', options);

      return result;
    };

    Vue.prototype.$openTextFile = async function (dialogTitle, dialogFilters) {
      let options = {};

      if (dialogTitle) {
        options.title = dialogTitle;
      }

      if (dialogFilters) {
        options.filters = dialogFilters;
      }

      const result = await ipcRenderer.invoke('dlg.mgr.open_file', options);

      if (result && result.data) {
        result.data = String.fromCharCode.apply(null, result.data);
      }

      return result;
    };

    Vue.prototype.$openImageFile = async function (dialogTitle, dialogFilters) {
      let options = {};

      if (dialogTitle) {
        options.title = dialogTitle;
      }

      if (dialogFilters) {
        options.filters = dialogFilters;
      } else {
        options.filters = [{
          name: this.$t("command.file.image_files"), extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        }, {
          name: this.$t("command.file.all_files"), extensions: ['*']
        }];
      }

      const result = await ipcRenderer.invoke('dlg.mgr.open_file', options);

      return result;
    };

    Vue.prototype.$saveFile = async function (data, dialogTitle, dialogFilters) {
      let options = {};

      if (dialogTitle) {
        options.title = dialogTitle;
      }

      if (dialogFilters) {
        options.filters = dialogFilters;
      }

      const result = await ipcRenderer.invoke('dlg.mgr.save_file', data, options);

      return result;
    };

    Vue.prototype.$saveImageFile = async function (data, extension, dialogTitle) {
      let options = {};

      if (dialogTitle) {
        options.title = dialogTitle;
      }

      options.filters = [];

      if (extension) {
        options.filters.push({
          name: this.$t("command.file.image_files"), extensions: [extension]
        });
      }
      options.filters.push({
        name: this.$t("command.file.all_files"), extensions: ['*']
      });


      const result = await ipcRenderer.invoke('dlg.mgr.save_file', data, options);

      return result;
    };



    Vue.prototype.$copyToClipboard = function (text) {
      clipboard.writeText(text);

      return true;
    };

    Vue.prototype.$pasteFromClipboard = function () {
      const text = clipboard.readText();

      return text;
    };

    Vue.prototype.$getExtensionsFolder = async function () {
      const folder = await ipcRenderer.invoke('ext.mgr.get_extension_folder');

      return folder;
    };

    Vue.prototype.$openExternalUrl = function (url) {
      shell.openExternal(url);
    };

    Vue.prototype.$openExtensionsFolder = async function () {
      const folder = await ipcRenderer.invoke('ext.mgr.get_extension_folder');

      if (folder) {
        shell.showItemInFolder(folder)
      }
    };

    Vue.prototype.$initLocale = function () {
      const languages = this.$store.getters.languages;

      for (let key of Object.keys(languages)) {
        this.$i18n.setLocaleMessage(key, languages[key]);
      }

      
     
      this.$i18n.locale = this.$store.getters.locale;

      this.$setWindowLocaleTitle();

    }


    Vue.prototype.$setLocale = function (locale) {
      const languages = this.$store.getters.languages;

      if (languages[locale]) {
        this.$store.dispatch("setLocale", locale);

        this.$i18n.locale = locale;

        this.$setWindowLocaleTitle();
      }

    }

    Vue.prototype.$setTheme = function (name) {
      const theme = this.$store.getters.theme;
      const themes = this.$store.getters.themes;

      if (typeof name !== "undefined" && name !== null) {
        this.$store.dispatch('setTheme', name);
      } else {
        if (theme) {
          name = theme.name;
        }
      }

      if (name && themes) {
        themes.some((item) => {
          if (item.name === name) {
            Object.keys(item.dark).forEach((i) => {
              this.$vuetify.theme.themes.dark[i] = item.dark[i];
            });
            Object.keys(item.light).forEach((i) => {
              this.$vuetify.theme.themes.light[i] = item.light[i];
            });

            return;
          }
        });
      }
    };

    Vue.prototype.$setThemeDark = function (dark) {
      const theme = this.$store.getters.theme;

      if (typeof dark !== "undefined" && dark !== null) {
        this.$store.dispatch('setThemeDark', dark);
      } else {
        if (theme) {
          dark = theme.dark;
        }
      }

      this.$vuetify.theme.dark = dark;
    }

    Vue.prototype.$setWindowLocaleTitle = function () {
      document.title = this.$t("renderer.window.title");
    }

    Vue.prototype.$getItemLocaleTitle = function (item) {      
      const locale = this.$store.getters.locale;    

      if (item.titles && item.titles[locale]) { 
        return item.titles[locale];
      } 

      return item.title;     
    }

    Vue.prototype.$checkUpdate = async function () {
      const result = await ipcRenderer.invoke('upd.mgr.check_update');

      return result;
    }

    Vue.prototype.$sleep = function (time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve('over'), time);

      });
    };


    Vue.prototype.$sleep = function (time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve('over'), time);

      });
    };

    Vue.prototype.$urlParse = function (url) {
      return urlParse(url);
    }

  }
}
export default CommandsPlugin;