<template>
  <v-row>
    <ext-form-field
      v-for="(field, index) in schema.fields"
      :key="index"
      :field="field"
      v-model="model[field.key]"
    ></ext-form-field>
  </v-row>
</template>
<script>
import ExtFormField from "./ExtFormField";

export default {
  name: "ext-form",
  props: {
    model: Object,
    schema: Object,
  },
  components: {
    ExtFormField,
  },

  data() {
    return {};
  },
  created: function () {},

  methods: {},
};
</script>