<template>
  <div>
    <layout :mode="layoutMode" />
  </div>
</template>

<script>
import Layout from "./views/layout/Layout";

const querystring = require("querystring");

export default {
  name: "App",

  components: {
    Layout,
  },

  data() {
    return {
      layoutMode: "normal",
    };
  },

  beforeCreate() {},

  created() {
    const query = querystring.parse(global.location.search);

    this.layoutMode = query["?layoutMode"]; 


    this.$store.dispatch("loadConfiguration").then(() => {   
      this.$initLocale();

      this.$setTheme();
      this.$setThemeDark();
    });
  
  },

  beforeMount() {},

  mounted() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  beforeDestroy() {},

  destroyed() {},

  computed: {},

  watch: {},

  methods: {},
};
</script>

<style lang="scss">
html {
  height: 100%;
  overflow-y: auto !important;
}

button {
  -webkit-app-region: no-drag;
}

// 去除Google游览器自动填充账号出现的背景

input {
  background-color: transparent !important;
}
input:-webkit-autofill {
  -webkit-transition: background-color 1s ease-in-out 6000s;
  -webkit-text-fill-color: #fff !important;
}

.v-application {
  font-family: system, -apple-system, ".SFNSText-Regular", "SF UI Text",
    "Lucida Grande", "Segoe UI", Ubuntu, Cantarell, sans-serif;
}

// 清除vuetify的默认pre下的code伪元素和阴影
.v-application pre > code {
  box-shadow: none;
  &::before,
  &::after {
    content: none;
  }
}
pre[class*="language-"] {
  margin: auto 0 !important;
}

.v-tab,
.v-btn {
  text-transform: none !important;
}

.v-bottom-black-bar {
  // 适应底部小黑条
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}

// 分页
.v-pagination .v-pagination__item {
  outline: none;
}

// fix

.v-application--wrap {
  backface-visibility: visible !important;
  -webkit-backface-visibility: visible !important;
}
</style>
