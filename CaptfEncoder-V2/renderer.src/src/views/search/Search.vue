<template>
  <v-autocomplete
    v-model="selected"
    :items="extensions"
    item-text="title"
    return-object
    hide-no-data
    hide-selected
    :placeholder="$t('renderer.appbar.search.placeholder')"
    background-color="accent"
    rounded
    dense
    clearable
    height="40"
    @change="changeItem"
  >
    <template slot="selection" slot-scope="selected">
      <span v-text="selected.title" v-if="selected"></span>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  name: "Search",
  props: {},
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    extensions: function () {
      let result = [];

      const items = this.$store.getters.extensions.items;
      const locale = this.$store.getters.locale;

      if (items) {
        items.forEach((item, index) => {
          let title = item.title;

          if (item.titles && item.titles[locale]) {
            title = item.titles[locale];
          }

          result.push({
            title: title,
            path: item.path,
          });
        });
      }

      return result;
    },
  },
  watch: {
    selected(newSelected, oldSelected) {},
  },
  methods: {
    changeItem() {
      if (this.selected) {
        this.$router.push(this.selected.path);
        this.selected = null;
      }
    },
  },
};
</script>
<style scoped>
</style>