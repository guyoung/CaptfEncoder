<template>
  <v-container fluid>
    <v-textarea
      class="textarea"
      :value="textVal"
      @input="inputText"
      rows="10"
      solo
      :label="label"
      :readonly="readonly"
      height="100%"
      spellcheck="false"
      @contextmenu="showMenu"
    ></v-textarea>

    <v-menu
      v-model="textareaMenuShow"
      :position-x="textareaMenuPositionX"
      :position-y="textareaMenuPositionY"
      absolute
      offset-y
      min-width="160"
    >
      <v-list dense>
        <v-list-item
          @click="clear(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-delete-empty-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.clear")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="copy(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-content-copy</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.copy")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="paste(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-content-paste</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.paste")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="upperCase(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-format-letter-case-upper</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.upper_case")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="lowerCase(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-format-letter-case-lower</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.lower_case")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="clearSpace(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-tray-remove</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.clear_space")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="clearLinefeed(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-remove</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.clear_line_feed")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="openFile(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-file-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.open_file")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="saveTextFile(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-content-save-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.save_as_text_file")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="saveBinaryFile(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-content-save</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("extension.editor.menu.save_as_binary_file")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>
<script>
export default {
  name: "ext-editor",

  components: {},

  data: () => ({
    textareaMenuShow: false,
    textareaMenuPositionX: 0,
    textareaMenuPositionY: 0,
  }),

  model: {
    prop: "textVal",
    event: "textChange",
  },

  props: {
    textVal: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },

    readonly: {
      type: Boolean,
      default: false,
    },
  },

  created() {},

  mounted() {},

  computed: {},

  methods: {
    inputText(val) {
      this.$emit("textChange", val);
    },

    showMenu(e) {
      e.preventDefault();
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(() => {
        this.textareaMenuShow = true;
      });
    },

    clear() {
      const val = "";

      this.$emit("textChange", val);
    },

    copy() {
      this.$copyToClipboard(this.textVal);
    },

    paste() {
      const val = this.textVal + this.$pasteFromClipboard();

      this.$emit("textChange", val);
    },

    upperCase() {
      if (this.textVal) {
        const val = this.textVal.toUpperCase();

        this.$emit("textChange", val);
      }
    },

    lowerCase() {
      if (this.textVal) {
        const val = this.textVal.toLowerCase();
        this.$emit("textChange", val);
      }
    },

    clearSpace() {
      if (this.textVal) {
        const val = this.textVal.replace(/\s*/g, "");
        this.$emit("textChange", val);
      }
    },

    clearLinefeed() {
      if (this.textVal) {
        const val = this.textVal.replace(/\r|\n/g, "");
        this.$emit("textChange", val);
      }
    },

    async openFile() {
      const result = await this.$openTextFile("Open file");

      if (result && result.data) {
        this.$emit("textChange", result.data);
      }
    },

    saveTextFile() {
      if (this.textVal) {
        const buffer = Buffer.from(this.textVal);

        this.$saveFile(buffer, "Save as");
      }
    },

    saveBinaryFile() {
      if (this.textVal) {
        let hex = this.textVal.toLocaleLowerCase().replace(/[^a-f0-9]/g, "");

        const buffer = Buffer.from(hex, "hex");

        this.$saveFile(buffer, "Save as");
      }
    },
  },
};
</script>
<style scoped>
</style>