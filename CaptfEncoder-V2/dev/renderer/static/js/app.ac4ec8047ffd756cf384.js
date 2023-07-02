webpackJsonp([1],{

/***/ "+Smb":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("D7pK");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("b4a5dab4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5db227b3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtEditor.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5db227b3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtEditor.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "1vXy":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("W8YJ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("0d09207e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09fabd46\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtEncoder.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09fabd46\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtEncoder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "2Lqz":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.tab-add-btn[data-v-efb8a782] {\r\n  margin-left: 4px;\r\n  margin-top: 4px;\n}\r\n", "", {"version":3,"sources":["E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/extendable/componets/src/extendable/componets/ExtTab.vue"],"names":[],"mappings":";AA4EA;EACA,iBAAA;EACA,gBAAA;CACA","file":"ExtTab.vue","sourcesContent":["<template>\r\n  <v-card width=\"100%\" height=\"96%\">\r\n    <v-tabs v-model=\"currentTab\">\r\n      <v-tab v-for=\"(tabItem, index) in tabItems\" :key=\"index\">\r\n        {{ tabItem.title + \" \" + (index + 1) }}\r\n        <v-icon size=\"20\" @click=\"removeTab(index)\" v-if=\"currentTab === index\">\r\n          mdi-minus-circle\r\n        </v-icon>\r\n      </v-tab>\r\n      <v-btn icon @click=\"addTab()\" class=\"tab-add-btn\">\r\n        <v-icon size=\"40\"> mdi-plus </v-icon>\r\n      </v-btn>\r\n    </v-tabs>\r\n\r\n    <v-tabs-items v-model=\"currentTab\">\r\n      <v-tab-item v-for=\"(tabItem, index) in tabItems\" :key=\"index\">\r\n           <slot></slot>\r\n      </v-tab-item>\r\n    </v-tabs-items>\r\n  </v-card>\r\n</template>\r\n<script>\r\n\r\nexport default {\r\n  name: \"ext-tab\",\r\n\r\n  data() {\r\n    return {\r\n      currentTab: null,\r\n      tabItems: [],\r\n      tabId: 0,\r\n    };\r\n  },\r\n\r\n  props: {\r\n    title: {\r\n      type: String,\r\n      default: \"\",\r\n    },\r\n  },\r\n\r\n  components: {\r\n   \r\n  },\r\n\r\n  created() {\r\n    this.tabItems.push({\r\n      id: this.tabId++,\r\n      title: this.title,\r\n     \r\n    });\r\n  },\r\n  methods: {\r\n    addTab() {\r\n      this.tabItems.push({\r\n        id: this.tabId++,\r\n        title: this.title,\r\n       \r\n      });\r\n\r\n      this.currentTab = this.tabItems.length - 1;\r\n    },\r\n\r\n    removeTab(index) {\r\n      this.tabItems.splice(index, 1);\r\n\r\n      if (index <= this.tabItems.length - 1) {\r\n        this.currentTab = index;\r\n      } else {\r\n        this.currentTab = index - 1;\r\n      }\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style scoped>\r\n.tab-add-btn {\r\n  margin-left: 4px;\r\n  margin-top: 4px;\r\n}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "2oWE":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("TeeX");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("510972d4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60f35ab6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60f35ab6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "3Fqg":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Search.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "7zck":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Cy2w":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("YCv2");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("74da9d12", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8f2e1d30\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AboutDialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8f2e1d30\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AboutDialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "D7pK":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ExtEditor.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "G4Vi":
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "IIel":
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "JCT4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2Lqz");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("29b04334", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efb8a782\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtTab.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-efb8a782\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtTab.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "K2tO":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("X0IW");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("6eeb9f88", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e6e476a8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LanguagePicker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e6e476a8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LanguagePicker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm.js
var vue_i18n_esm = __webpack_require__("TXmL");

// EXTERNAL MODULE: ./node_modules/vue-clipboard2/vue-clipboard.js
var vue_clipboard = __webpack_require__("wvfG");
var vue_clipboard_default = /*#__PURE__*/__webpack_require__.n(vue_clipboard);

// EXTERNAL MODULE: ./node_modules/@mdi/font/css/materialdesignicons.css
var materialdesignicons = __webpack_require__("csSS");
var materialdesignicons_default = /*#__PURE__*/__webpack_require__.n(materialdesignicons);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/regenerator/index.js
var regenerator = __webpack_require__("Xxa5");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("exGp");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/screenfull/dist/screenfull.js
var screenfull = __webpack_require__("I95x");
var screenfull_default = /*#__PURE__*/__webpack_require__.n(screenfull);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("NYxO");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/navigation/Navigation.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Navigation = ({
  name: "Navigation",
  props: {
    color: String
  },
  data: function data() {
    return {
      activedGroups: {}
    };
  },

  computed: extends_default()({}, Object(vuex_esm["c" /* mapGetters */])(["navItems"])),
  methods: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5846b836","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/navigation/Navigation.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
      attrs: {
        width: "300",
        color: _vm.color,
        "hide-overlay": "",
        clipped: "",
        app: ""
      }
    },
    [
      _c(
        "v-list",
        { staticClass: "nav-list" },
        [
          _vm._l(_vm.navItems, function(item1) {
            return [
              item1.items.length
                ? _c(
                    "v-list-group",
                    {
                      key: item1.name,
                      staticClass: "white--text",
                      attrs: {
                        "prepend-icon": "mdi-folder",
                        "active-class": _vm.$vuetify.theme.dark
                          ? "white--text"
                          : "grey--text text--darken-3",
                        group: item1.name
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function() {
                              return [
                                _c(
                                  "v-list-item-content",
                                  [
                                    _c("v-list-item-title", {
                                      staticClass: "white--text",
                                      domProps: {
                                        textContent: _vm._s(
                                          _vm.$getItemLocaleTitle(item1)
                                        )
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      ),
                      model: {
                        value: _vm.activedGroups[item1.name],
                        callback: function($$v) {
                          _vm.$set(_vm.activedGroups, item1.name, $$v)
                        },
                        expression: "activedGroups[item1.name]"
                      }
                    },
                    [
                      _vm._v(" "),
                      _vm._l(item1.items, function(item2) {
                        return _c(
                          "v-list-item",
                          {
                            key: item2.name,
                            attrs: {
                              "active-class": "secondary white--text",
                              to: item2.path,
                              dense: ""
                            },
                            on: {
                              click: function($event) {
                                _vm.activedGroups[item1.name] = true
                              }
                            }
                          },
                          [
                            _c(
                              "v-list-item-action",
                              [_c("v-icon", [_vm._v("mdi-file")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-list-item-content",
                              [
                                _c("v-list-item-title", {
                                  staticClass: "white--text",
                                  domProps: {
                                    textContent: _vm._s(
                                      _vm.$getItemLocaleTitle(item2)
                                    )
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                : _c(
                    "v-list-item",
                    {
                      key: item1.name,
                      attrs: {
                        "active-class": "secondary white--text",
                        to: item1.path
                      }
                    },
                    [
                      _c(
                        "v-list-item-action",
                        [_c("v-icon", [_vm._v("mdi-speedometer")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", {
                            domProps: {
                              textContent: _vm._s(
                                _vm.$getItemLocaleTitle(item1)
                              )
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
            ]
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var navigation_Navigation = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5846b836", esExports)
  }
}
// CONCATENATED MODULE: ./src/views/navigation/Navigation.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("XB1u")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5846b836"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Navigation,
  navigation_Navigation,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/views/navigation/Navigation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5846b836", Component.options)
  } else {
    hotAPI.reload("data-v-5846b836", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var views_navigation_Navigation = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/theme-picker/ThemePicker.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ThemePicker = ({
  name: "ThemePicker",
  data: function data() {
    return {
      currentTheme: ""

    };
  },
  computed: extends_default()({}, Object(vuex_esm["c" /* mapGetters */])(["theme", "themes"])),

  methods: {
    setTheme: function setTheme(themeName) {
      this.$setTheme(themeName);
    },
    setThemeDark: function setThemeDark() {
      this.$setThemeDark(!this.theme.dark);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-81efc198","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/theme-picker/ThemePicker.vue
var ThemePicker_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c("v-card-title", [
        _c("span", { staticClass: "title font-weight-bold" }, [
          _vm._v(_vm._s(_vm.$t("renderer.picker.theme.title")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-list-item",
        [
          _c(
            "v-list-item-content",
            [
              _c("v-list-item-title", [
                _vm._v(_vm._s(_vm.$t("renderer.picker.theme.dark_mode")))
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list-item-action",
            [
              _c("v-switch", {
                attrs: { value: _vm.theme.dark },
                on: { change: _vm.setThemeDark }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-card-text",
        _vm._l(_vm.themes, function(item, index) {
          return _c(
            "v-card",
            {
              key: index,
              staticClass: "my-2",
              attrs: {
                disabled: _vm.theme.name === item.name,
                hover: "",
                outlined: ""
              },
              on: {
                click: function($event) {
                  return _vm.setTheme(item.name)
                }
              }
            },
            [
              _c(
                "v-list-item",
                { attrs: { dense: "" } },
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v("\n            " + _vm._s(item.name))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-action",
                    [
                      _vm.theme.name === item.name
                        ? _c(
                            "v-avatar",
                            { attrs: { color: "success", size: "30" } },
                            [_c("v-icon", [_vm._v("mdi-check")])],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "my-2", attrs: { dense: "" } },
                [
                  _c(
                    "v-col",
                    _vm._l(Object.keys(item.light), function(key, index) {
                      return _c(
                        "v-chip",
                        {
                          key: index,
                          staticClass: "mx-1",
                          attrs: { label: "", color: item.light[key] }
                        },
                        [_vm._v("\n            " + _vm._s(key))]
                      )
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "my-2", attrs: { dense: "" } },
                [
                  _c(
                    "v-col",
                    _vm._l(Object.keys(item.dark), function(key, index) {
                      return _c(
                        "v-chip",
                        {
                          key: index,
                          staticClass: "mx-1",
                          attrs: { label: "", color: item.dark[key] }
                        },
                        [_vm._v("\n            " + _vm._s(key))]
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var ThemePicker_staticRenderFns = []
ThemePicker_render._withStripped = true
var ThemePicker_esExports = { render: ThemePicker_render, staticRenderFns: ThemePicker_staticRenderFns }
/* harmony default export */ var theme_picker_ThemePicker = (ThemePicker_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-81efc198", ThemePicker_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/theme-picker/ThemePicker.vue
var ThemePicker_disposed = false
function ThemePicker_injectStyle (ssrContext) {
  if (ThemePicker_disposed) return
  __webpack_require__("ghoD")
}
var ThemePicker_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ThemePicker___vue_template_functional__ = false
/* styles */
var ThemePicker___vue_styles__ = ThemePicker_injectStyle
/* scopeId */
var ThemePicker___vue_scopeId__ = "data-v-81efc198"
/* moduleIdentifier (server only) */
var ThemePicker___vue_module_identifier__ = null
var ThemePicker_Component = ThemePicker_normalizeComponent(
  ThemePicker,
  theme_picker_ThemePicker,
  ThemePicker___vue_template_functional__,
  ThemePicker___vue_styles__,
  ThemePicker___vue_scopeId__,
  ThemePicker___vue_module_identifier__
)
ThemePicker_Component.options.__file = "src/views/theme-picker/ThemePicker.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81efc198", ThemePicker_Component.options)
  } else {
    hotAPI.reload("data-v-81efc198", ThemePicker_Component.options)
  }
  module.hot.dispose(function (data) {
    ThemePicker_disposed = true
  })
})()}

/* harmony default export */ var views_theme_picker_ThemePicker = (ThemePicker_Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var object_keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("BO1k");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/language-picker/LanguagePicker.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var LanguagePicker = ({
  name: "LanguagePicker",
  data: function data() {
    return {};
  },

  computed: extends_default()({}, Object(vuex_esm["c" /* mapGetters */])(["locale", "languages"])),

  methods: {
    getKeys: function getKeys(obj) {
      var keys = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = get_iterator_default()(keys_default()(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          keys.push(key);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return keys;
    },
    setLocale: function setLocale(locale) {
      this.$setLocale(locale);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e6e476a8","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/language-picker/LanguagePicker.vue
var LanguagePicker_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c("v-card-title", [
        _c("span", { staticClass: "title font-weight-bold" }, [
          _vm._v("\n      " + _vm._s(_vm.$t("renderer.appbar.menu.language")))
        ])
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        _vm._l(_vm.getKeys(_vm.languages), function(item, index) {
          return _c(
            "v-list-item",
            {
              key: index,
              attrs: { dense: "" },
              on: {
                click: function($event) {
                  return _vm.setLocale(item)
                }
              }
            },
            [
              _c(
                "v-list-item-content",
                [_c("v-list-item-title", [_vm._v(_vm._s(item))])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item-action",
                [
                  _vm.locale === item
                    ? _c(
                        "v-avatar",
                        { attrs: { color: "success", size: "30" } },
                        [_c("v-icon", [_vm._v("mdi-check")])],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var LanguagePicker_staticRenderFns = []
LanguagePicker_render._withStripped = true
var LanguagePicker_esExports = { render: LanguagePicker_render, staticRenderFns: LanguagePicker_staticRenderFns }
/* harmony default export */ var language_picker_LanguagePicker = (LanguagePicker_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e6e476a8", LanguagePicker_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/language-picker/LanguagePicker.vue
var LanguagePicker_disposed = false
function LanguagePicker_injectStyle (ssrContext) {
  if (LanguagePicker_disposed) return
  __webpack_require__("K2tO")
}
var LanguagePicker_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var LanguagePicker___vue_template_functional__ = false
/* styles */
var LanguagePicker___vue_styles__ = LanguagePicker_injectStyle
/* scopeId */
var LanguagePicker___vue_scopeId__ = "data-v-e6e476a8"
/* moduleIdentifier (server only) */
var LanguagePicker___vue_module_identifier__ = null
var LanguagePicker_Component = LanguagePicker_normalizeComponent(
  LanguagePicker,
  language_picker_LanguagePicker,
  LanguagePicker___vue_template_functional__,
  LanguagePicker___vue_styles__,
  LanguagePicker___vue_scopeId__,
  LanguagePicker___vue_module_identifier__
)
LanguagePicker_Component.options.__file = "src/views/language-picker/LanguagePicker.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6e476a8", LanguagePicker_Component.options)
  } else {
    hotAPI.reload("data-v-e6e476a8", LanguagePicker_Component.options)
  }
  module.hot.dispose(function (data) {
    LanguagePicker_disposed = true
  })
})()}

/* harmony default export */ var views_language_picker_LanguagePicker = (LanguagePicker_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/search/Search.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Search = ({
  name: "Search",
  props: {},
  data: function data() {
    return {
      selected: null
    };
  },

  computed: {
    extensions: function extensions() {
      var result = [];

      var items = this.$store.getters.extensions.items;
      var locale = this.$store.getters.locale;

      if (items) {
        items.forEach(function (item, index) {
          var title = item.title;

          if (item.titles && item.titles[locale]) {
            title = item.titles[locale];
          }

          result.push({
            title: title,
            path: item.path
          });
        });
      }

      return result;
    }
  },
  watch: {
    selected: function selected(newSelected, oldSelected) {}
  },
  methods: {
    changeItem: function changeItem() {
      if (this.selected) {
        this.$router.push(this.selected.path);
        this.selected = null;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-633a08e5","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/search/Search.vue
var Search_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-autocomplete", {
    attrs: {
      items: _vm.extensions,
      "item-text": "title",
      "return-object": "",
      "hide-no-data": "",
      "hide-selected": "",
      placeholder: _vm.$t("renderer.appbar.search.placeholder"),
      "background-color": "accent",
      rounded: "",
      dense: "",
      clearable: "",
      height: "40"
    },
    on: { change: _vm.changeItem },
    scopedSlots: _vm._u([
      {
        key: "selection",
        fn: function(selected) {
          return [
            selected
              ? _c("span", {
                  domProps: { textContent: _vm._s(selected.title) }
                })
              : _vm._e()
          ]
        }
      }
    ]),
    model: {
      value: _vm.selected,
      callback: function($$v) {
        _vm.selected = $$v
      },
      expression: "selected"
    }
  })
}
var Search_staticRenderFns = []
Search_render._withStripped = true
var Search_esExports = { render: Search_render, staticRenderFns: Search_staticRenderFns }
/* harmony default export */ var search_Search = (Search_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-633a08e5", Search_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/search/Search.vue
var Search_disposed = false
function Search_injectStyle (ssrContext) {
  if (Search_disposed) return
  __webpack_require__("tjjj")
}
var Search_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Search___vue_template_functional__ = false
/* styles */
var Search___vue_styles__ = Search_injectStyle
/* scopeId */
var Search___vue_scopeId__ = "data-v-633a08e5"
/* moduleIdentifier (server only) */
var Search___vue_module_identifier__ = null
var Search_Component = Search_normalizeComponent(
  Search,
  search_Search,
  Search___vue_template_functional__,
  Search___vue_styles__,
  Search___vue_scopeId__,
  Search___vue_module_identifier__
)
Search_Component.options.__file = "src/views/search/Search.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-633a08e5", Search_Component.options)
  } else {
    hotAPI.reload("data-v-633a08e5", Search_Component.options)
  }
  module.hot.dispose(function (data) {
    Search_disposed = true
  })
})()}

/* harmony default export */ var views_search_Search = (Search_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/dialog/WechatDialog.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var WechatDialog = ({
  name: "WechatDialog",
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8d74662a","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/dialog/WechatDialog.vue
var WechatDialog_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "mx-auto" },
    [
      _c("v-card-text", [
        _c("div", { staticClass: "overline mb-4" }, [
          _vm._v(_vm._s(_vm.$t("renderer.dialog.wechat.title")))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "headline mb-1" }, [
          _vm._v("CaptfEncoder V2")
        ]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.$t("renderer.dialog.about.version")))]),
        _vm._v(" "),
        _c(
          "div",
          [
            _c("v-img", {
              attrs: {
                width: "360",
                src:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGkCAIAAAHnMdS2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1dpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iQ0NCQzI5RTMwMjI3MTlENzYyRTBENDMwMjQwMjEyMUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM3QUE4RTRGNEM3MTFFOTk3MkQ5MjZBRDY4NTQ5RjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM3QUE4RTNGNEM3MTFFOTk3MkQ5MjZBRDY4NTQ5RjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMGVjODRlOC02OGZkLWUwNGMtYmY1OS0yZTNiNDY2MTc1MzgiIHN0UmVmOmRvY3VtZW50SUQ9IkNDQkMyOUUzMDIyNzE5RDc2MkUwRDQzMDI0MDIxMjFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+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"
              }
            })
          ],
          1
        )
      ])
    ],
    1
  )
}
var WechatDialog_staticRenderFns = []
WechatDialog_render._withStripped = true
var WechatDialog_esExports = { render: WechatDialog_render, staticRenderFns: WechatDialog_staticRenderFns }
/* harmony default export */ var dialog_WechatDialog = (WechatDialog_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8d74662a", WechatDialog_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/dialog/WechatDialog.vue
var WechatDialog_disposed = false
function WechatDialog_injectStyle (ssrContext) {
  if (WechatDialog_disposed) return
  __webpack_require__("SYdB")
}
var WechatDialog_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var WechatDialog___vue_template_functional__ = false
/* styles */
var WechatDialog___vue_styles__ = WechatDialog_injectStyle
/* scopeId */
var WechatDialog___vue_scopeId__ = "data-v-8d74662a"
/* moduleIdentifier (server only) */
var WechatDialog___vue_module_identifier__ = null
var WechatDialog_Component = WechatDialog_normalizeComponent(
  WechatDialog,
  dialog_WechatDialog,
  WechatDialog___vue_template_functional__,
  WechatDialog___vue_styles__,
  WechatDialog___vue_scopeId__,
  WechatDialog___vue_module_identifier__
)
WechatDialog_Component.options.__file = "src/views/dialog/WechatDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d74662a", WechatDialog_Component.options)
  } else {
    hotAPI.reload("data-v-8d74662a", WechatDialog_Component.options)
  }
  module.hot.dispose(function (data) {
    WechatDialog_disposed = true
  })
})()}

/* harmony default export */ var views_dialog_WechatDialog = (WechatDialog_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/dialog/AboutDialog.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var AboutDialog = ({
  name: "AboutDialog",
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8f2e1d30","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/dialog/AboutDialog.vue
var AboutDialog_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "mx-auto" },
    [
      _c("v-card-text", [
        _c("div", { staticClass: "overline mb-4" }, [
          _vm._v(_vm._s(_vm.$t("renderer.dialog.about.title")))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "headline mb-1" }, [
          _vm._v("CaptfEncoder V2")
        ]),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.$t("renderer.dialog.about.desc")))]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "my-3" },
          [
            _c(
              "v-row",
              { attrs: { "no-gutters": "" } },
              [
                _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                  _vm._v(
                    " " + _vm._s(_vm.$t("renderer.dialog.about.version")) + " "
                  )
                ]),
                _vm._v(" "),
                _c("v-col", { attrs: { cols: "12", md: "9" } }, [
                  _vm._v(" 2.0.1 ")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-row",
              { attrs: { "no-gutters": "" } },
              [
                _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                  _vm._v(
                    " " +
                      _vm._s(_vm.$t("renderer.dialog.about.build_date")) +
                      " "
                  )
                ]),
                _vm._v(" "),
                _c("v-col", { attrs: { cols: "12", md: "9" } }, [
                  _vm._v(" 2021-04-14 ")
                ])
              ],
              1
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var AboutDialog_staticRenderFns = []
AboutDialog_render._withStripped = true
var AboutDialog_esExports = { render: AboutDialog_render, staticRenderFns: AboutDialog_staticRenderFns }
/* harmony default export */ var dialog_AboutDialog = (AboutDialog_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8f2e1d30", AboutDialog_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/dialog/AboutDialog.vue
var AboutDialog_disposed = false
function AboutDialog_injectStyle (ssrContext) {
  if (AboutDialog_disposed) return
  __webpack_require__("Cy2w")
}
var AboutDialog_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var AboutDialog___vue_template_functional__ = false
/* styles */
var AboutDialog___vue_styles__ = AboutDialog_injectStyle
/* scopeId */
var AboutDialog___vue_scopeId__ = "data-v-8f2e1d30"
/* moduleIdentifier (server only) */
var AboutDialog___vue_module_identifier__ = null
var AboutDialog_Component = AboutDialog_normalizeComponent(
  AboutDialog,
  dialog_AboutDialog,
  AboutDialog___vue_template_functional__,
  AboutDialog___vue_styles__,
  AboutDialog___vue_scopeId__,
  AboutDialog___vue_module_identifier__
)
AboutDialog_Component.options.__file = "src/views/dialog/AboutDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8f2e1d30", AboutDialog_Component.options)
  } else {
    hotAPI.reload("data-v-8f2e1d30", AboutDialog_Component.options)
  }
  module.hot.dispose(function (data) {
    AboutDialog_disposed = true
  })
})()}

/* harmony default export */ var views_dialog_AboutDialog = (AboutDialog_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/dialog/CheckUpdateDialog .vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var CheckUpdateDialog_ = ({
  name: "CheckUpdateDialog",
  data: function data() {
    return {
      loading: false,
      needUpdate: false,
      localVersion: "",
      message: "",
      updateUrl: ""
    };
  },
  mounted: function mounted() {
    var _this = this;

    return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var result;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loading = true;
              _context.next = 3;
              return _this.$checkUpdate();

            case 3:
              result = _context.sent;


              if (result && result.needUpdate) {
                _this.needUpdate = true;
                _this.localVersion = result.localVersion;
                _this.message = _this.$t("renderer.dialog.check_update.new_version") + result.serverVersion;
                _this.updateUrl = result.updateUrl;
              } else {
                _this.needUpdate = false;
                _this.localVersion = result.localVersion;
                _this.message = _this.$t("renderer.dialog.check_update.no_updates");
              }
              _this.loading = false;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },


  methods: {
    download: function download() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder");
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5e2b0f44","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/dialog/CheckUpdateDialog .vue
var CheckUpdateDialog__render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "mx-auto", attrs: { "min-width": "360" } },
    [
      _c(
        "v-card-text",
        [
          _c("ext-loading", { attrs: { absolute: "", show: _vm.loading } }),
          _vm._v(" "),
          _c("div", { staticClass: "overline mb-4" }, [
            _vm._v(_vm._s(_vm.$t("renderer.dialog.check_update.title")))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "headline mb-1" }, [
            _vm._v("CaptfEncoder V2")
          ]),
          _vm._v(" "),
          _c("div", [_vm._v(_vm._s(_vm.$t("renderer.dialog.about.version")))]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "v-row",
                { staticClass: "my-4", attrs: { "no-gutters": "" } },
                [
                  _c("v-col", { attrs: { cols: "12", md: "4" } }, [
                    _vm._v(
                      " " +
                        _vm._s(
                          _vm.$t("renderer.dialog.check_update.current_version")
                        ) +
                        " "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-col", { attrs: { cols: "12", md: "8" } }, [
                    _vm._v(" " + _vm._s(_vm.localVersion))
                  ])
                ],
                1
              ),
              _vm._v(" "),
              !_vm.needUpdate
                ? _c(
                    "v-row",
                    { staticClass: "my-4", attrs: { "no-gutters": "" } },
                    [
                      _c("v-col", { attrs: { cols: "12" } }, [
                        _vm._v(" " + _vm._s(_vm.message))
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.needUpdate
                ? _c(
                    "v-row",
                    { staticClass: "my-4", attrs: { "no-gutters": "" } },
                    [
                      _c("v-col", { attrs: { cols: "12", md: "6" } }, [
                        _vm._v(" " + _vm._s(_vm.message) + " ")
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "6" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-1",
                              attrs: { plain: "" },
                              on: { click: _vm.download }
                            },
                            [
                              _vm._v(
                                " " +
                                  _vm._s(
                                    _vm.$t(
                                      "renderer.dialog.check_update.download"
                                    )
                                  ) +
                                  " "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var CheckUpdateDialog__staticRenderFns = []
CheckUpdateDialog__render._withStripped = true
var CheckUpdateDialog__esExports = { render: CheckUpdateDialog__render, staticRenderFns: CheckUpdateDialog__staticRenderFns }
/* harmony default export */ var dialog_CheckUpdateDialog_ = (CheckUpdateDialog__esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5e2b0f44", CheckUpdateDialog__esExports)
  }
}
// CONCATENATED MODULE: ./src/views/dialog/CheckUpdateDialog .vue
var CheckUpdateDialog__disposed = false
function CheckUpdateDialog__injectStyle (ssrContext) {
  if (CheckUpdateDialog__disposed) return
  __webpack_require__("lrR8")
}
var CheckUpdateDialog__normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var CheckUpdateDialog____vue_template_functional__ = false
/* styles */
var CheckUpdateDialog____vue_styles__ = CheckUpdateDialog__injectStyle
/* scopeId */
var CheckUpdateDialog____vue_scopeId__ = "data-v-5e2b0f44"
/* moduleIdentifier (server only) */
var CheckUpdateDialog____vue_module_identifier__ = null
var CheckUpdateDialog__Component = CheckUpdateDialog__normalizeComponent(
  CheckUpdateDialog_,
  dialog_CheckUpdateDialog_,
  CheckUpdateDialog____vue_template_functional__,
  CheckUpdateDialog____vue_styles__,
  CheckUpdateDialog____vue_scopeId__,
  CheckUpdateDialog____vue_module_identifier__
)
CheckUpdateDialog__Component.options.__file = "src/views/dialog/CheckUpdateDialog .vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e2b0f44", CheckUpdateDialog__Component.options)
  } else {
    hotAPI.reload("data-v-5e2b0f44", CheckUpdateDialog__Component.options)
  }
  module.hot.dispose(function (data) {
    CheckUpdateDialog__disposed = true
  })
})()}

/* harmony default export */ var views_dialog_CheckUpdateDialog_ = (CheckUpdateDialog__Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/layout/Layout.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _ = __webpack_require__("M4fF");










/* harmony default export */ var Layout = ({
  name: "Layout",

  components: {
    Navigation: views_navigation_Navigation,
    ThemePicker: views_theme_picker_ThemePicker,
    LanguagePicker: views_language_picker_LanguagePicker,
    Search: views_search_Search,
    WechatDialog: views_dialog_WechatDialog,
    AboutDialog: views_dialog_AboutDialog,
    CheckUpdateDialog: views_dialog_CheckUpdateDialog_
  },

  props: {
    mode: String
  },

  data: function data() {
    return {
      homeRoute: {
        name: "ext.app.home",
        path: "/extensions/ext.app.home/",
        title: "Home",
        titles: {
          zh: "首页"
        }
      },

      appBarShow: true,
      navShow: true,
      navColor: "primary",
      updateDialogShow: false,
      wechatDialogShow: false,
      aboutDialog: false,

      tabList: [],

      tabMenuShow: false,
      tabMenuPositionX: 0,
      tabMenuPositionY: 0,
      tabMenuTargetIndex: -1,

      fullscreenIcon: "mdi-fullscreen",

      themePickerShow: false,
      languagePickerShow: false
    };
  },
  created: function created() {
    var index = _.findIndex(this.tabList, function (item) {
      return item.name == this.homeRoute.name;
    });

    if (this.mode === "normal" && index < 0) {
      this.tabList.push(this.homeRoute);
    }
  },
  mounted: function mounted() {},


  computed: extends_default()({}, Object(vuex_esm["c" /* mapGetters */])(["window", "snackbar"])),

  watch: {
    $route: function $route(to) {
      var index = _.findIndex(this.tabList, function (item) {
        return item.name == to.name;
      });

      if (index < 0) {
        this.tabList.push({
          name: to.name,
          path: to.path,
          title: to.meta.title,
          titles: to.meta.titles

        });
      }
    }
  },

  methods: extends_default()({}, Object(vuex_esm["b" /* mapActions */])(["hideSnackbar"]), {
    maximizeWindow: function maximizeWindow() {
      this.$store.dispatch("maximizeWindow");
    },
    unmaximizeWindow: function unmaximizeWindow() {
      this.$store.dispatch("unmaximizeWindow");
    },
    minimizeWindow: function minimizeWindow() {
      this.$minimizeWindow();
    },
    closeWindow: function closeWindow() {
      this.$closeWindow();
    },
    fullscreen: function fullscreen() {
      this.fullscreenIcon = screenfull_default.a.isFullscreen ? "mdi-fullscreen" : "mdi-fullscreen-exit";
      screenfull_default.a.toggle();
    },
    openSite: function openSite() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder");
    },
    openWechat: function openWechat() {
      this.wechatDialogShow = true;
    },
    openIssues: function openIssues() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder/issues");
    },
    openExtensionsFolder: function openExtensionsFolder() {
      this.$openExtensionsFolder();
    },
    checkUpdate: function checkUpdate() {
      var _this = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.updateDialogShow = true;

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    openAbout: function openAbout() {
      this.aboutDialog = true;
    },
    showMenu: function showMenu(e) {
      var _this2 = this;

      e.preventDefault();
      this.tabMenuTargetIndex = e.target.name;
      this.tabMenuShow = false;
      this.tabMenuPositionX = e.clientX;
      this.tabMenuPositionY = e.clientY;
      this.$nextTick(function () {
        _this2.tabMenuShow = true;
      });
    },
    createWindow: function createWindow(index) {
      var title = this.tabList[index].title;
      var hash = this.tabList[index].path;
      var query = { layout: "simple" };

      this.$createWindow(title, hash, query);
    },
    closeTab: function closeTab(index) {
      this.tabList.splice(index, 1);

      if (index <= this.tabList.length - 1) {
        this.$router.push(this.tabList[index].path);
      } else {
        this.$router.push(this.tabList[index - 1].path);
      }
    },
    closeOther: function closeOther(index) {
      var _this3 = this;

      var tab = this.tabList[index];

      _.remove(this.tabList, function (item) {
        return !(item.name === _this3.homeRoute.name || item.name === tab.name);
      });
    },
    closeAll: function closeAll() {
      var _this4 = this;

      _.remove(this.tabList, function (item) {
        return !(item.name === _this4.homeRoute.name);
      });

      this.$router.push(this.homeRoute.path);
    }
  })
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-60f35ab6","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/layout/Layout.vue
var Layout_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-system-bar",
        {
          staticClass: "title-bar",
          attrs: {
            height: _vm.mode === "normal" ? 24 : 36,
            color: "primary",
            dark: "",
            app: ""
          }
        },
        [
          _vm.mode !== "normal"
            ? _c("span", { staticClass: ".subtitle-1 font-weight-bold" }, [
                _vm._v("CaptfEncoder V2")
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-icon",
            { staticClass: "mx-3", on: { click: _vm.minimizeWindow } },
            [_vm._v("mdi-window-minimize")]
          ),
          _vm._v(" "),
          !_vm.window.maximized
            ? _c(
                "v-icon",
                { staticClass: "mx-3", on: { click: _vm.maximizeWindow } },
                [_vm._v("mdi-window-maximize")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.window.maximized
            ? _c(
                "v-icon",
                { staticClass: "mx-3", on: { click: _vm.unmaximizeWindow } },
                [_vm._v("mdi-window-restore")]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-icon",
            { staticClass: "mx-3", on: { click: _vm.closeWindow } },
            [_vm._v("mdi-close")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.mode === "normal" && _vm.appBarShow === true
        ? _c(
            "v-app-bar",
            {
              attrs: {
                height: "64",
                color: "primary",
                dark: "",
                "clipped-left": "",
                app: ""
              }
            },
            [
              _c(
                "v-toolbar-title",
                [
                  _c(
                    "v-avatar",
                    { attrs: { tile: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { text: "" },
                          on: {
                            click: function($event) {
                              _vm.navShow = !_vm.navShow
                            }
                          }
                        },
                        [_c("v-icon", [_vm._v("mdi-menu")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("span", { staticClass: "title font-weight-bold" }, [
                    _vm._v("CaptfEncoder V2")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-toolbar-items",
                [
                  _c(
                    "v-form",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "v-row",
                            { attrs: { dense: "" } },
                            [_c("v-col", [_c("Search")], 1)],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "d-md-flex d-none",
                      attrs: { text: "" },
                      on: { click: _vm.fullscreen }
                    },
                    [
                      _c("v-icon", {
                        domProps: { textContent: _vm._s(_vm.fullscreenIcon) }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "d-md-flex d-none",
                      attrs: { text: "" },
                      on: { click: _vm.openSite }
                    },
                    [_c("v-icon", [_vm._v("mdi-github")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "d-md-flex d-none",
                      attrs: { text: "" },
                      on: { click: _vm.openWechat }
                    },
                    [_c("v-icon", [_vm._v("mdi-wechat")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-menu",
                    {
                      attrs: { "offset-y": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on
                              var attrs = ref.attrs
                              return [
                                _c(
                                  "v-btn",
                                  _vm._g(
                                    _vm._b(
                                      { attrs: { text: "" } },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [_c("v-icon", [_vm._v("mdi-more")])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        2418420454
                      )
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "v-list",
                        { staticClass: "menu-more-list" },
                        [
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.themePickerShow = !_vm.themePickerShow
                                }
                              }
                            },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-palette")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("renderer.appbar.menu.theme")
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            {
                              on: {
                                click: function($event) {
                                  _vm.languagePickerShow = !_vm.languagePickerShow
                                }
                              }
                            },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-note-text")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("renderer.appbar.menu.language")
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-divider"),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            { on: { click: _vm.openExtensionsFolder } },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-apps")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("renderer.appbar.menu.extension")
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-divider"),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            { on: { click: _vm.openSite } },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-github")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          "renderer.appbar.menu.support_site"
                                        )
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            { on: { click: _vm.openIssues } },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-chat-question")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          "renderer.appbar.menu.new_issuse"
                                        )
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            { on: { click: _vm.checkUpdate } },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-cloud-check")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t(
                                          "renderer.appbar.menu.check_update"
                                        )
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-divider"),
                          _vm._v(" "),
                          _c(
                            "v-list-item",
                            { on: { click: _vm.openAbout } },
                            [
                              _c(
                                "v-list-item-icon",
                                [_c("v-icon", [_vm._v("mdi-alpha-a-circle")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c("v-list-item-title", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$t("renderer.appbar.menu.about")
                                      )
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.mode === "normal" && _vm.navShow === true
        ? _c("Navigation", { attrs: { color: _vm.navColor } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-main",
        { staticClass: "divder pb-12" },
        [
          _c(
            "v-expand-transition",
            [
              _c(
                "v-tabs",
                {
                  staticStyle: { position: "sticky", "z-index": "5" },
                  style: { top: _vm.mode === "normal" ? 88 + "px" : 24 + "px" },
                  attrs: { color: "secondary", "show-arrows": "" }
                },
                _vm._l(_vm.tabList, function(item, i) {
                  return _c(
                    "v-tab",
                    {
                      key: item.name,
                      attrs: { name: i, to: item.path },
                      on: { contextmenu: _vm.showMenu }
                    },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.$getItemLocaleTitle(item)) +
                          "\n          "
                      ),
                      i !== 0
                        ? _c(
                            "v-icon",
                            {
                              attrs: { size: "20" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  $event.preventDefault()
                                  return _vm.closeTab(i)
                                },
                                contextmenu: function($event) {
                                  $event.stopPropagation()
                                  $event.preventDefault()
                                }
                              }
                            },
                            [_vm._v("mdi-close")]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.mode === "normal"
            ? _c(
                "v-menu",
                {
                  attrs: {
                    "position-x": _vm.tabMenuPositionX,
                    "position-y": _vm.tabMenuPositionY,
                    absolute: "",
                    "offset-y": "",
                    "min-width": "110"
                  },
                  model: {
                    value: _vm.tabMenuShow,
                    callback: function($$v) {
                      _vm.tabMenuShow = $$v
                    },
                    expression: "tabMenuShow"
                  }
                },
                [
                  _c(
                    "v-list",
                    { attrs: { dense: "" } },
                    [
                      _c(
                        "v-list-item",
                        {
                          directives: [
                            {
                              name: "ripple",
                              rawName: "v-ripple",
                              value: { class: "secondary--text" },
                              expression: "{ class: 'secondary--text' }"
                            }
                          ],
                          on: {
                            click: function($event) {
                              return _vm.createWindow(_vm.tabMenuTargetIndex)
                            }
                          }
                        },
                        [
                          _c("v-list-item-title", [
                            _vm._v(
                              _vm._s(
                                _vm.$t("renderer.tab.menu.open_in_new_window")
                              )
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item",
                        {
                          directives: [
                            {
                              name: "ripple",
                              rawName: "v-ripple",
                              value: { class: "secondary--text" },
                              expression: "{ class: 'secondary--text' }"
                            }
                          ],
                          on: {
                            click: function($event) {
                              return _vm.closeTab(_vm.tabMenuTargetIndex)
                            }
                          }
                        },
                        [
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(_vm.$t("renderer.tab.menu.close")))
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item",
                        {
                          directives: [
                            {
                              name: "ripple",
                              rawName: "v-ripple",
                              value: { class: "secondary--text" },
                              expression: "{ class: 'secondary--text' }"
                            }
                          ],
                          on: {
                            click: function($event) {
                              return _vm.closeOther(_vm.tabMenuTargetIndex)
                            }
                          }
                        },
                        [
                          _c("v-list-item-title", [
                            _vm._v(
                              _vm._s(_vm.$t("renderer.tab.menu.close_other"))
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item",
                        {
                          directives: [
                            {
                              name: "ripple",
                              rawName: "v-ripple",
                              value: { class: "secondary--text" },
                              expression: "{ class: 'secondary--text' }"
                            }
                          ],
                          on: { click: _vm.closeAll }
                        },
                        [
                          _c("v-list-item-title", [
                            _vm._v(
                              _vm._s(_vm.$t("renderer.tab.menu.close_all"))
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-container",
            {
              staticClass: "tab-content-container",
              attrs: { fluid: "", "fill-height": "" }
            },
            [_c("keep-alive", [_c("router-view")], 1)],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: {
            width: "640",
            "overlay-opacity": "0",
            floating: "",
            temporary: "",
            right: "",
            app: ""
          },
          model: {
            value: _vm.themePickerShow,
            callback: function($$v) {
              _vm.themePickerShow = $$v
            },
            expression: "themePickerShow"
          }
        },
        [_c("ThemePicker")],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: {
            width: "240",
            "overlay-opacity": "0",
            floating: "",
            temporary: "",
            right: "",
            app: ""
          },
          model: {
            value: _vm.languagePickerShow,
            callback: function($$v) {
              _vm.languagePickerShow = $$v
            },
            expression: "languagePickerShow"
          }
        },
        [_c("LanguagePicker")],
        1
      ),
      _vm._v(" "),
      _c(
        "v-snackbar",
        {
          staticClass: "snackbar",
          attrs: {
            color: _vm.snackbar.color,
            timeout: _vm.snackbar.timeout || 6000,
            vertical: "",
            "multi-line": ""
          },
          scopedSlots: _vm._u([
            {
              key: "action",
              fn: function(ref) {
                var attrs = ref.attrs
                return [
                  _c(
                    "v-btn",
                    _vm._b(
                      {
                        attrs: { color: "error", text: "" },
                        on: { click: _vm.hideSnackbar }
                      },
                      "v-btn",
                      attrs,
                      false
                    ),
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(_vm.$t("renderer.snackbar.button.close")) +
                          "\n      "
                      )
                    ]
                  )
                ]
              }
            }
          ]),
          model: {
            value: _vm.snackbar.show,
            callback: function($$v) {
              _vm.$set(_vm.snackbar, "show", $$v)
            },
            expression: "snackbar.show"
          }
        },
        [_vm._v("\n    " + _vm._s(_vm.snackbar.text) + "\n    ")]
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "400" },
          model: {
            value: _vm.updateDialogShow,
            callback: function($$v) {
              _vm.updateDialogShow = $$v
            },
            expression: "updateDialogShow"
          }
        },
        [_c("CheckUpdateDialog")],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "400" },
          model: {
            value: _vm.wechatDialogShow,
            callback: function($$v) {
              _vm.wechatDialogShow = $$v
            },
            expression: "wechatDialogShow"
          }
        },
        [_c("WechatDialog")],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "400" },
          model: {
            value: _vm.aboutDialog,
            callback: function($$v) {
              _vm.aboutDialog = $$v
            },
            expression: "aboutDialog"
          }
        },
        [_c("AboutDialog")],
        1
      )
    ],
    1
  )
}
var Layout_staticRenderFns = []
Layout_render._withStripped = true
var Layout_esExports = { render: Layout_render, staticRenderFns: Layout_staticRenderFns }
/* harmony default export */ var layout_Layout = (Layout_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60f35ab6", Layout_esExports)
  }
}
// CONCATENATED MODULE: ./src/views/layout/Layout.vue
var Layout_disposed = false
function Layout_injectStyle (ssrContext) {
  if (Layout_disposed) return
  __webpack_require__("2oWE")
}
var Layout_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Layout___vue_template_functional__ = false
/* styles */
var Layout___vue_styles__ = Layout_injectStyle
/* scopeId */
var Layout___vue_scopeId__ = "data-v-60f35ab6"
/* moduleIdentifier (server only) */
var Layout___vue_module_identifier__ = null
var Layout_Component = Layout_normalizeComponent(
  Layout,
  layout_Layout,
  Layout___vue_template_functional__,
  Layout___vue_styles__,
  Layout___vue_scopeId__,
  Layout___vue_module_identifier__
)
Layout_Component.options.__file = "src/views/layout/Layout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60f35ab6", Layout_Component.options)
  } else {
    hotAPI.reload("data-v-60f35ab6", Layout_Component.options)
  }
  module.hot.dispose(function (data) {
    Layout_disposed = true
  })
})()}

/* harmony default export */ var views_layout_Layout = (Layout_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue


var _name$components$data;

//
//
//
//
//
//



var querystring = __webpack_require__("IIel");

/* harmony default export */ var App = (_name$components$data = {
  name: "App",

  components: {
    Layout: views_layout_Layout
  },

  data: function data() {
    return {
      layoutMode: "normal"
    };
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {
    var _this = this;

    var query = querystring.parse(global.location.search);

    this.layoutMode = query["?layoutMode"];

    this.$store.dispatch("loadConfiguration").then(function () {
      _this.$initLocale();

      _this.$setTheme();
      _this.$setThemeDark();
    });
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {}
}, defineProperty_default()(_name$components$data, "beforeDestroy", function beforeDestroy() {}), defineProperty_default()(_name$components$data, "destroyed", function destroyed() {}), defineProperty_default()(_name$components$data, "computed", {}), defineProperty_default()(_name$components$data, "watch", {}), defineProperty_default()(_name$components$data, "methods", {}), _name$components$data);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7ba5bd90","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var App_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("layout", { attrs: { mode: _vm.layoutMode } })], 1)
}
var App_staticRenderFns = []
App_render._withStripped = true
var App_esExports = { render: App_render, staticRenderFns: App_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (App_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7ba5bd90", App_esExports)
  }
}
// CONCATENATED MODULE: ./src/App.vue
var App_disposed = false
function App_injectStyle (ssrContext) {
  if (App_disposed) return
  __webpack_require__("xhze")
}
var App_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var App___vue_template_functional__ = false
/* styles */
var App___vue_styles__ = App_injectStyle
/* scopeId */
var App___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var App___vue_module_identifier__ = null
var App_Component = App_normalizeComponent(
  App,
  selectortype_template_index_0_src_App,
  App___vue_template_functional__,
  App___vue_styles__,
  App___vue_scopeId__,
  App___vue_module_identifier__
)
App_Component.options.__file = "src/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ba5bd90", App_Component.options)
  } else {
    hotAPI.reload("data-v-7ba5bd90", App_Component.options)
  }
  module.hot.dispose(function (data) {
    App_disposed = true
  })
})()}

/* harmony default export */ var src_App = (App_Component.exports);

// CONCATENATED MODULE: ./src/store/snackbar.js


var state = {
    // 全局消息条
    snackbar: {
        show: false,
        timeout: 6000,
        color: 'grey darken-4',
        text: ''
    }
};

var getters = {
    snackbar: function snackbar(state) {
        return state.snackbar;
    }
};

var mutations = {
    showSnackbar: function showSnackbar(state, obj) {
        state.snackbar.text = obj;
        state.snackbar.show = true;
    },
    hideSnackbar: function hideSnackbar(state) {
        state.snackbar.show = false;
    }
};

var actions = {
    showSnackbar: function showSnackbar(_ref, obj) {
        var _this = this;

        var commit = _ref.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
            return regenerator_default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            commit('showSnackbar', obj);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    hideSnackbar: function hideSnackbar(_ref2) {
        var _this2 = this;

        var commit = _ref2.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
            return regenerator_default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            commit('hideSnackbar');

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};

/* harmony default export */ var snackbar = ({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/map.js
var map = __webpack_require__("ifoU");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// CONCATENATED MODULE: ./src/store/extensions.js




var _require = __webpack_require__("G4Vi"),
    ipcRenderer = _require.ipcRenderer;

var extensions_state = {
    extensions: {},

    navItems: []
};

var extensions_getters = {
    extensions: function extensions(state) {
        return state.extensions;
    },
    navItems: function navItems(state) {
        return state.navItems;
    }
};

var extensions_mutations = {
    setExtensions: function setExtensions(state, obj) {
        state.extensions = obj;
    },
    setNavItems: function setNavItems(state, obj) {
        state.navItems = obj;
    }
};

var extensions_actions = {
    loadExtensions: function loadExtensions(_ref) {
        var _this = this;

        var commit = _ref.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
            var extensions, navItems, catalogLocator, catalogs, i, item, newCatalogKey, newName;
            return regenerator_default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            extensions = [];
                            navItems = [];
                            catalogLocator = new map_default.a();
                            catalogs = [];
                            _context.next = 6;
                            return ipcRenderer.invoke('ext.mgr.get_extensions');

                        case 6:
                            extensions = _context.sent;


                            extensions.catalogs.forEach(function (item) {
                                var index = catalogs.findIndex(function (i) {
                                    return i.text === item.text;
                                });

                                if (index < 0) {
                                    var catalog = {
                                        name: item.key,
                                        text: item.text
                                    };

                                    catalogs.push(catalog);

                                    index = catalogs.length - 1;

                                    navItems.push({
                                        name: item.key,
                                        title: item.text,
                                        titles: item.text_lang,
                                        items: []
                                    });
                                }

                                catalogLocator.set(item.key, index);
                            });

                            for (i = 0; i < extensions.items.length; i++) {
                                item = extensions.items[i];


                                item.title = item.description ? item.description : 'Untitled-' + (index + 1);

                                if (item.description_lang) {
                                    item.titles = item.description_lang;
                                }

                                delete item['description'];
                                delete item['description_lang'];

                                if (item.catalog && catalogLocator.get(item.catalog) != null) {
                                    newCatalogKey = catalogs[catalogLocator.get(item.catalog)].name;
                                    newName = item.name.substring(item.name.lastIndexOf('.') + 1);

                                    item.path = '/extensions/' + newCatalogKey + '.' + newName;
                                } else {
                                    item.path = '/extensions/' + item.name;
                                }
                            }

                            commit('setExtensions', extensions);

                            extensions.items.forEach(function (item, index) {
                                if (item.catalog && catalogLocator.get(item.catalog) != null) {

                                    navItems[catalogLocator.get(item.catalog)].items.push({
                                        name: item.name,
                                        title: item.title,
                                        titles: item.titles,
                                        path: item.path
                                    });
                                }
                            });

                            commit('setNavItems', navItems);

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};

/* harmony default export */ var store_extensions = ({
    state: extensions_state,
    getters: extensions_getters,
    mutations: extensions_mutations,
    actions: extensions_actions
});
// CONCATENATED MODULE: ./src/store/config.js



var config__require = __webpack_require__("G4Vi"),
    config_ipcRenderer = config__require.ipcRenderer;

var navigatorLanguage = (navigator.language || navigator.userLanguage).substr(0, 2);

var config_state = {
    locale: navigatorLanguage,
    theme: {},

    languages: {},
    themes: []
};

var config_getters = {
    locale: function locale(state) {
        return state.locale;
    },
    theme: function theme(state) {
        return state.theme;
    },

    languages: function languages(state) {
        return state.languages;
    },
    themes: function themes(state) {
        return state.themes;
    }
};

var config_mutations = {
    setConfiguration: function setConfiguration(state, obj) {
        if (obj) {

            state.locale = obj.locale;

            state.theme = obj.ui.theme;

            state.languages = obj.languages;

            state.themes = obj.themes;
        }
    },
    setLocale: function setLocale(state, obj) {
        if (obj) {
            state.locale = obj;
        }
    },
    setTheme: function setTheme(state, obj) {
        if (obj) {
            state.theme.name = obj;
        }
    },
    setThemeDark: function setThemeDark(state, obj) {
        state.theme.dark = obj;
    }
};

var config_actions = {
    loadConfiguration: function loadConfiguration(_ref) {
        var _this = this;

        var commit = _ref.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
            var configuration;
            return regenerator_default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return config_ipcRenderer.invoke('cfg.mgr.getAll');

                        case 2:
                            configuration = _context.sent;


                            commit('setConfiguration', configuration);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    setLocale: function setLocale(_ref2, obj) {
        var _this2 = this;

        var commit = _ref2.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
            return regenerator_default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!obj) {
                                _context2.next = 4;
                                break;
                            }

                            _context2.next = 3;
                            return config_ipcRenderer.invoke('cfg.mgr.set', 'locale', obj);

                        case 3:

                            commit('setLocale', obj);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    setTheme: function setTheme(_ref3, obj) {
        var _this3 = this;

        var commit = _ref3.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
            return regenerator_default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!obj) {
                                _context3.next = 4;
                                break;
                            }

                            _context3.next = 3;
                            return config_ipcRenderer.invoke('cfg.mgr.set', 'ui.theme.name', obj);

                        case 3:

                            commit('setTheme', obj);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    setThemeDark: function setThemeDark(_ref4, obj) {
        var _this4 = this;

        var commit = _ref4.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
            return regenerator_default.a.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return config_ipcRenderer.invoke('cfg.mgr.set', 'ui.theme.dark', obj);

                        case 2:

                            commit('setThemeDark', obj);

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    }
};

/* harmony default export */ var config = ({
    state: config_state,
    getters: config_getters,
    mutations: config_mutations,
    actions: config_actions
});
// CONCATENATED MODULE: ./src/store/window.js



var window__require = __webpack_require__("G4Vi"),
    window_ipcRenderer = window__require.ipcRenderer;

var window_state = {
    window: {
        maximized: false

    }

};

var window_getters = {
    window: function window(state) {
        return state.window;
    }
};

var window_mutations = {
    setMaximize: function setMaximize(state, obj) {
        state.window.maximized = obj;
    }
};

var window_actions = {
    maximizeWindow: function maximizeWindow(_ref) {
        var _this = this;

        var commit = _ref.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
            var result;
            return regenerator_default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return window_ipcRenderer.invoke('win.mgr.maximize_window');

                        case 2:
                            result = _context.sent;


                            if (result) {
                                commit('setMaximize', true);
                            }

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    unmaximizeWindow: function unmaximizeWindow(_ref2) {
        var _this2 = this;

        var commit = _ref2.commit;
        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
            var result;
            return regenerator_default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return window_ipcRenderer.invoke('win.mgr.unmaximize_window');

                        case 2:
                            result = _context2.sent;


                            if (result) {
                                commit('setMaximize', false);
                            }

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};

/* harmony default export */ var store_window = ({
    state: window_state,
    getters: window_getters,
    mutations: window_mutations,
    actions: window_actions
});
// CONCATENATED MODULE: ./src/store/index.js








vue_esm["default"].use(vuex_esm["a" /* default */]);

var store = new vuex_esm["a" /* default */].Store({
    modules: {
        snackbar: snackbar,
        extensions: store_extensions,
        config: config,
        window: store_window
    }
});

/* harmony default export */ var src_store = (store);
// EXTERNAL MODULE: ./src/router/index.js
var router = __webpack_require__("YaEn");

// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.js
var vuetify = __webpack_require__("3EgV");
var vuetify_default = /*#__PURE__*/__webpack_require__.n(vuetify);

// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.min.css
var vuetify_min = __webpack_require__("7zck");
var vuetify_min_default = /*#__PURE__*/__webpack_require__.n(vuetify_min);

// CONCATENATED MODULE: ./src/plugins/vuetify.js




vue_esm["default"].use(vuetify_default.a);

var opts = {};

/* harmony default export */ var plugins_vuetify = (new vuetify_default.a({
    icons: {
        iconfont: 'mdi'
    }
}));
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: external "electron"
var external__electron_ = __webpack_require__("G4Vi");
var external__electron__default = /*#__PURE__*/__webpack_require__.n(external__electron_);

// EXTERNAL MODULE: ./node_modules/url-parse/index.js
var url_parse = __webpack_require__("dyOy");
var url_parse_default = /*#__PURE__*/__webpack_require__.n(url_parse);

// CONCATENATED MODULE: ./src/plugins/commands.js









var CommandsPlugin = {
  install: function install(Vue, options) {
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

    Vue.prototype.$createWindow = function () {
      var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(title, hash, query) {
        var result;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return external__electron_["ipcRenderer"].invoke('win.mgr.create_window', title, hash, query);

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    Vue.prototype.$minimizeWindow = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
      var result;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return external__electron_["ipcRenderer"].invoke('win.mgr.minimize_window');

            case 2:
              result = _context2.sent;
              return _context2.abrupt('return', result);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    Vue.prototype.$closeWindow = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
      var result;
      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return external__electron_["ipcRenderer"].invoke('win.mgr.close_window');

            case 2:
              result = _context3.sent;
              return _context3.abrupt('return', result);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    Vue.prototype.$openFile = function () {
      var _ref4 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4(dialogTitle, dialogFilters) {
        var options, result;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = {};


                if (dialogTitle) {
                  options.title = dialogTitle;
                }

                if (dialogFilters) {
                  options.filters = dialogFilters;
                }

                _context4.next = 5;
                return external__electron_["ipcRenderer"].invoke('dlg.mgr.open_file', options);

              case 5:
                result = _context4.sent;
                return _context4.abrupt('return', result);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }();

    Vue.prototype.$openTextFile = function () {
      var _ref5 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee5(dialogTitle, dialogFilters) {
        var options, result;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = {};


                if (dialogTitle) {
                  options.title = dialogTitle;
                }

                if (dialogFilters) {
                  options.filters = dialogFilters;
                }

                _context5.next = 5;
                return external__electron_["ipcRenderer"].invoke('dlg.mgr.open_file', options);

              case 5:
                result = _context5.sent;


                if (result && result.data) {
                  result.data = String.fromCharCode.apply(null, result.data);
                }

                return _context5.abrupt('return', result);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }();

    Vue.prototype.$openImageFile = function () {
      var _ref6 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee6(dialogTitle, dialogFilters) {
        var options, result;
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = {};


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

                _context6.next = 5;
                return external__electron_["ipcRenderer"].invoke('dlg.mgr.open_file', options);

              case 5:
                result = _context6.sent;
                return _context6.abrupt('return', result);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x8, _x9) {
        return _ref6.apply(this, arguments);
      };
    }();

    Vue.prototype.$saveFile = function () {
      var _ref7 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee7(data, dialogTitle, dialogFilters) {
        var options, result;
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                options = {};


                if (dialogTitle) {
                  options.title = dialogTitle;
                }

                if (dialogFilters) {
                  options.filters = dialogFilters;
                }

                _context7.next = 5;
                return external__electron_["ipcRenderer"].invoke('dlg.mgr.save_file', data, options);

              case 5:
                result = _context7.sent;
                return _context7.abrupt('return', result);

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }();

    Vue.prototype.$saveImageFile = function () {
      var _ref8 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee8(data, extension, dialogTitle) {
        var options, result;
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = {};


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

                _context8.next = 7;
                return external__electron_["ipcRenderer"].invoke('dlg.mgr.save_file', data, options);

              case 7:
                result = _context8.sent;
                return _context8.abrupt('return', result);

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x13, _x14, _x15) {
        return _ref8.apply(this, arguments);
      };
    }();

    Vue.prototype.$copyToClipboard = function (text) {
      external__electron_["clipboard"].writeText(text);

      return true;
    };

    Vue.prototype.$pasteFromClipboard = function () {
      var text = external__electron_["clipboard"].readText();

      return text;
    };

    Vue.prototype.$getExtensionsFolder = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee9() {
      var folder;
      return regenerator_default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return external__electron_["ipcRenderer"].invoke('ext.mgr.get_extension_folder');

            case 2:
              folder = _context9.sent;
              return _context9.abrupt('return', folder);

            case 4:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    Vue.prototype.$openExternalUrl = function (url) {
      external__electron_["shell"].openExternal(url);
    };

    Vue.prototype.$openExtensionsFolder = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee10() {
      var folder;
      return regenerator_default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return external__electron_["ipcRenderer"].invoke('ext.mgr.get_extension_folder');

            case 2:
              folder = _context10.sent;


              if (folder) {
                external__electron_["shell"].showItemInFolder(folder);
              }

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    Vue.prototype.$initLocale = function () {
      var languages = this.$store.getters.languages;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = get_iterator_default()(keys_default()(languages)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          this.$i18n.setLocaleMessage(key, languages[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.$i18n.locale = this.$store.getters.locale;

      this.$setWindowLocaleTitle();
    };

    Vue.prototype.$setLocale = function (locale) {
      var languages = this.$store.getters.languages;

      if (languages[locale]) {
        this.$store.dispatch("setLocale", locale);

        this.$i18n.locale = locale;

        this.$setWindowLocaleTitle();
      }
    };

    Vue.prototype.$setTheme = function (name) {
      var _this = this;

      var theme = this.$store.getters.theme;
      var themes = this.$store.getters.themes;

      if (typeof name !== "undefined" && name !== null) {
        this.$store.dispatch('setTheme', name);
      } else {
        if (theme) {
          name = theme.name;
        }
      }

      if (name && themes) {
        themes.some(function (item) {
          if (item.name === name) {
            keys_default()(item.dark).forEach(function (i) {
              _this.$vuetify.theme.themes.dark[i] = item.dark[i];
            });
            keys_default()(item.light).forEach(function (i) {
              _this.$vuetify.theme.themes.light[i] = item.light[i];
            });

            return;
          }
        });
      }
    };

    Vue.prototype.$setThemeDark = function (dark) {
      var theme = this.$store.getters.theme;

      if (typeof dark !== "undefined" && dark !== null) {
        this.$store.dispatch('setThemeDark', dark);
      } else {
        if (theme) {
          dark = theme.dark;
        }
      }

      this.$vuetify.theme.dark = dark;
    };

    Vue.prototype.$setWindowLocaleTitle = function () {
      document.title = this.$t("renderer.window.title");
    };

    Vue.prototype.$getItemLocaleTitle = function (item) {
      var locale = this.$store.getters.locale;

      if (item.titles && item.titles[locale]) {
        return item.titles[locale];
      }

      return item.title;
    };

    Vue.prototype.$checkUpdate = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee11() {
      var result;
      return regenerator_default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return external__electron_["ipcRenderer"].invoke('upd.mgr.check_update');

            case 2:
              result = _context11.sent;
              return _context11.abrupt('return', result);

            case 4:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    Vue.prototype.$sleep = function (time) {
      return new promise_default.a(function (resolve, reject) {
        setTimeout(function () {
          return resolve('over');
        }, time);
      });
    };

    Vue.prototype.$sleep = function (time) {
      return new promise_default.a(function (resolve, reject) {
        setTimeout(function () {
          return resolve('over');
        }, time);
      });
    };

    Vue.prototype.$urlParse = function (url) {
      return url_parse_default()(url);
    };
  }
};
/* harmony default export */ var commands = (CommandsPlugin);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtFormField.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ExtFormField = ({
  name: "ext-form-field",
  props: {
    field: Object,
    value: null
  },
  data: function data() {
    var _this = this;

    return {
      localValue: this.value,

      validationRules: {
        email: [function (v) {
          return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || _this.validationErrorMessages.emailInvalid
          );
        }]
      },

      validationErrorMessages: {
        emailInvalid: "E-mail must be valid"
      }
    };
  },


  created: function created() {},

  methods: {
    onChange: function onChange() {
      this.$emit("input", this.localValue);
    },

    onInput: function onInput() {
      this.$emit("input", this.localValue);
    },

    appendPasswordIconCheckbox: function appendPasswordIconCheckbox() {
      var _this2 = this;

      return function () {
        return _this2.field.passwordVisible = !_this2.field.passwordVisible;
      };
    },
    setVal: function setVal(func) {
      this.localValue = func();

      this.$emit("input", this.localValue);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-35c64d40","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtFormField.vue
var ExtFormField_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-col",
    { attrs: { cols: "12", md: _vm.field.cols || 3 } },
    [
      _vm.field.type == "text"
        ? [
            _c("v-text-field", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            }),
            _vm._v(" "),
            _vm.field.button
              ? _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.setVal(_vm.field.button.func)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n      " +
                        _vm._s(
                          typeof _vm.field.button.text === "function"
                            ? _vm.field.button.text()
                            : _vm.field.button.text
                        ) +
                        "\n    "
                    )
                  ]
                )
              : _vm._e()
          ]
        : _vm.field.type == "number"
        ? [
            _c("v-text-field", {
              attrs: {
                type: "number",
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            })
          ]
        : _vm.field.type == "textarea"
        ? [
            _c("v-textarea", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder,
                rows: "3"
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            }),
            _vm._v(" "),
            _vm.field.button
              ? _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.setVal(_vm.field.button.func)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n      " +
                        _vm._s(
                          typeof _vm.field.button.text === "function"
                            ? _vm.field.button.text()
                            : _vm.field.button.text
                        ) +
                        "\n    "
                    )
                  ]
                )
              : _vm._e()
          ]
        : _vm.field.type == "email"
        ? [
            _c("v-text-field", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder,
                rules: _vm.validationRules.email
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            })
          ]
        : _vm.field.type == "password"
        ? [
            _c("v-text-field", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder,
                "append-icon": _vm.field.passwordVisible
                  ? "visibility_off"
                  : "visibility",
                "append-icon-cb": _vm.appendPasswordIconCheckbox(),
                type: _vm.field.passwordVisible ? "text" : "password"
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            })
          ]
        : _vm.field.type == "select"
        ? [
            _c("v-select", {
              attrs: {
                items: _vm.field.items,
                "item-value": "value",
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled
              },
              on: { change: _vm.onChange },
              scopedSlots: _vm._u([
                {
                  key: "selection",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _vm._v(
                        "\n       " +
                          _vm._s(
                            typeof item.text === "function"
                              ? item.text()
                              : item.text
                          ) +
                          "\n      "
                      )
                    ]
                  }
                },
                {
                  key: "item",
                  fn: function(ref) {
                    var item = ref.item
                    var on = ref.on
                    var attrs = ref.attrs
                    return [
                      _c(
                        "v-list-item",
                        _vm._g(_vm._b({}, "v-list-item", attrs, false), on),
                        [
                          _c(
                            "v-list-item-content",
                            [
                              _c("v-list-item-title", [
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      typeof item.text === "function"
                                        ? item.text()
                                        : item.text
                                    ) +
                                    " "
                                )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  }
                }
              ]),
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            })
          ]
        : _vm.field.type == "checkbox"
        ? [
            _c("v-checkbox", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled
              },
              on: { change: _vm.onChange },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            })
          ]
        : [
            _c("v-text-field", {
              attrs: {
                label:
                  typeof _vm.field.label === "function"
                    ? _vm.field.label()
                    : _vm.field.label,
                required: _vm.field.required,
                readonly: _vm.field.readonly,
                disabled: _vm.field.disabled,
                placeholder: _vm.field.placeholder
              },
              on: { input: _vm.onInput },
              model: {
                value: _vm.localValue,
                callback: function($$v) {
                  _vm.localValue = $$v
                },
                expression: "localValue"
              }
            }),
            _vm._v(" "),
            _vm.field.button
              ? _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.setVal(_vm.field.button.func)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n      " +
                        _vm._s(
                          typeof _vm.field.button.text === "function"
                            ? _vm.field.button.text()
                            : _vm.field.button.text
                        ) +
                        "\n    "
                    )
                  ]
                )
              : _vm._e()
          ]
    ],
    2
  )
}
var ExtFormField_staticRenderFns = []
ExtFormField_render._withStripped = true
var ExtFormField_esExports = { render: ExtFormField_render, staticRenderFns: ExtFormField_staticRenderFns }
/* harmony default export */ var componets_ExtFormField = (ExtFormField_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35c64d40", ExtFormField_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtFormField.vue
var ExtFormField_disposed = false
var ExtFormField_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtFormField___vue_template_functional__ = false
/* styles */
var ExtFormField___vue_styles__ = null
/* scopeId */
var ExtFormField___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ExtFormField___vue_module_identifier__ = null
var ExtFormField_Component = ExtFormField_normalizeComponent(
  ExtFormField,
  componets_ExtFormField,
  ExtFormField___vue_template_functional__,
  ExtFormField___vue_styles__,
  ExtFormField___vue_scopeId__,
  ExtFormField___vue_module_identifier__
)
ExtFormField_Component.options.__file = "src/extendable/componets/ExtFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35c64d40", ExtFormField_Component.options)
  } else {
    hotAPI.reload("data-v-35c64d40", ExtFormField_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtFormField_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtFormField = (ExtFormField_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtForm.vue
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ExtForm = ({
  name: "ext-form",
  props: {
    model: Object,
    schema: Object
  },
  components: {
    ExtFormField: extendable_componets_ExtFormField
  },

  data: function data() {
    return {};
  },

  created: function created() {},

  methods: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5d8579ec","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtForm.vue
var ExtForm_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-row",
    _vm._l(_vm.schema.fields, function(field, index) {
      return _c("ext-form-field", {
        key: index,
        attrs: { field: field },
        model: {
          value: _vm.model[field.key],
          callback: function($$v) {
            _vm.$set(_vm.model, field.key, $$v)
          },
          expression: "model[field.key]"
        }
      })
    }),
    1
  )
}
var ExtForm_staticRenderFns = []
ExtForm_render._withStripped = true
var ExtForm_esExports = { render: ExtForm_render, staticRenderFns: ExtForm_staticRenderFns }
/* harmony default export */ var componets_ExtForm = (ExtForm_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d8579ec", ExtForm_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtForm.vue
var ExtForm_disposed = false
var ExtForm_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtForm___vue_template_functional__ = false
/* styles */
var ExtForm___vue_styles__ = null
/* scopeId */
var ExtForm___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ExtForm___vue_module_identifier__ = null
var ExtForm_Component = ExtForm_normalizeComponent(
  ExtForm,
  componets_ExtForm,
  ExtForm___vue_template_functional__,
  ExtForm___vue_styles__,
  ExtForm___vue_scopeId__,
  ExtForm___vue_module_identifier__
)
ExtForm_Component.options.__file = "src/extendable/componets/ExtForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d8579ec", ExtForm_Component.options)
  } else {
    hotAPI.reload("data-v-5d8579ec", ExtForm_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtForm_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtForm = (ExtForm_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtLoading.vue
//
//
//
//
//
//

/* harmony default export */ var ExtLoading = ({
  name: "ext-loading",
  props: {
    show: Boolean,
    absolute: Boolean
  },
  data: function data() {
    return {
      options: {
        spinnerProps: {
          color: "primary",
          value: 100,
          indeterminate: true,
          size: 80
        },
        overlayProps: {}
      }
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-eee1ed34","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtLoading.vue
var ExtLoading_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-overlay",
    _vm._b(
      { attrs: { absolute: _vm.absolute, value: _vm.show } },
      "v-overlay",
      _vm.options.overlayProps,
      false
    ),
    [
      _c(
        "v-progress-circular",
        _vm._b({}, "v-progress-circular", _vm.options.spinnerProps, false)
      )
    ],
    1
  )
}
var ExtLoading_staticRenderFns = []
ExtLoading_render._withStripped = true
var ExtLoading_esExports = { render: ExtLoading_render, staticRenderFns: ExtLoading_staticRenderFns }
/* harmony default export */ var componets_ExtLoading = (ExtLoading_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-eee1ed34", ExtLoading_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtLoading.vue
var ExtLoading_disposed = false
function ExtLoading_injectStyle (ssrContext) {
  if (ExtLoading_disposed) return
  __webpack_require__("NOTI")
}
var ExtLoading_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtLoading___vue_template_functional__ = false
/* styles */
var ExtLoading___vue_styles__ = ExtLoading_injectStyle
/* scopeId */
var ExtLoading___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ExtLoading___vue_module_identifier__ = null
var ExtLoading_Component = ExtLoading_normalizeComponent(
  ExtLoading,
  componets_ExtLoading,
  ExtLoading___vue_template_functional__,
  ExtLoading___vue_styles__,
  ExtLoading___vue_scopeId__,
  ExtLoading___vue_module_identifier__
)
ExtLoading_Component.options.__file = "src/extendable/componets/ExtLoading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eee1ed34", ExtLoading_Component.options)
  } else {
    hotAPI.reload("data-v-eee1ed34", ExtLoading_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtLoading_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtLoading = (ExtLoading_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtEncoder.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var ExtEncoder = ({
  name: "ext-encoder",

  components: {
    ExtForm: extendable_componets_ExtForm,
    ExtLoading: extendable_componets_ExtLoading
  },

  data: function data() {
    return {
      toggleEncode: 0,
      input: "",
      output: "",
      loading: false,

      textareaMenuShow: false,
      textareaMenuPositionX: 0,
      textareaMenuPositionY: 0,
      textareaMenuTargetIndex: -1
    };
  },

  props: {
    options: {
      type: Object,
      default: null
    },
    schema: {
      type: Object,
      default: null
    },
    encode: {
      type: String | Function,
      default: null
    },
    decode: {
      type: String | Function,
      default: null
    },

    encodeText: {
      type: String,
      default: "Encode"
    },
    decodeText: {
      type: String,
      default: "Decode"
    }
  },

  watch: {
    input: function input(newVal, oldVal) {
      var _this = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.invoke();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    toggleEncode: function toggleEncode(newVal, oldVal) {
      var _this2 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.invoke();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },


    options: {
      handler: function handler(newValue, oldValue) {
        var _this3 = this;

        return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
          return regenerator_default.a.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this3.invoke();

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }))();
      },

      deep: true
    }
  },

  created: function created() {},
  mounted: function mounted() {},


  methods: {
    invoke: function invoke() {
      var _this4 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
        var result, handler, _handler;

        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                _this4.showLoading();
                _this4.$store.dispatch("hideSnackbar");

                //await this.$sleep(1000*10);

                result = null;

                //console.log("invoke");
                //console.log(this.encode, this.input, this.options);

                if (!(_this4.toggleEncode === 0 && _this4.encode)) {
                  _context4.next = 13;
                  break;
                }

                handler = _this4.encode;

                if (typeof _this4.encode === "function") {
                  handler = _this4.encode(_this4.options);
                }

                if (!handler) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 10;
                return _this4.$extInvoke(handler, _this4.input, _this4.options);

              case 10:
                result = _context4.sent;

              case 11:
                _context4.next = 20;
                break;

              case 13:
                if (!(_this4.toggleEncode === 1 && _this4.decode)) {
                  _context4.next = 20;
                  break;
                }

                _handler = _this4.decode;


                if (typeof _this4.decode === "function") {
                  _handler = _this4.decode(_this4.options);
                }

                if (!_handler) {
                  _context4.next = 20;
                  break;
                }

                _context4.next = 19;
                return _this4.$extInvoke(_handler, _this4.input, _this4.options);

              case 19:
                result = _context4.sent;

              case 20:
                if (result) {
                  if (result.success) {
                    _this4.output = result.output;
                  } else {
                    _this4.output = "";
                    if (result && result.message) {
                      _this4.$store.dispatch("showSnackbar", result.message);
                    }
                  }
                } else {
                  _this4.output = "";
                }

                _this4.hideLoading();
                _context4.next = 29;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4["catch"](0);

                _this4.hideLoading();
                _this4.output = "";
                _this4.$store.dispatch("showSnackbar", _context4.t0.message);

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4, [[0, 24]]);
      }))();
    },
    showLoading: function showLoading() {
      this.loading = true;
    },
    hideLoading: function hideLoading() {
      this.loading = false;
    },
    showInputMenu: function showInputMenu(e) {
      var _this5 = this;

      e.preventDefault();
      this.textareaMenuTargetIndex = 0;
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(function () {
        _this5.textareaMenuShow = true;
      });
    },
    showOutputMenu: function showOutputMenu(e) {
      var _this6 = this;

      e.preventDefault();
      this.textareaMenuTargetIndex = 1;
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(function () {
        _this6.textareaMenuShow = true;
      });
    },
    sync: function sync(index) {
      if (index === 1) {
        this.input = this.output;
      }
    },
    clear: function clear(index) {
      if (index === 0) {
        this.input = "";
      } else if (index === 1) {
        this.output = "";
      }
    },
    copy: function copy(index) {
      if (index === 0) {
        this.$copyToClipboard(this.input);
      } else if (index === 1) {
        this.$copyToClipboard(this.output);
      }
    },
    paste: function paste(index) {
      if (index === 0) {
        this.input += this.$pasteFromClipboard();
      } else if (index === 1) {
        this.output += this.$pasteFromClipboard();
      }
    },
    upperCase: function upperCase(index) {
      if (index === 0 && this.input) {
        this.input = this.input.toUpperCase();
      } else if (index === 1 && this.output) {
        this.output = this.output.toUpperCase();
      }
    },
    lowerCase: function lowerCase(index) {
      if (index === 0 && this.input) {
        this.input = this.input.toLowerCase();
      } else if (index === 1 && this.output) {
        this.output = this.output.toLowerCase();
      }
    },
    clearSpace: function clearSpace(index) {
      if (index === 0 && this.input) {
        this.input = this.input.replace(/\s*/g, "");
      } else if (index === 1 && this.output) {
        this.output = this.output.replace(/\s*/g, "");
      }
    },
    clearLinefeed: function clearLinefeed(index) {
      if (index === 0 && this.input) {
        this.input = this.input.replace(/\r|\n/g, "");
      } else if (index === 1 && this.output) {
        this.output = this.output.replace(/\r|\n/g, "");
      }
    },
    openFile: function openFile(index) {
      var _this7 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee5() {
        var result;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this7.$openTextFile("Open file");

              case 2:
                result = _context5.sent;


                if (result && result.data) {
                  if (index === 0) {
                    _this7.input = result.data.toString();
                  } else if (index === 1) {
                    _this7.output = result.data.toString();
                  }
                }

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this7);
      }))();
    },
    saveTextFile: function saveTextFile(index) {
      var text = void 0;

      if (index === 0) {
        text = this.input;
      } else if (index === 1) {
        text = this.output;
      }

      if (text) {
        var buffer = Buffer.from(text);

        this.$saveFile(buffer, "Save as");
      }
    },
    saveBinaryFile: function saveBinaryFile(index) {
      var text = void 0;

      if (index === 0) {
        text = this.input;
      } else if (index === 1) {
        text = this.output;
      }

      if (text) {
        var hex = text.toLocaleLowerCase().replace(/[^a-f0-9]/g, "");

        var buffer = Buffer.from(hex, "hex");

        this.$saveFile(buffer, "Save as");
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-09fabd46","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtEncoder.vue
var ExtEncoder_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c("ext-loading", { attrs: { absolute: "", show: _vm.loading } }),
      _vm._v(" "),
      _vm.schema && _vm.options
        ? _c("ext-form", { attrs: { model: _vm.options, schema: _vm.schema } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { dense: "", justify: "end" } },
        [
          _c(
            "v-btn-toggle",
            {
              model: {
                value: _vm.toggleEncode,
                callback: function($$v) {
                  _vm.toggleEncode = $$v
                },
                expression: "toggleEncode"
              }
            },
            [
              _vm.encode
                ? _c("v-btn", { attrs: { elevation: "2", height: "32" } }, [
                    _vm._v(_vm._s(_vm.encodeText))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.decode
                ? _c("v-btn", { attrs: { elevation: "2", height: "32" } }, [
                    _vm._v(_vm._s(_vm.decodeText))
                  ])
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { dense: "" } },
        [
          _c(
            "v-col",
            [
              _c("v-textarea", {
                staticClass: "textarea",
                attrs: {
                  rows: "10",
                  solo: "",
                  label: _vm.$t("extension.editor.label.input"),
                  height: "100%",
                  spellcheck: "false"
                },
                on: { contextmenu: _vm.showInputMenu },
                model: {
                  value: _vm.input,
                  callback: function($$v) {
                    _vm.input = $$v
                  },
                  expression: "input"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            [
              _c("v-textarea", {
                staticClass: "textarea",
                attrs: {
                  rows: "10",
                  readonly: "",
                  solo: "",
                  label: _vm.$t("extension.editor.label.output"),
                  height: "100%",
                  spellcheck: "false"
                },
                on: { contextmenu: _vm.showOutputMenu },
                model: {
                  value: _vm.output,
                  callback: function($$v) {
                    _vm.output = $$v
                  },
                  expression: "output"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-menu",
        {
          attrs: {
            "position-x": _vm.textareaMenuPositionX,
            "position-y": _vm.textareaMenuPositionY,
            absolute: "",
            "offset-y": "",
            "min-width": "160"
          },
          model: {
            value: _vm.textareaMenuShow,
            callback: function($$v) {
              _vm.textareaMenuShow = $$v
            },
            expression: "textareaMenuShow"
          }
        },
        [
          _c(
            "v-list",
            { attrs: { dense: "" } },
            [
              _vm.textareaMenuTargetIndex === 1
                ? _c(
                    "v-list-item",
                    {
                      directives: [
                        {
                          name: "ripple",
                          rawName: "v-ripple",
                          value: { class: "secondary--text" },
                          expression: "{ class: 'secondary--text' }"
                        }
                      ],
                      on: {
                        click: function($event) {
                          return _vm.sync(_vm.textareaMenuTargetIndex)
                        }
                      }
                    },
                    [
                      _c(
                        "v-list-item-icon",
                        [_c("v-icon", [_vm._v("mdi-file-remove-outline")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c("v-list-item-title", [
                            _vm._v(_vm._s(_vm.$t("extension.editor.menu.sync")))
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clear(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-delete-empty-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.clear")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.copy(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-copy")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.copy")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.paste(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-paste")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.paste")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.upperCase(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-format-letter-case-upper")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.upper_case"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.lowerCase(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-format-letter-case-lower")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.lower_case"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clearSpace(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-tray-remove")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.clear_space"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clearLinefeed(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-playlist-remove")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.clear_line_feed")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.openFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-file-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.open_file"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.saveTextFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-save-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.save_as_text_file")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.saveBinaryFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-save")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.save_as_binary_file")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var ExtEncoder_staticRenderFns = []
ExtEncoder_render._withStripped = true
var ExtEncoder_esExports = { render: ExtEncoder_render, staticRenderFns: ExtEncoder_staticRenderFns }
/* harmony default export */ var componets_ExtEncoder = (ExtEncoder_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-09fabd46", ExtEncoder_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtEncoder.vue
var ExtEncoder_disposed = false
function ExtEncoder_injectStyle (ssrContext) {
  if (ExtEncoder_disposed) return
  __webpack_require__("1vXy")
}
var ExtEncoder_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtEncoder___vue_template_functional__ = false
/* styles */
var ExtEncoder___vue_styles__ = ExtEncoder_injectStyle
/* scopeId */
var ExtEncoder___vue_scopeId__ = "data-v-09fabd46"
/* moduleIdentifier (server only) */
var ExtEncoder___vue_module_identifier__ = null
var ExtEncoder_Component = ExtEncoder_normalizeComponent(
  ExtEncoder,
  componets_ExtEncoder,
  ExtEncoder___vue_template_functional__,
  ExtEncoder___vue_styles__,
  ExtEncoder___vue_scopeId__,
  ExtEncoder___vue_module_identifier__
)
ExtEncoder_Component.options.__file = "src/extendable/componets/ExtEncoder.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09fabd46", ExtEncoder_Component.options)
  } else {
    hotAPI.reload("data-v-09fabd46", ExtEncoder_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtEncoder_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtEncoder = (ExtEncoder_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtTab.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ExtTab = ({
  name: "ext-tab",

  data: function data() {
    return {
      currentTab: null,
      tabItems: [],
      tabId: 0
    };
  },


  props: {
    title: {
      type: String,
      default: ""
    }
  },

  components: {},

  created: function created() {
    this.tabItems.push({
      id: this.tabId++,
      title: this.title

    });
  },

  methods: {
    addTab: function addTab() {
      this.tabItems.push({
        id: this.tabId++,
        title: this.title

      });

      this.currentTab = this.tabItems.length - 1;
    },
    removeTab: function removeTab(index) {
      this.tabItems.splice(index, 1);

      if (index <= this.tabItems.length - 1) {
        this.currentTab = index;
      } else {
        this.currentTab = index - 1;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-efb8a782","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtTab.vue
var ExtTab_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { attrs: { width: "100%", height: "96%" } },
    [
      _c(
        "v-tabs",
        {
          model: {
            value: _vm.currentTab,
            callback: function($$v) {
              _vm.currentTab = $$v
            },
            expression: "currentTab"
          }
        },
        [
          _vm._l(_vm.tabItems, function(tabItem, index) {
            return _c(
              "v-tab",
              { key: index },
              [
                _vm._v(
                  "\n      " +
                    _vm._s(tabItem.title + " " + (index + 1)) +
                    "\n      "
                ),
                _vm.currentTab === index
                  ? _c(
                      "v-icon",
                      {
                        attrs: { size: "20" },
                        on: {
                          click: function($event) {
                            return _vm.removeTab(index)
                          }
                        }
                      },
                      [_vm._v("\n        mdi-minus-circle\n      ")]
                    )
                  : _vm._e()
              ],
              1
            )
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "tab-add-btn",
              attrs: { icon: "" },
              on: {
                click: function($event) {
                  return _vm.addTab()
                }
              }
            },
            [_c("v-icon", { attrs: { size: "40" } }, [_vm._v(" mdi-plus ")])],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "v-tabs-items",
        {
          model: {
            value: _vm.currentTab,
            callback: function($$v) {
              _vm.currentTab = $$v
            },
            expression: "currentTab"
          }
        },
        _vm._l(_vm.tabItems, function(tabItem, index) {
          return _c("v-tab-item", { key: index }, [_vm._t("default")], 2)
        }),
        1
      )
    ],
    1
  )
}
var ExtTab_staticRenderFns = []
ExtTab_render._withStripped = true
var ExtTab_esExports = { render: ExtTab_render, staticRenderFns: ExtTab_staticRenderFns }
/* harmony default export */ var componets_ExtTab = (ExtTab_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-efb8a782", ExtTab_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtTab.vue
var ExtTab_disposed = false
function ExtTab_injectStyle (ssrContext) {
  if (ExtTab_disposed) return
  __webpack_require__("JCT4")
}
var ExtTab_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtTab___vue_template_functional__ = false
/* styles */
var ExtTab___vue_styles__ = ExtTab_injectStyle
/* scopeId */
var ExtTab___vue_scopeId__ = "data-v-efb8a782"
/* moduleIdentifier (server only) */
var ExtTab___vue_module_identifier__ = null
var ExtTab_Component = ExtTab_normalizeComponent(
  ExtTab,
  componets_ExtTab,
  ExtTab___vue_template_functional__,
  ExtTab___vue_styles__,
  ExtTab___vue_scopeId__,
  ExtTab___vue_module_identifier__
)
ExtTab_Component.options.__file = "src/extendable/componets/ExtTab.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-efb8a782", ExtTab_Component.options)
  } else {
    hotAPI.reload("data-v-efb8a782", ExtTab_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtTab_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtTab = (ExtTab_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtTabEncoder.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var ExtTabEncoder__ = __webpack_require__("M4fF");



/* harmony default export */ var ExtTabEncoder = ({
  name: "ext-tab-encoder",

  data: function data() {
    return {
      currentTab: null,
      tabItems: [],
      tabId: 0
    };
  },


  props: {
    title: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: null
    },
    schema: {
      type: Object,
      default: null
    },
    encode: {
      type: String | Function,
      default: null
    },
    decode: {
      type: String | Function,
      default: null
    },

    encodeText: {
      type: String,
      default: "Encode"
    },
    decodeText: {
      type: String,
      default: "Decode"
    }
  },

  components: {
    ExtEncoder: extendable_componets_ExtEncoder
  },

  created: function created() {
    this.tabItems.push({
      id: this.tabId++,
      title: this.title,
      options: ExtTabEncoder__.cloneDeep(this.options)
    });
  },

  methods: {
    addTab: function addTab() {
      this.tabItems.push({
        id: this.tabId++,
        title: this.title,
        options: ExtTabEncoder__.cloneDeep(this.options)
      });

      this.currentTab = this.tabItems.length - 1;
    },
    removeTab: function removeTab(index) {
      this.tabItems.splice(index, 1);

      if (index <= this.tabItems.length - 1) {
        this.currentTab = index;
      } else {
        this.currentTab = index - 1;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-31ef1e0d","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtTabEncoder.vue
var ExtTabEncoder_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { attrs: { width: "100%", height: "96%" } },
    [
      _c(
        "v-tabs",
        {
          model: {
            value: _vm.currentTab,
            callback: function($$v) {
              _vm.currentTab = $$v
            },
            expression: "currentTab"
          }
        },
        [
          _vm._l(_vm.tabItems, function(tabItem, index) {
            return _c(
              "v-tab",
              { key: index },
              [
                _vm._v(
                  "\n      " +
                    _vm._s(tabItem.title + " " + (index + 1)) +
                    "\n      "
                ),
                _vm.currentTab === index
                  ? _c(
                      "v-icon",
                      {
                        attrs: { size: "20" },
                        on: {
                          click: function($event) {
                            return _vm.removeTab(index)
                          }
                        }
                      },
                      [_vm._v("\n        mdi-minus-circle\n      ")]
                    )
                  : _vm._e()
              ],
              1
            )
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "tab-add-btn",
              attrs: { icon: "" },
              on: {
                click: function($event) {
                  return _vm.addTab()
                }
              }
            },
            [_c("v-icon", { attrs: { size: "40" } }, [_vm._v(" mdi-plus ")])],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "v-tabs-items",
        {
          model: {
            value: _vm.currentTab,
            callback: function($$v) {
              _vm.currentTab = $$v
            },
            expression: "currentTab"
          }
        },
        _vm._l(_vm.tabItems, function(tabItem, index) {
          return _c(
            "v-tab-item",
            { key: index },
            [
              _c("ext-encoder", {
                attrs: {
                  title: _vm.title,
                  options: tabItem.options,
                  schema: _vm.schema,
                  encode: _vm.encode,
                  decode: _vm.decode,
                  encodeText: _vm.encodeText,
                  decodeText: _vm.decodeText
                }
              })
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var ExtTabEncoder_staticRenderFns = []
ExtTabEncoder_render._withStripped = true
var ExtTabEncoder_esExports = { render: ExtTabEncoder_render, staticRenderFns: ExtTabEncoder_staticRenderFns }
/* harmony default export */ var componets_ExtTabEncoder = (ExtTabEncoder_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31ef1e0d", ExtTabEncoder_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtTabEncoder.vue
var ExtTabEncoder_disposed = false
function ExtTabEncoder_injectStyle (ssrContext) {
  if (ExtTabEncoder_disposed) return
  __webpack_require__("TeAo")
}
var ExtTabEncoder_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtTabEncoder___vue_template_functional__ = false
/* styles */
var ExtTabEncoder___vue_styles__ = ExtTabEncoder_injectStyle
/* scopeId */
var ExtTabEncoder___vue_scopeId__ = "data-v-31ef1e0d"
/* moduleIdentifier (server only) */
var ExtTabEncoder___vue_module_identifier__ = null
var ExtTabEncoder_Component = ExtTabEncoder_normalizeComponent(
  ExtTabEncoder,
  componets_ExtTabEncoder,
  ExtTabEncoder___vue_template_functional__,
  ExtTabEncoder___vue_styles__,
  ExtTabEncoder___vue_scopeId__,
  ExtTabEncoder___vue_module_identifier__
)
ExtTabEncoder_Component.options.__file = "src/extendable/componets/ExtTabEncoder.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31ef1e0d", ExtTabEncoder_Component.options)
  } else {
    hotAPI.reload("data-v-31ef1e0d", ExtTabEncoder_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtTabEncoder_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtTabEncoder = (ExtTabEncoder_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/extendable/componets/ExtEditor.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ExtEditor = ({
  name: "ext-editor",

  components: {},

  data: function data() {
    return {
      textareaMenuShow: false,
      textareaMenuPositionX: 0,
      textareaMenuPositionY: 0
    };
  },

  model: {
    prop: "textVal",
    event: "textChange"
  },

  props: {
    textVal: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },

  created: function created() {},
  mounted: function mounted() {},


  computed: {},

  methods: {
    inputText: function inputText(val) {
      this.$emit("textChange", val);
    },
    showMenu: function showMenu(e) {
      var _this = this;

      e.preventDefault();
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(function () {
        _this.textareaMenuShow = true;
      });
    },
    clear: function clear() {
      var val = "";

      this.$emit("textChange", val);
    },
    copy: function copy() {
      this.$copyToClipboard(this.textVal);
    },
    paste: function paste() {
      var val = this.textVal + this.$pasteFromClipboard();

      this.$emit("textChange", val);
    },
    upperCase: function upperCase() {
      if (this.textVal) {
        var val = this.textVal.toUpperCase();

        this.$emit("textChange", val);
      }
    },
    lowerCase: function lowerCase() {
      if (this.textVal) {
        var val = this.textVal.toLowerCase();
        this.$emit("textChange", val);
      }
    },
    clearSpace: function clearSpace() {
      if (this.textVal) {
        var val = this.textVal.replace(/\s*/g, "");
        this.$emit("textChange", val);
      }
    },
    clearLinefeed: function clearLinefeed() {
      if (this.textVal) {
        var val = this.textVal.replace(/\r|\n/g, "");
        this.$emit("textChange", val);
      }
    },
    openFile: function openFile() {
      var _this2 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var result;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.$openTextFile("Open file");

              case 2:
                result = _context.sent;


                if (result && result.data) {
                  _this2.$emit("textChange", result.data);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    },
    saveTextFile: function saveTextFile() {
      if (this.textVal) {
        var buffer = Buffer.from(this.textVal);

        this.$saveFile(buffer, "Save as");
      }
    },
    saveBinaryFile: function saveBinaryFile() {
      if (this.textVal) {
        var hex = this.textVal.toLocaleLowerCase().replace(/[^a-f0-9]/g, "");

        var buffer = Buffer.from(hex, "hex");

        this.$saveFile(buffer, "Save as");
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5db227b3","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/extendable/componets/ExtEditor.vue
var ExtEditor_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c("v-textarea", {
        staticClass: "textarea",
        attrs: {
          value: _vm.textVal,
          rows: "10",
          solo: "",
          label: _vm.label,
          readonly: _vm.readonly,
          height: "100%",
          spellcheck: "false"
        },
        on: { input: _vm.inputText, contextmenu: _vm.showMenu }
      }),
      _vm._v(" "),
      _c(
        "v-menu",
        {
          attrs: {
            "position-x": _vm.textareaMenuPositionX,
            "position-y": _vm.textareaMenuPositionY,
            absolute: "",
            "offset-y": "",
            "min-width": "160"
          },
          model: {
            value: _vm.textareaMenuShow,
            callback: function($$v) {
              _vm.textareaMenuShow = $$v
            },
            expression: "textareaMenuShow"
          }
        },
        [
          _c(
            "v-list",
            { attrs: { dense: "" } },
            [
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clear(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-delete-empty-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.clear")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.copy(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-copy")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.copy")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.paste(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-paste")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(_vm._s(_vm.$t("extension.editor.menu.paste")))
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.upperCase(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-format-letter-case-upper")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.upper_case"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.lowerCase(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-format-letter-case-lower")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.lower_case"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clearSpace(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-tray-remove")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.clear_space"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.clearLinefeed(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-playlist-remove")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.clear_line_feed")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.openFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-file-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(_vm.$t("extension.editor.menu.open_file"))
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.saveTextFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-save-outline")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.save_as_text_file")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "ripple",
                      rawName: "v-ripple",
                      value: { class: "secondary--text" },
                      expression: "{ class: 'secondary--text' }"
                    }
                  ],
                  on: {
                    click: function($event) {
                      return _vm.saveBinaryFile(_vm.textareaMenuTargetIndex)
                    }
                  }
                },
                [
                  _c(
                    "v-list-item-icon",
                    [_c("v-icon", [_vm._v("mdi-content-save")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", [
                        _vm._v(
                          _vm._s(
                            _vm.$t("extension.editor.menu.save_as_binary_file")
                          )
                        )
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var ExtEditor_staticRenderFns = []
ExtEditor_render._withStripped = true
var ExtEditor_esExports = { render: ExtEditor_render, staticRenderFns: ExtEditor_staticRenderFns }
/* harmony default export */ var componets_ExtEditor = (ExtEditor_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5db227b3", ExtEditor_esExports)
  }
}
// CONCATENATED MODULE: ./src/extendable/componets/ExtEditor.vue
var ExtEditor_disposed = false
function ExtEditor_injectStyle (ssrContext) {
  if (ExtEditor_disposed) return
  __webpack_require__("+Smb")
}
var ExtEditor_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ExtEditor___vue_template_functional__ = false
/* styles */
var ExtEditor___vue_styles__ = ExtEditor_injectStyle
/* scopeId */
var ExtEditor___vue_scopeId__ = "data-v-5db227b3"
/* moduleIdentifier (server only) */
var ExtEditor___vue_module_identifier__ = null
var ExtEditor_Component = ExtEditor_normalizeComponent(
  ExtEditor,
  componets_ExtEditor,
  ExtEditor___vue_template_functional__,
  ExtEditor___vue_styles__,
  ExtEditor___vue_scopeId__,
  ExtEditor___vue_module_identifier__
)
ExtEditor_Component.options.__file = "src/extendable/componets/ExtEditor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5db227b3", ExtEditor_Component.options)
  } else {
    hotAPI.reload("data-v-5db227b3", ExtEditor_Component.options)
  }
  module.hot.dispose(function (data) {
    ExtEditor_disposed = true
  })
})()}

/* harmony default export */ var extendable_componets_ExtEditor = (ExtEditor_Component.exports);

// CONCATENATED MODULE: ./src/extendable/extendable.js












var ExtendablePlugin = {
  install: function install(Vue, options) {
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

    Vue.prototype.$extInvoke = function () {
      var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(hander) {
        var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return external__electron_["ipcRenderer"].invoke(hander, input, options);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    Vue.component('ext-form', extendable_componets_ExtForm);
    //Vue.component('ext-encoder', ExtEncoder);
    Vue.component('ext-tab', extendable_componets_ExtTab);
    Vue.component('ext-tab-encoder', extendable_componets_ExtTabEncoder);
    Vue.component('ext-loading', extendable_componets_ExtLoading);
    Vue.component('ext-editor', extendable_componets_ExtEditor);
  }
};
/* harmony default export */ var extendable = (ExtendablePlugin);
// CONCATENATED MODULE: ./src/main.js















vue_esm["default"].use(vue_i18n_esm["a" /* default */]);

var i18n = new vue_i18n_esm["a" /* default */]({
  locale: 'default',
  messages: {
    default: __webpack_require__("kId2"),
    fallbackLocale: 'default'
  }
});

vue_esm["default"].config.productionTip = false;
vue_esm["default"].prototype.console = window.console;

// 使用剪切板
vue_esm["default"].use(vue_clipboard_default.a);

vue_esm["default"].use(commands);
vue_esm["default"].use(extendable);

new vue_esm["default"]({
  el: '#app',
  store: src_store,
  router: router["a" /* default */],
  vuetify: plugins_vuetify,
  i18n: i18n,
  components: { App: src_App },
  template: '<App/>'
});

/***/ }),

/***/ "NOTI":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("gov5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("1c0be536", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eee1ed34\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtLoading.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eee1ed34\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtLoading.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "OCj8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\nhtml{height:100%;overflow-y:auto !important\n}\nbutton{-webkit-app-region:no-drag\n}\ninput{background-color:transparent !important\n}\ninput:-webkit-autofill{-webkit-transition:background-color 1s ease-in-out 6000s;-webkit-text-fill-color:#fff !important\n}\n.v-application{font-family:system,-apple-system,\".SFNSText-Regular\",\"SF UI Text\",\"Lucida Grande\",\"Segoe UI\",Ubuntu,Cantarell,sans-serif\n}\n.v-application pre>code{-webkit-box-shadow:none;box-shadow:none\n}\n.v-application pre>code::before,.v-application pre>code::after{content:none\n}\npre[class*=language-]{margin:auto 0 !important\n}\n.v-tab,.v-btn{text-transform:none !important\n}\n.v-bottom-black-bar{margin-bottom:constant(safe-area-inset-bottom);margin-bottom:env(safe-area-inset-bottom)\n}\n.v-pagination .v-pagination__item{outline:none\n}\n.v-application--wrap{backface-visibility:visible !important;-webkit-backface-visibility:visible !important\n}", "", {"version":3,"sources":["E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/App.vue"],"names":[],"mappings":";AAgEA,KACE,YACA,0BAAA;CAGF;AAAA,OACE,0BAAA;CAKF;AAAA,MACE,uCAAA;CAEF;AAAA,uBACE,yDACA,uCAAA;CAGF;AAAA,eACE,wHAAA;CAKF;AAAA,wBACE,wBAAA,eAAA;CACA;AAAA,+DAEE,YAAA;CAGJ;AAAA,sBACE,wBAAA;CAGF;AAAA,cAEE,8BAAA;CAGF;AAAA,oBAEE,+CACA,yCAAA;CAIF;AAAA,kCACE,YAAA;CAKF;AAAA,qBACE,uCACA,8CAAA;CAAA","file":"App.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nhtml {\n  height: 100%;\n  overflow-y: auto !important;\n}\n\nbutton {\n  -webkit-app-region: no-drag;\n}\n\n// 去除Google游览器自动填充账号出现的背景\n\ninput {\n  background-color: transparent !important;\n}\ninput:-webkit-autofill {\n  -webkit-transition: background-color 1s ease-in-out 6000s;\n  -webkit-text-fill-color: #fff !important;\n}\n\n.v-application {\n  font-family: system, -apple-system, \".SFNSText-Regular\", \"SF UI Text\",\n    \"Lucida Grande\", \"Segoe UI\", Ubuntu, Cantarell, sans-serif;\n}\n\n// 清除vuetify的默认pre下的code伪元素和阴影\n.v-application pre > code {\n  box-shadow: none;\n  &::before,\n  &::after {\n    content: none;\n  }\n}\npre[class*=\"language-\"] {\n  margin: auto 0 !important;\n}\n\n.v-tab,\n.v-btn {\n  text-transform: none !important;\n}\n\n.v-bottom-black-bar {\n  // 适应底部小黑条\n  margin-bottom: constant(safe-area-inset-bottom);\n  margin-bottom: env(safe-area-inset-bottom);\n}\n\n// 分页\n.v-pagination .v-pagination__item {\n  outline: none;\n}\n\n// fix\n\n.v-application--wrap {\n  backface-visibility: visible !important;\n  -webkit-backface-visibility: visible !important;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "SYdB":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("WXLq");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("ef85d3e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d74662a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./WechatDialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d74662a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./WechatDialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "TeAo":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("o3s+");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("19bc2dd4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31ef1e0d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtTabEncoder.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31ef1e0d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ExtTabEncoder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "TeeX":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.title-bar[data-v-60f35ab6] {\r\n  -webkit-user-select: none;\r\n  -webkit-app-region: drag;\n}\n.tab-content-container[data-v-60f35ab6] {\r\n  padding: 10px;\n}\n.snackbar[data-v-60f35ab6] {\r\n  word-break: break-all;\n}\n.menu-more-list[data-v-60f35ab6] {\r\n  min-width: 200px;\n}\n.menu-more-list .v-list-item__content[data-v-60f35ab6] {\r\n  min-width: 120px;\n}\r\n", "", {"version":3,"sources":["E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/views/layout/src/views/layout/Layout.vue"],"names":[],"mappings":";AAsdA;EACA,0BAAA;EACA,yBAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,iBAAA;CACA;AAEA;EACA,iBAAA;CACA","file":"Layout.vue","sourcesContent":["<template>\r\n  <v-app>\r\n    <v-system-bar\r\n      class=\"title-bar\"\r\n      :height=\"mode === 'normal' ? 24 : 36\"\r\n      color=\"primary\"\r\n      dark\r\n      app\r\n    >\r\n      <span v-if=\"mode !== 'normal'\" class=\".subtitle-1 font-weight-bold\"\r\n        >CaptfEncoder V2</span\r\n      >\r\n      <v-spacer></v-spacer>\r\n      <v-icon class=\"mx-3\" @click=\"minimizeWindow\">mdi-window-minimize</v-icon>\r\n      <v-icon class=\"mx-3\" @click=\"maximizeWindow\" v-if=\"!window.maximized\"\r\n        >mdi-window-maximize</v-icon\r\n      >\r\n      <v-icon class=\"mx-3\" @click=\"unmaximizeWindow\" v-if=\"window.maximized\"\r\n        >mdi-window-restore</v-icon\r\n      >\r\n      <v-icon class=\"mx-3\" @click=\"closeWindow\">mdi-close</v-icon>\r\n    </v-system-bar>\r\n    <v-app-bar\r\n      v-if=\"mode === 'normal' && appBarShow === true\"\r\n      height=\"64\"\r\n      color=\"primary\"\r\n      dark\r\n      clipped-left\r\n      app\r\n    >\r\n      <v-toolbar-title>\r\n        <v-avatar tile>\r\n          <v-btn @click=\"navShow = !navShow\" text>\r\n            <v-icon>mdi-menu</v-icon>\r\n          </v-btn>\r\n        </v-avatar>\r\n        <span class=\"title font-weight-bold\">CaptfEncoder V2</span>\r\n      </v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <v-toolbar-items>\r\n        <v-form>\r\n          <v-container>\r\n            <v-row dense>\r\n              <v-col>\r\n                <Search />\r\n              </v-col>\r\n            </v-row>\r\n          </v-container>\r\n        </v-form>\r\n\r\n        <v-btn class=\"d-md-flex d-none\" @click=\"fullscreen\" text>\r\n          <v-icon v-text=\"fullscreenIcon\"></v-icon>\r\n        </v-btn>\r\n        <v-btn class=\"d-md-flex d-none\" @click=\"openSite\" text>\r\n          <v-icon>mdi-github</v-icon>\r\n        </v-btn>\r\n        <v-btn class=\"d-md-flex d-none\" @click=\"openWechat\" text>\r\n          <v-icon>mdi-wechat</v-icon>\r\n        </v-btn>\r\n        <v-menu offset-y>\r\n          <template v-slot:activator=\"{ on, attrs }\">\r\n            <v-btn v-bind=\"attrs\" v-on=\"on\" text>\r\n              <v-icon>mdi-more</v-icon>\r\n            </v-btn>\r\n          </template>\r\n          <v-list class=\"menu-more-list\">\r\n            <v-list-item @click=\"themePickerShow = !themePickerShow\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-palette</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.theme\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-list-item @click=\"languagePickerShow = !languagePickerShow\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-note-text</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.language\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-divider></v-divider>\r\n            <v-list-item @click=\"openExtensionsFolder\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-apps</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.extension\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-divider></v-divider>\r\n            <v-list-item @click=\"openSite\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-github</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.support_site\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-list-item @click=\"openIssues\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-chat-question</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.new_issuse\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-list-item @click=\"checkUpdate\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-cloud-check</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.check_update\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n            <v-divider></v-divider>\r\n            <v-list-item @click=\"openAbout\">\r\n              <v-list-item-icon>\r\n                <v-icon>mdi-alpha-a-circle</v-icon>\r\n              </v-list-item-icon>\r\n              <v-list-item-content>\r\n                <v-list-item-title>{{\r\n                  $t(\"renderer.appbar.menu.about\")\r\n                }}</v-list-item-title>\r\n              </v-list-item-content>\r\n            </v-list-item>\r\n          </v-list>\r\n        </v-menu>\r\n      </v-toolbar-items>\r\n    </v-app-bar>\r\n\r\n    <Navigation\r\n      v-if=\"mode === 'normal' && navShow === true\"\r\n      :color=\"navColor\"\r\n    />\r\n\r\n    <v-main class=\"divder pb-12\">\r\n      <v-expand-transition>\r\n        <v-tabs\r\n          color=\"secondary\"\r\n          style=\"position: sticky; z-index: 5\"\r\n          v-bind:style=\"{ top: mode === 'normal' ? 88 + 'px' : 24 + 'px' }\"\r\n          show-arrows\r\n        >\r\n          <v-tab\r\n            :name=\"i\"\r\n            @contextmenu=\"showMenu\"\r\n            v-for=\"(item, i) in tabList\"\r\n            :key=\"item.name\"\r\n            :to=\"item.path\"\r\n          >\r\n            {{ $getItemLocaleTitle(item) }}\r\n            <v-icon\r\n              size=\"20\"\r\n              v-if=\"i !== 0\"\r\n              @click.stop.prevent=\"closeTab(i)\"\r\n              @contextmenu.stop.prevent=\"\"\r\n              >mdi-close</v-icon\r\n            >\r\n          </v-tab>\r\n        </v-tabs>\r\n      </v-expand-transition>\r\n      <v-menu\r\n        v-if=\"mode === 'normal'\"\r\n        v-model=\"tabMenuShow\"\r\n        :position-x=\"tabMenuPositionX\"\r\n        :position-y=\"tabMenuPositionY\"\r\n        absolute\r\n        offset-y\r\n        min-width=\"110\"\r\n      >\r\n        <v-list dense>\r\n          <v-list-item\r\n            @click=\"createWindow(tabMenuTargetIndex)\"\r\n            v-ripple=\"{ class: 'secondary--text' }\"\r\n          >\r\n            <v-list-item-title>{{\r\n              $t(\"renderer.tab.menu.open_in_new_window\")\r\n            }}</v-list-item-title>\r\n          </v-list-item>\r\n          <v-list-item\r\n            @click=\"closeTab(tabMenuTargetIndex)\"\r\n            v-ripple=\"{ class: 'secondary--text' }\"\r\n          >\r\n            <v-list-item-title>{{\r\n              $t(\"renderer.tab.menu.close\")\r\n            }}</v-list-item-title>\r\n          </v-list-item>\r\n          <v-list-item\r\n            @click=\"closeOther(tabMenuTargetIndex)\"\r\n            v-ripple=\"{ class: 'secondary--text' }\"\r\n          >\r\n            <v-list-item-title>{{\r\n              $t(\"renderer.tab.menu.close_other\")\r\n            }}</v-list-item-title>\r\n          </v-list-item>\r\n          <v-list-item\r\n            @click=\"closeAll\"\r\n            v-ripple=\"{ class: 'secondary--text' }\"\r\n          >\r\n            <v-list-item-title>{{\r\n              $t(\"renderer.tab.menu.close_all\")\r\n            }}</v-list-item-title>\r\n          </v-list-item>\r\n        </v-list>\r\n      </v-menu>\r\n\r\n      <v-container fluid fill-height class=\"tab-content-container\">\r\n        <keep-alive>\r\n          <router-view></router-view>\r\n        </keep-alive>\r\n      </v-container>\r\n    </v-main>\r\n\r\n    <v-navigation-drawer\r\n      width=\"640\"\r\n      v-model=\"themePickerShow\"\r\n      overlay-opacity=\"0\"\r\n      floating\r\n      temporary\r\n      right\r\n      app\r\n    >\r\n      <ThemePicker />\r\n    </v-navigation-drawer>\r\n\r\n    <v-navigation-drawer\r\n      width=\"240\"\r\n      v-model=\"languagePickerShow\"\r\n      overlay-opacity=\"0\"\r\n      floating\r\n      temporary\r\n      right\r\n      app\r\n    >\r\n      <LanguagePicker />\r\n    </v-navigation-drawer>\r\n\r\n    <v-snackbar\r\n      :color=\"snackbar.color\"\r\n      v-model=\"snackbar.show\"\r\n      :timeout=\"snackbar.timeout || 6000\"\r\n      vertical\r\n      multi-line\r\n      class=\"snackbar\"\r\n    >\r\n      {{ snackbar.text }}\r\n      <template v-slot:action=\"{ attrs }\">\r\n        <v-btn color=\"error\" text v-bind=\"attrs\" @click=\"hideSnackbar\">\r\n          {{ $t(\"renderer.snackbar.button.close\") }}\r\n        </v-btn>\r\n      </template>\r\n    </v-snackbar>\r\n\r\n    <v-dialog width=\"400\" v-model=\"updateDialogShow\">\r\n      <CheckUpdateDialog />\r\n    </v-dialog>\r\n\r\n    <v-dialog width=\"400\" v-model=\"wechatDialogShow\">\r\n      <WechatDialog />\r\n    </v-dialog>\r\n\r\n    <v-dialog width=\"400\" v-model=\"aboutDialog\">\r\n      <AboutDialog />\r\n    </v-dialog>\r\n  </v-app>\r\n</template>\r\n\r\n<script>\r\nconst _ = require(\"lodash\");\r\nimport screenfull from \"screenfull\";\r\nimport { mapGetters, mapActions } from \"vuex\";\r\nimport Navigation from \"../navigation/Navigation\";\r\nimport ThemePicker from \"../theme-picker/ThemePicker\";\r\nimport LanguagePicker from \"../language-picker/LanguagePicker\";\r\nimport Search from \"../search/Search\";\r\nimport WechatDialog from \"../dialog/WechatDialog\";\r\nimport AboutDialog from \"../dialog/AboutDialog\";\r\nimport CheckUpdateDialog from \"../dialog/CheckUpdateDialog \";\r\n\r\nexport default {\r\n  name: \"Layout\",\r\n\r\n  components: {\r\n    Navigation,\r\n    ThemePicker,\r\n    LanguagePicker,\r\n    Search,\r\n    WechatDialog,\r\n    AboutDialog,\r\n    CheckUpdateDialog,\r\n  },\r\n\r\n  props: {\r\n    mode: String,\r\n  },\r\n\r\n  data() {\r\n    return {\r\n      homeRoute: {\r\n        name: \"ext.app.home\",\r\n        path: \"/extensions/ext.app.home/\",\r\n        title: \"Home\",\r\n        titles: {\r\n          zh: \"首页\"\r\n        }\r\n      },\r\n\r\n      appBarShow: true,\r\n      navShow: true,\r\n      navColor: \"primary\",\r\n      updateDialogShow: false,\r\n      wechatDialogShow: false,\r\n      aboutDialog: false,\r\n\r\n      tabList: [],\r\n\r\n      tabMenuShow: false,\r\n      tabMenuPositionX: 0,\r\n      tabMenuPositionY: 0,\r\n      tabMenuTargetIndex: -1,\r\n\r\n      fullscreenIcon: \"mdi-fullscreen\",\r\n\r\n      themePickerShow: false,\r\n      languagePickerShow: false,\r\n    };\r\n  },\r\n\r\n  created() {\r\n    const index = _.findIndex(this.tabList, function (item) {\r\n      return item.name == this.homeRoute.name;\r\n    });\r\n\r\n    if (this.mode === \"normal\" && index < 0) {   \r\n      this.tabList.push(this.homeRoute);\r\n    }\r\n  },\r\n\r\n  mounted() {},\r\n\r\n  computed: {\r\n    ...mapGetters([\"window\", \"snackbar\"]),\r\n  },\r\n\r\n  watch: {\r\n    $route(to) {\r\n      const index = _.findIndex(this.tabList, function (item) {\r\n        return item.name == to.name;\r\n      });\r\n\r\n      if (index < 0) {         \r\n        this.tabList.push({\r\n          name: to.name,\r\n          path: to.path,\r\n          title: to.meta.title,\r\n          titles: to.meta.titles,\r\n\r\n        });\r\n      }\r\n    },\r\n  },\r\n\r\n  methods: {\r\n    ...mapActions([\"hideSnackbar\"]), \r\n\r\n    maximizeWindow() {\r\n      this.$store.dispatch(\"maximizeWindow\");\r\n    },\r\n    unmaximizeWindow() {\r\n      this.$store.dispatch(\"unmaximizeWindow\");\r\n    },\r\n    minimizeWindow() {\r\n      this.$minimizeWindow();\r\n    },\r\n    closeWindow() {\r\n      this.$closeWindow();\r\n    },\r\n\r\n    fullscreen() {\r\n      this.fullscreenIcon = screenfull.isFullscreen\r\n        ? \"mdi-fullscreen\"\r\n        : \"mdi-fullscreen-exit\";\r\n      screenfull.toggle();\r\n    },\r\n\r\n    openSite() {\r\n      this.$openExternalUrl(\"https://github.com/guyoung/CaptfEncoder\");\r\n    },\r\n\r\n    openWechat() {\r\n      this.wechatDialogShow = true;\r\n    },\r\n\r\n    openIssues() {\r\n      this.$openExternalUrl(\"https://github.com/guyoung/CaptfEncoder/issues\");\r\n    },\r\n\r\n    openExtensionsFolder() {\r\n      this.$openExtensionsFolder();\r\n    },\r\n    async checkUpdate() {\r\n      this.updateDialogShow = true;\r\n    },\r\n\r\n    openAbout() {\r\n      this.aboutDialog = true;\r\n    },\r\n\r\n    showMenu(e) {\r\n      e.preventDefault();\r\n      this.tabMenuTargetIndex = e.target.name;\r\n      this.tabMenuShow = false;\r\n      this.tabMenuPositionX = e.clientX;\r\n      this.tabMenuPositionY = e.clientY;\r\n      this.$nextTick(() => {\r\n        this.tabMenuShow = true;\r\n      });\r\n    },\r\n\r\n    createWindow(index) {\r\n      const title = this.tabList[index].title;\r\n      const hash = this.tabList[index].path;\r\n      const query = { layout: \"simple\" };\r\n\r\n      this.$createWindow(title, hash, query);\r\n    },\r\n\r\n    closeTab(index) {\r\n      this.tabList.splice(index, 1);\r\n\r\n      if (index <= this.tabList.length - 1) {\r\n        this.$router.push(this.tabList[index].path);\r\n      } else {\r\n        this.$router.push(this.tabList[index - 1].path);\r\n      }\r\n    },\r\n\r\n    closeOther(index) {\r\n      const tab = this.tabList[index];\r\n\r\n      _.remove(this.tabList, (item) => {\r\n        return !(item.name === this.homeRoute.name || item.name === tab.name);\r\n      });\r\n    },\r\n\r\n    closeAll() {\r\n      _.remove(this.tabList, (item) => {\r\n        return !(item.name === this.homeRoute.name);\r\n      });\r\n\r\n      this.$router.push(this.homeRoute.path);\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style scoped>\r\n.title-bar {\r\n  -webkit-user-select: none;\r\n  -webkit-app-region: drag;\r\n}\r\n\r\n.tab-content-container {\r\n  padding: 10px;\r\n}\r\n\r\n.snackbar {\r\n  word-break: break-all;\r\n}\r\n\r\n.menu-more-list {\r\n  min-width: 200px;\r\n}\r\n\r\n.menu-more-list .v-list-item__content {\r\n  min-width: 120px;\r\n}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "W8YJ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/** 触发GPU加速 */\r\n/*\r\n.textarea {\r\n  transform: translate3d(0, 0, 0);\r\n}\r\n*/\r\n", "", {"version":3,"sources":["E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/extendable/componets/src/extendable/componets/ExtEncoder.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8bA,cAAA;AACA;;;;EAIA","file":"ExtEncoder.vue","sourcesContent":["<template>\r\n  <v-container fluid>\r\n    <ext-loading absolute :show=\"loading\"></ext-loading>\r\n    <ext-form :model=\"options\" :schema=\"schema\" v-if=\"schema && options\">\r\n    </ext-form>\r\n\r\n    <v-row dense justify=\"end\">\r\n      <v-btn-toggle v-model=\"toggleEncode\">\r\n        <v-btn elevation=\"2\" height=\"32\" v-if=\"encode\">{{ encodeText }}</v-btn>\r\n        <v-btn elevation=\"2\" height=\"32\" v-if=\"decode\">{{ decodeText }}</v-btn>\r\n      </v-btn-toggle>\r\n    </v-row>\r\n    <v-row dense>\r\n      <v-col>\r\n        <v-textarea\r\n          class=\"textarea\"\r\n          v-model=\"input\"\r\n          rows=\"10\"\r\n          solo\r\n          :label=\"$t('extension.editor.label.input')\"\r\n          height=\"100%\"\r\n          spellcheck=\"false\"\r\n          @contextmenu=\"showInputMenu\"\r\n        ></v-textarea>\r\n      </v-col>\r\n      <v-col>\r\n        <v-textarea\r\n          class=\"textarea\"\r\n          v-model=\"output\"\r\n          rows=\"10\"\r\n          readonly\r\n          solo\r\n          :label=\"$t('extension.editor.label.output')\"\r\n          height=\"100%\"\r\n          spellcheck=\"false\"\r\n          @contextmenu=\"showOutputMenu\"\r\n        ></v-textarea>\r\n      </v-col>\r\n    </v-row>\r\n    <v-menu\r\n      v-model=\"textareaMenuShow\"\r\n      :position-x=\"textareaMenuPositionX\"\r\n      :position-y=\"textareaMenuPositionY\"\r\n      absolute\r\n      offset-y\r\n      min-width=\"160\"\r\n    >\r\n      <v-list dense>\r\n        <v-list-item\r\n          v-if=\"textareaMenuTargetIndex === 1\"\r\n          @click=\"sync(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-file-remove-outline</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.sync\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"clear(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-delete-empty-outline</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.clear\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"copy(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-content-copy</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.copy\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"paste(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-content-paste</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.paste\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-divider></v-divider>\r\n        <v-list-item\r\n          @click=\"upperCase(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-format-letter-case-upper</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.upper_case\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"lowerCase(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-format-letter-case-lower</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.lower_case\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"clearSpace(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-tray-remove</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.clear_space\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"clearLinefeed(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-playlist-remove</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.clear_line_feed\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-divider></v-divider>\r\n        <v-list-item\r\n          @click=\"openFile(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-file-outline</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.open_file\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"saveTextFile(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-content-save-outline</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.save_as_text_file\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n        <v-list-item\r\n          @click=\"saveBinaryFile(textareaMenuTargetIndex)\"\r\n          v-ripple=\"{ class: 'secondary--text' }\"\r\n        >\r\n          <v-list-item-icon>\r\n            <v-icon>mdi-content-save</v-icon>\r\n          </v-list-item-icon>\r\n          <v-list-item-content>\r\n            <v-list-item-title>{{$t(\"extension.editor.menu.save_as_binary_file\")}}</v-list-item-title>\r\n          </v-list-item-content>\r\n        </v-list-item>\r\n      </v-list>\r\n    </v-menu>\r\n  </v-container>\r\n</template>\r\n<script>\r\nimport ExtForm from \"./ExtForm\";\r\nimport ExtLoading from \"./ExtLoading\";\r\n\r\nexport default {\r\n  name: \"ext-encoder\",\r\n\r\n  components: {\r\n    ExtForm,\r\n    ExtLoading,\r\n  },\r\n\r\n  data: () => ({\r\n    toggleEncode: 0,\r\n    input: \"\",\r\n    output: \"\",\r\n    loading: false,\r\n\r\n    textareaMenuShow: false,\r\n    textareaMenuPositionX: 0,\r\n    textareaMenuPositionY: 0,\r\n    textareaMenuTargetIndex: -1,\r\n  }),\r\n\r\n  props: {\r\n    options: {\r\n      type: Object,\r\n      default: null,\r\n    },\r\n    schema: {\r\n      type: Object,\r\n      default: null,\r\n    },\r\n    encode: {\r\n      type: String | Function,\r\n      default: null,\r\n    },\r\n    decode: {\r\n      type: String | Function,\r\n      default: null,\r\n    },\r\n\r\n    encodeText: {\r\n      type: String,\r\n      default: \"Encode\",\r\n    },\r\n    decodeText: {\r\n      type: String,\r\n      default: \"Decode\",\r\n    },\r\n  },\r\n\r\n  watch: {\r\n    async input(newVal, oldVal) {\r\n      await this.invoke();\r\n    },\r\n\r\n    async toggleEncode(newVal, oldVal) {\r\n      await this.invoke();\r\n    },\r\n\r\n    options: {\r\n      async handler(newValue, oldValue) {\r\n        await this.invoke();\r\n      },\r\n      deep: true,\r\n    },\r\n  },\r\n\r\n  created() {\r\n   \r\n  },\r\n\r\n  mounted() {},\r\n\r\n  methods: {\r\n    async invoke() {\r\n      try {\r\n        this.showLoading();\r\n        this.$store.dispatch(\"hideSnackbar\");\r\n\r\n        //await this.$sleep(1000*10);\r\n\r\n        let result = null;\r\n\r\n        //console.log(\"invoke\");\r\n        //console.log(this.encode, this.input, this.options);\r\n\r\n        if (this.toggleEncode === 0 && this.encode) {\r\n          let handler = this.encode;\r\n          if (typeof this.encode === \"function\") {\r\n            handler = this.encode(this.options);\r\n          }\r\n\r\n          if (handler) {\r\n            result = await this.$extInvoke(handler, this.input, this.options);\r\n          }\r\n        } else if (this.toggleEncode === 1 && this.decode) {\r\n          let handler = this.decode;\r\n\r\n          if (typeof this.decode === \"function\") {\r\n            handler = this.decode(this.options);\r\n          }\r\n\r\n          if (handler) {\r\n            result = await this.$extInvoke(handler, this.input, this.options);\r\n          }\r\n        }\r\n        if (result) {\r\n          if (result.success) {\r\n            this.output = result.output;\r\n          } else {\r\n            this.output = \"\";\r\n            if (result && result.message) {\r\n              this.$store.dispatch(\"showSnackbar\", result.message);\r\n            }\r\n            \r\n          }\r\n        } else {\r\n          this.output = \"\";\r\n        }\r\n\r\n        this.hideLoading();\r\n      } catch (err) {\r\n        this.hideLoading();\r\n        this.output = \"\";\r\n        this.$store.dispatch(\"showSnackbar\", err.message);\r\n      }\r\n    },\r\n\r\n    showLoading() {\r\n      this.loading = true;\r\n    },\r\n\r\n    hideLoading() {\r\n      this.loading = false;\r\n    },\r\n\r\n    showInputMenu(e) {\r\n      e.preventDefault();\r\n      this.textareaMenuTargetIndex = 0;\r\n      this.textareaMenuShow = false;\r\n      this.textareaMenuPositionX = e.clientX;\r\n      this.textareaMenuPositionY = e.clientY;\r\n      this.$nextTick(() => {\r\n        this.textareaMenuShow = true;\r\n      });\r\n    },\r\n    showOutputMenu(e) {\r\n      e.preventDefault();\r\n      this.textareaMenuTargetIndex = 1;\r\n      this.textareaMenuShow = false;\r\n      this.textareaMenuPositionX = e.clientX;\r\n      this.textareaMenuPositionY = e.clientY;\r\n      this.$nextTick(() => {\r\n        this.textareaMenuShow = true;\r\n      });\r\n    },\r\n\r\n    sync(index) {\r\n      if (index === 1) {\r\n        this.input = this.output;\r\n      }\r\n    },\r\n\r\n    clear(index) {\r\n      if (index === 0) {\r\n        this.input = \"\";\r\n      } else if (index === 1) {\r\n        this.output = \"\";\r\n      }\r\n    },\r\n\r\n    copy(index) {\r\n      if (index === 0) {\r\n        this.$copyToClipboard(this.input);\r\n      } else if (index === 1) {\r\n        this.$copyToClipboard(this.output);\r\n      }\r\n    },\r\n\r\n    paste(index) {\r\n      if (index === 0) {\r\n        this.input += this.$pasteFromClipboard();\r\n      } else if (index === 1) {\r\n        this.output += this.$pasteFromClipboard();\r\n      }\r\n    },\r\n\r\n    upperCase(index) {\r\n      if (index === 0 && this.input) {\r\n        this.input = this.input.toUpperCase();\r\n      } else if (index === 1 && this.output) {\r\n        this.output = this.output.toUpperCase();\r\n      }\r\n    },\r\n\r\n    lowerCase(index) {\r\n      if (index === 0 && this.input) {\r\n        this.input = this.input.toLowerCase();\r\n      } else if (index === 1 && this.output) {\r\n        this.output = this.output.toLowerCase();\r\n      }\r\n    },\r\n\r\n    clearSpace(index) {\r\n      if (index === 0 && this.input) {\r\n        this.input = this.input.replace(/\\s*/g, \"\");\r\n      } else if (index === 1 && this.output) {\r\n        this.output = this.output.replace(/\\s*/g, \"\");\r\n      }\r\n    },\r\n\r\n    clearLinefeed(index) {\r\n      if (index === 0 && this.input) {\r\n        this.input = this.input.replace(/\\r|\\n/g, \"\");\r\n      } else if (index === 1 && this.output) {\r\n        this.output = this.output.replace(/\\r|\\n/g, \"\");\r\n      }\r\n    },\r\n\r\n    async openFile(index) {\r\n      const result = await this.$openTextFile(\"Open file\");\r\n\r\n      if (result && result.data) {\r\n        if (index === 0) {\r\n          this.input = result.data.toString();\r\n        } else if (index === 1) {\r\n          this.output = result.data.toString();\r\n        }\r\n      }\r\n    },\r\n\r\n    saveTextFile(index) {\r\n      let text;\r\n\r\n      if (index === 0) {\r\n        text = this.input;\r\n      } else if (index === 1) {\r\n        text = this.output;\r\n      }\r\n\r\n      if (text) {\r\n        const buffer = Buffer.from(text);\r\n\r\n        this.$saveFile(buffer, \"Save as\");\r\n      }\r\n    },\r\n\r\n    saveBinaryFile(index) {\r\n      let text;\r\n\r\n      if (index === 0) {\r\n        text = this.input;\r\n      } else if (index === 1) {\r\n        text = this.output;\r\n      }\r\n\r\n      if (text) {\r\n        let hex = text.toLocaleLowerCase().replace(/[^a-f0-9]/g, \"\");\r\n\r\n        const buffer = Buffer.from(hex, \"hex\");\r\n\r\n        this.$saveFile(buffer, \"Save as\");\r\n      }\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style scoped>\r\n/** 触发GPU加速 */\r\n/*\r\n.textarea {\r\n  transform: translate3d(0, 0, 0);\r\n}\r\n*/\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "WXLq":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"WechatDialog.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "X0IW":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"LanguagePicker.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "XB1u":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("urt/");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("4442ca69", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5846b836\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navigation.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5846b836\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navigation.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "YCv2":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AboutDialog.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__("//Fk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__("Dd8w");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router__ = __webpack_require__("/ocq");





//import Home from "@/extensions/ext.app.home/view.component.vue";

__WEBPACK_IMPORTED_MODULE_2_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]);

var homeRoute = {
    name: "ext.app.home",
    path: "/extensions/ext.app.home",
    title: "Home"
};

var router = new __WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]({
    mode: 'hash',
    isAdd: false,
    routes: []
});

router.beforeEach(function (to, from, next) {
    if (router.options.isAdd) {
        next();
    } else {

        router.app.$store.dispatch('loadExtensions').then(function () {
            var routes = filterAsyncRoutes(router.app.$store.getters.extensions);

            router.addRoutes(routes);

            router.options.isAdd = true;

            next(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, to, { replace: true }));
        });
    }
});

function filterAsyncRoutes(extensions) {

    var routes = [];
    var existHome = false;

    if (extensions && extensions.items && extensions.items.length > 0) {
        extensions.items.forEach(function (item, index) {
            var route = {};

            route.name = item.name;
            route.path = item.path;
            route.component = loadComponent(item.name, item.component);
            route.meta = { title: item.title, titles: item.titles, catalog: item.catalog };

            routes.push(route);

            if (!existHome && item.name == homeRoute.name) {
                existHome = true;
            }
        });
    }

    if (existHome) {
        routes.unshift({
            path: '/',
            redirect: '/extensions/' + homeRoute.name + '/'
        });
    }

    return routes;
}

function loadComponent(name, component) {
    var __require = eval('require');

    return function () {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve().then(function () {
            var dir = router.app.$getExtensionsFolder();

            return dir;
        }).then(function (dir) {
            return __require(dir + ('/' + name + '/' + component));
        });
    };
}

//获取原型对象上的push函数
var originalPush = __WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */].prototype.push;

//修改原型对象中的push方法
__WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */].prototype.push = function push(location) {
    return originalPush.call(this, location).catch(function (err) {
        return err;
    });
};

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ "csSS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ghoD":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("yJ1V");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("d1d79cf4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81efc198\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ThemePicker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81efc198\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ThemePicker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "gov5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ExtLoading.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "kId2":
/***/ (function(module, exports) {

module.exports = {
    "renderer": {
        "window": {
            "title": "CaptfEncoder Extensible cross platform network security toolkit"
        },

        "appbar": {
            "menu": {
                "theme": "Theme",
                "language": "Language",
                "extension": "Extension",
                "support_site": "Support site",
                "new_issuse": "New issuse",
                "check_update": "Check update...",
                "about": "About"
            },
            "search": {
                "placeholder": "Search"
            }

        },

        "tab": {
            "menu": {
                "open_in_new_window": "Open in new window",
                "close": "Close",
                "close_other": "Close other",
                "close_all": "Close all"
            }
        },

        "snackbar": {
            "button": {
                "close": "Close"
            }
        },
        "dialog": {
            "about": {
                "title": "About",
                "desc": "Extensible cross platform network security toolkit",
                "version": "Version",
                "build_date": "Build date"
            },
            "check_update": {
                "title": "Check update",
                "current_version": "Current version",
                "download": "Download",
                "new_version": "New version: ",
                "no_updates": "No updates are currently available!"
            },
            "wechat": {
                "title": "Wechat"
            }

        },
        "picker": {
            "theme": {
                "title": "Theme",
                "dark_mode": "Dark mode"
            }
        }
    },
    "command": {
        "file": {
            "image_files": "Image files",
            "all_files": "All files"
        }
    },
    "extension": {
        "editor": {
            "label": {
                "input": "Input:",
                "output": "Output:"
            },
            "menu": {
                "sync": "Sync",
                "clear": "Clear",
                "copy": "Copy",
                "paste": "Paste",
                "upper_case": "Upper case",
                "lower_case": "Lower case",
                "clear_space": "Clear space",
                "clear_line_feed": "Clear line feed",
                "open_file": "Open file",
                "save_as_text_file": "Save as text file",
                "save_as_binary_file": "Save as binary file"
            }
        }
    }
};

/***/ }),

/***/ "lrR8":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("xPt1");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("68c5c383", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e2b0f44\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CheckUpdateDialog .vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e2b0f44\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CheckUpdateDialog .vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "o3s+":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.tab-add-btn[data-v-31ef1e0d] {\r\n  margin-left: 4px;\r\n  margin-top: 4px;\n}\r\n", "", {"version":3,"sources":["E:/MyWsM/W51/CaptfEncoderV2/CaptfEncoderV2-main/renderer.src/src/extendable/componets/src/extendable/componets/ExtTabEncoder.vue"],"names":[],"mappings":";AAgHA;EACA,iBAAA;EACA,gBAAA;CACA","file":"ExtTabEncoder.vue","sourcesContent":["<template>\r\n  <v-card width=\"100%\" height=\"96%\">\r\n    <v-tabs v-model=\"currentTab\">\r\n      <v-tab v-for=\"(tabItem, index) in tabItems\" :key=\"index\">\r\n        {{ tabItem.title + \" \" + (index + 1) }}\r\n        <v-icon size=\"20\" @click=\"removeTab(index)\" v-if=\"currentTab === index\">\r\n          mdi-minus-circle\r\n        </v-icon>\r\n      </v-tab>\r\n      <v-btn icon @click=\"addTab()\" class=\"tab-add-btn\">\r\n        <v-icon size=\"40\"> mdi-plus </v-icon>\r\n      </v-btn>\r\n    </v-tabs>\r\n\r\n    <v-tabs-items v-model=\"currentTab\">\r\n      <v-tab-item v-for=\"(tabItem, index) in tabItems\" :key=\"index\">\r\n        <ext-encoder\r\n          :title=\"title\"\r\n          :options=\"tabItem.options\"\r\n          :schema=\"schema\"\r\n          :encode=\"encode\"\r\n          :decode=\"decode\"\r\n          :encodeText=\"encodeText\"\r\n          :decodeText=\"decodeText\"\r\n        >\r\n        </ext-encoder>\r\n      </v-tab-item>\r\n    </v-tabs-items>\r\n  </v-card>\r\n</template>\r\n<script>\r\nconst _ = require(\"lodash\");\r\n\r\nimport ExtEncoder from \"./ExtEncoder\";\r\n\r\nexport default {\r\n  name: \"ext-tab-encoder\",\r\n\r\n  data() {\r\n    return {\r\n      currentTab: null,\r\n      tabItems: [],\r\n      tabId: 0,\r\n    };\r\n  },\r\n\r\n  props: {\r\n    title: {\r\n      type: String,\r\n      default: \"\",\r\n    },\r\n    options: {\r\n      type: Object,\r\n      default: null,\r\n    },\r\n    schema: {\r\n      type: Object,\r\n      default: null,\r\n    },\r\n    encode: {\r\n      type: String | Function,\r\n      default: null,\r\n    },\r\n    decode: {\r\n      type: String | Function,\r\n      default: null,\r\n    },\r\n\r\n    encodeText: {\r\n      type: String,\r\n      default: \"Encode\"\r\n    },\r\n    decodeText: {\r\n      type: String,\r\n      default: \"Decode\"\r\n    },\r\n  },\r\n\r\n  components: {\r\n    ExtEncoder,\r\n  },\r\n\r\n  created() {\r\n    this.tabItems.push({\r\n      id: this.tabId++,\r\n      title: this.title,\r\n      options: _.cloneDeep(this.options),\r\n    });\r\n  },\r\n  methods: {\r\n    addTab() {\r\n      this.tabItems.push({\r\n        id: this.tabId++,\r\n        title: this.title,\r\n        options: _.cloneDeep(this.options),\r\n      });\r\n\r\n      this.currentTab = this.tabItems.length - 1;\r\n    },\r\n    removeTab(index) {\r\n      this.tabItems.splice(index, 1);\r\n\r\n      if (index <= this.tabItems.length - 1) {\r\n        this.currentTab = index;\r\n      } else {\r\n        this.currentTab = index - 1;\r\n      }\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style scoped>\r\n.tab-add-btn {\r\n  margin-left: 4px;\r\n  margin-top: 4px;\r\n}\r\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "tjjj":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3Fqg");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("09ce6078", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-633a08e5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Search.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-633a08e5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Search.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "urt/":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Navigation.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "xPt1":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CheckUpdateDialog .vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "xhze":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("OCj8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("dec867e8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7ba5bd90\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/sass-loader/dist/cjs.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7ba5bd90\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/sass-loader/dist/cjs.js?{\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "yJ1V":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ThemePicker.vue","sourceRoot":""}]);

// exports


/***/ })

},["NHnr"]);
//# sourceMappingURL=app.ac4ec8047ffd756cf384.js.map