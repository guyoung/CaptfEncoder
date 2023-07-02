<template>
  <v-card width="100%" height="96%">
    <v-tabs v-model="currentTab">
      <v-tab v-for="(tabItem, index) in tabItems" :key="index">
        {{ tabItem.title + " " + (index + 1) }}
        <v-icon size="20" @click="removeTab(index)" v-if="currentTab === index">
          mdi-minus-circle
        </v-icon>
      </v-tab>
      <v-btn icon @click="addTab()" class="tab-add-btn">
        <v-icon size="40"> mdi-plus </v-icon>
      </v-btn>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item v-for="(tabItem, index) in tabItems" :key="index">
        <ext-encoder
          :title="title"
          :options="tabItem.options"
          :schema="schema"
          :encode="encode"
          :decode="decode"
          :encodeText="encodeText"
          :decodeText="decodeText"
        >
        </ext-encoder>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
const _ = require("lodash");

import ExtEncoder from "./ExtEncoder";

export default {
  name: "ext-tab-encoder",

  data() {
    return {
      currentTab: null,
      tabItems: [],
      tabId: 0,
    };
  },

  props: {
    title: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: null,
    },
    schema: {
      type: Object,
      default: null,
    },
    encode: {
      type: String | Function,
      default: null,
    },
    decode: {
      type: String | Function,
      default: null,
    },

    encodeText: {
      type: String,
      default: "Encode"
    },
    decodeText: {
      type: String,
      default: "Decode"
    },
  },

  components: {
    ExtEncoder,
  },

  created() {
    this.tabItems.push({
      id: this.tabId++,
      title: this.title,
      options: _.cloneDeep(this.options),
    });
  },
  methods: {
    addTab() {
      this.tabItems.push({
        id: this.tabId++,
        title: this.title,
        options: _.cloneDeep(this.options),
      });

      this.currentTab = this.tabItems.length - 1;
    },
    removeTab(index) {
      this.tabItems.splice(index, 1);

      if (index <= this.tabItems.length - 1) {
        this.currentTab = index;
      } else {
        this.currentTab = index - 1;
      }
    },
  },
};
</script>
<style scoped>
.tab-add-btn {
  margin-left: 4px;
  margin-top: 4px;
}
</style>