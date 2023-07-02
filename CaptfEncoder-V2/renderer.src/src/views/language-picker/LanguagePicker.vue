<template>
  <v-card>
    <v-card-title>
      <span class="title font-weight-bold">
        {{ $t("renderer.appbar.menu.language") }}</span
      >
    </v-card-title>

    <v-card-text>
      <v-list-item
        dense
        v-for="(item, index) in getKeys(languages)"
        :key="index"
        @click="setLocale(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{item}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar color="success" size="30" v-if="locale === item">
            <v-icon>mdi-check</v-icon>
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LanguagePicker",
  data: () => ({}),

  computed: {
    ...mapGetters(["locale", "languages"]),
  },

  methods: {
    getKeys(obj) {
      let keys = [];
      for (let key of Object.keys(obj)) {
        keys.push(key);
      }

      return keys;
    },

    setLocale(locale) {
      this.$setLocale(locale);
    },
  },
};
</script>
<style scoped></style>