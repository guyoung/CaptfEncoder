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
           <slot></slot>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>

export default {
  name: "ext-tab",

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
  },

  components: {
   
  },

  created() {
    this.tabItems.push({
      id: this.tabId++,
      title: this.title,
     
    });
  },
  methods: {
    addTab() {
      this.tabItems.push({
        id: this.tabId++,
        title: this.title,
       
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