<template>
  <v-navigation-drawer
    width="300"  
    :color="color"   
    hide-overlay
    clipped
    app
    
  >
    <v-list class="nav-list">
      <template v-for="item1 in navItems">
        <v-list-group
          class="white--text"
          v-if="item1.items.length"
          :key="item1.name"
          prepend-icon="mdi-folder"
          :active-class="$vuetify.theme.dark
              ? 'white--text'
              : 'grey--text text--darken-3'
          "
          :group="item1.name"
          v-model="activedGroups[item1.name]"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="$getItemLocaleTitle(item1)"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item2 in item1.items"
            :key="item2.name"
            active-class="secondary white--text"
            :to="item2.path"
            v-on:click="activedGroups[item1.name] = true"
            dense
          >
            <v-list-item-action><v-icon >mdi-file</v-icon></v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="$getItemLocaleTitle(item2)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          :key="item1.name"
          active-class="secondary white--text"
          :to="item1.path"
          v-else
        >
          <v-list-item-action
            ><v-icon>mdi-speedometer</v-icon></v-list-item-action
          >
          <v-list-item-content>
            <v-list-item-title v-text="$getItemLocaleTitle(item1)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  props: {
    color: String,
  },
  data() {
    return {
      activedGroups: {

      }
    };
  },
  computed: {
    ...mapGetters(["navItems"]),
  },
  methods: {
    
  }
};
</script>
<style scoped>

</style>
