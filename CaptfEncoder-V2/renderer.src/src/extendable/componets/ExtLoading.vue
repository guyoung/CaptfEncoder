<template>
  <v-overlay :absolute="absolute" :value="show" v-bind="options.overlayProps">
    <v-progress-circular v-bind="options.spinnerProps"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {  
  name: "ext-loading",
  props: {
    show: Boolean,
    absolute: Boolean,
  },
  data() {
    return {     
      options: {
         spinnerProps: {
          color: "primary",
          value: 100,
          indeterminate: true,
          size: 80,
        },
        overlayProps: {},
      },
    };
  },
  
};
</script>

<style></style>