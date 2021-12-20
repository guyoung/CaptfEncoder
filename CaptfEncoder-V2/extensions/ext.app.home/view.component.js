const ascii = require('./ascii.component');
const web = require('./web.component');
const hash = require('./hash.component');

module.exports = {
  name: "ext.app.home.view.component",
  data: () => ({
    tab: null,
  }),
  components: {
    ascii,
    web,
    hash
  },
  template: `

<v-card width="100%" height="96%">
  <v-tabs v-model="tab">
    <v-tab>ASCII</v-tab>
    <v-tab>Web</v-tab>
    <v-tab>Hash</v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
    <v-tab-item>
      <ascii />
    </v-tab-item>
    <v-tab-item>
      <web />
    </v-tab-item>  
    <v-tab-item>
        <hash />
    </v-tab-item>
  </v-tabs-items>
</v-card>

`,

  watch: {},

  created() {},

  mounted() {},

  methods: {},
};
