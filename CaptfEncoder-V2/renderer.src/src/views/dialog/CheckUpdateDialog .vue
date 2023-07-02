<template>
  <v-card class="mx-auto" min-width="360">
    <v-card-text>
      <ext-loading absolute :show="loading"></ext-loading>
      <div class="overline mb-4">{{$t("renderer.dialog.check_update.title")}}</div>
      <div class="headline mb-1">CaptfEncoder V2</div>
      <div>{{$t("renderer.dialog.about.desc")}}</div>
      <div>
        <v-row no-gutters class="my-4">
          <v-col cols="12" md="4"> {{$t("renderer.dialog.check_update.current_version")}} </v-col>
          <v-col cols="12" md="8"> {{ localVersion }}</v-col>
        </v-row>
        <v-row no-gutters class="my-4" v-if="!needUpdate">
          <v-col cols="12"> {{ message }}</v-col>
        </v-row>
        <v-row no-gutters class="my-4" v-if="needUpdate">
          <v-col cols="12" md="6"> {{ message }} </v-col>
          <v-col cols="12" md="6">
            <v-btn class="ma-1" plain @click="download"> {{$t("renderer.dialog.check_update.download")}} </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CheckUpdateDialog",
  data: () => {
    return {
      loading: false,
      needUpdate: false,
      localVersion: "",
      message: "",
      updateUrl: "",
    };
  },
  async mounted() {
    this.loading = true;
    const result = await this.$checkUpdate();

    if (result && result.needUpdate) {
      this.needUpdate = true;
      this.localVersion = result.localVersion;
      this.message = this.$t("renderer.dialog.check_update.new_version") + result.serverVersion;
      this.updateUrl = result.updateUrl;
    } else {
      this.needUpdate = false;
      this.localVersion = result.localVersion;
      this.message = this.$t("renderer.dialog.check_update.no_updates");
    }
    this.loading = false;
  },

  methods: {
    download() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder");
    },
  }
};
</script>
<style scoped></style>