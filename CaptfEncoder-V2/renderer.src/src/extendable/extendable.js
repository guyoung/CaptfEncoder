import { ipcRenderer } from 'electron';



import ExtEncoder from './componets/ExtEncoder';
import ExtForm from './componets/ExtForm';
import ExtTab from './componets/ExtTab';
import ExtTabEncoder from './componets/ExtTabEncoder';
import ExtEditor from './componets/ExtEditor';

import ExtLoading from './componets/ExtLoading';

const ExtendablePlugin = {
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

    Vue.prototype.$extInvoke = async function (hander, input = '', options = {}) {
      return await ipcRenderer.invoke(hander, input, options);
    };

    Vue.component('ext-form', ExtForm);
    //Vue.component('ext-encoder', ExtEncoder);
    Vue.component('ext-tab', ExtTab);
    Vue.component('ext-tab-encoder', ExtTabEncoder);
    Vue.component('ext-loading', ExtLoading);
    Vue.component('ext-editor', ExtEditor);


  }
}
export default ExtendablePlugin;