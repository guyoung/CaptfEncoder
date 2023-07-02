<template>
  <v-card class="mx-auto">
    <v-card-text>
      <div class="overline mb-4">{{$t("renderer.dialog.about.title")}}</div>
      <div class="headline mb-1">CaptfEncoder V2</div>
      <div>{{$t("renderer.dialog.about.desc")}}</div>
      <div class="my-3">
        <v-row no-gutters>
          <v-col cols="12" md="3"> {{$t("renderer.dialog.about.version")}} </v-col>
          <v-col cols="12" md="9"> 2.1.0 </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="3"> {{$t("renderer.dialog.about.build_date")}} </v-col>
          <v-col cols="12" md="9"> 2021-06-03 </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AboutDialog",
  data: () => {
    return {};
  },
};
</script>
<style scoped></style>