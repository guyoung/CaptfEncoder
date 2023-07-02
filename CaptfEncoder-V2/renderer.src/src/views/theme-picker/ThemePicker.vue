<template>
  <v-card>
     <v-card-title>
         <span class="title font-weight-bold">{{$t("renderer.picker.theme.title")}}</span>
     </v-card-title>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{$t("renderer.picker.theme.dark_mode")}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch :value="theme.dark" @change="setThemeDark" />
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-card-text>
      <v-card
        class="my-2"
        :disabled="theme.name === item.name"
        @click="setTheme(item.name)"
        hover
        outlined
        v-for="(item, index) in themes"
        :key="index"
      >
        <v-list-item dense>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-avatar
              color="success"
              size="30"
              v-if="theme.name === item.name"
            >
              <v-icon>mdi-check</v-icon>
            </v-avatar>
          </v-list-item-action>
        </v-list-item>

        <v-row class="my-2" dense>
          <v-col>
            <v-chip
              class="mx-1"
              label
              :color="item.light[key]"
              v-for="(key, index) in Object.keys(item.light)"
              :key="index"
            >
              {{ key }}</v-chip
            >
          </v-col>
        </v-row>
        <v-row class="my-2" dense>
          <v-col>
            <v-chip
              class="mx-1"
              label
              :color="item.dark[key]"
              v-for="(key, index) in Object.keys(item.dark)"
              :key="index"
            >
              {{ key }}</v-chip
            >
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThemePicker",
  data: () => ({
    currentTheme: "",
   
  }),
  computed: {
   
    ...mapGetters(
    ["theme", "themes"]),
  },

  methods: {
   setTheme(themeName) {
     this.$setTheme(themeName)
   },
   setThemeDark() {  
     this.$setThemeDark(!this.theme.dark)
   }
  },
};
</script>
<style scoped></style>