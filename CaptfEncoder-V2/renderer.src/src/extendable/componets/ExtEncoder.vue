<template>
  <v-container fluid>
    <ext-loading absolute :show="loading"></ext-loading>
    <ext-form :model="options" :schema="schema" v-if="schema && options">
    </ext-form>

    <v-row dense justify="end">
      <v-btn-toggle v-model="toggleEncode">
        <v-btn elevation="2" height="32" v-if="encode">{{ encodeText }}</v-btn>
        <v-btn elevation="2" height="32" v-if="decode">{{ decodeText }}</v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
          class="textarea"
          v-model="input"
          rows="10"
          solo
          :label="$t('extension.editor.label.input')"
          height="100%"
          spellcheck="false"
          @contextmenu="showInputMenu"
        ></v-textarea>
      </v-col>
      <v-col>
        <v-textarea
          class="textarea"
          v-model="output"
          rows="10"
          readonly
          solo
          :label="$t('extension.editor.label.output')"
          height="100%"
          spellcheck="false"
          @contextmenu="showOutputMenu"
        ></v-textarea>
      </v-col>
    </v-row>
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
          v-if="textareaMenuTargetIndex === 1"
          @click="sync(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-file-remove-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{$t("extension.editor.menu.sync")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="clear(textareaMenuTargetIndex)"
          v-ripple="{ class: 'secondary--text' }"
        >
          <v-list-item-icon>
            <v-icon>mdi-delete-empty-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{$t("extension.editor.menu.clear")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.copy")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.paste")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.upper_case")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.lower_case")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.clear_space")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.clear_line_feed")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.open_file")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.save_as_text_file")}}</v-list-item-title>
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
            <v-list-item-title>{{$t("extension.editor.menu.save_as_binary_file")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>
<script>
import ExtForm from "./ExtForm";
import ExtLoading from "./ExtLoading";

export default {
  name: "ext-encoder",

  components: {
    ExtForm,
    ExtLoading,
  },

  data: () => ({
    toggleEncode: 0,
    input: "",
    output: "",
    loading: false,

    textareaMenuShow: false,
    textareaMenuPositionX: 0,
    textareaMenuPositionY: 0,
    textareaMenuTargetIndex: -1,
  }),

  props: {
    options: {
      type: Object,
      default: null,
    },
    schema: {
      type: Object,
      default: null,
    },
    encode: {
      type: String | Function,
      default: null,
    },
    decode: {
      type: String | Function,
      default: null,
    },

    encodeText: {
      type: String,
      default: "Encode",
    },
    decodeText: {
      type: String,
      default: "Decode",
    },
  },

  watch: {
    async input(newVal, oldVal) {
      await this.invoke();
    },

    async toggleEncode(newVal, oldVal) {
      await this.invoke();
    },

    options: {
      async handler(newValue, oldValue) {
        await this.invoke();
      },
      deep: true,
    },
  },

  created() {
   
  },

  mounted() {},

  methods: {
    async invoke() {
      try {
        this.showLoading();
        this.$store.dispatch("hideSnackbar");

        //await this.$sleep(1000*10);

        let result = null;

        //console.log("invoke");
        //console.log(this.encode, this.input, this.options);

        if (this.toggleEncode === 0 && this.encode) {
          let handler = this.encode;
          if (typeof this.encode === "function") {
            handler = this.encode(this.options);
          }

          if (handler) {
            result = await this.$extInvoke(handler, this.input, this.options);
          }
        } else if (this.toggleEncode === 1 && this.decode) {
          let handler = this.decode;

          if (typeof this.decode === "function") {
            handler = this.decode(this.options);
          }

          if (handler) {
            result = await this.$extInvoke(handler, this.input, this.options);
          }
        }
        if (result) {
          if (result.success) {
            this.output = result.output;
          } else {
            this.output = "";
            if (result && result.message) {
              this.$store.dispatch("showSnackbar", result.message);
            }
            
          }
        } else {
          this.output = "";
        }

        this.hideLoading();
      } catch (err) {
        this.hideLoading();
        this.output = "";
        this.$store.dispatch("showSnackbar", err.message);
      }
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    showInputMenu(e) {
      e.preventDefault();
      this.textareaMenuTargetIndex = 0;
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(() => {
        this.textareaMenuShow = true;
      });
    },
    showOutputMenu(e) {
      e.preventDefault();
      this.textareaMenuTargetIndex = 1;
      this.textareaMenuShow = false;
      this.textareaMenuPositionX = e.clientX;
      this.textareaMenuPositionY = e.clientY;
      this.$nextTick(() => {
        this.textareaMenuShow = true;
      });
    },

    sync(index) {
      if (index === 1) {
        this.input = this.output;
      }
    },

    clear(index) {
      if (index === 0) {
        this.input = "";
      } else if (index === 1) {
        this.output = "";
      }
    },

    copy(index) {
      if (index === 0) {
        this.$copyToClipboard(this.input);
      } else if (index === 1) {
        this.$copyToClipboard(this.output);
      }
    },

    paste(index) {
      if (index === 0) {
        this.input += this.$pasteFromClipboard();
      } else if (index === 1) {
        this.output += this.$pasteFromClipboard();
      }
    },

    upperCase(index) {
      if (index === 0 && this.input) {
        this.input = this.input.toUpperCase();
      } else if (index === 1 && this.output) {
        this.output = this.output.toUpperCase();
      }
    },

    lowerCase(index) {
      if (index === 0 && this.input) {
        this.input = this.input.toLowerCase();
      } else if (index === 1 && this.output) {
        this.output = this.output.toLowerCase();
      }
    },

    clearSpace(index) {
      if (index === 0 && this.input) {
        this.input = this.input.replace(/\s*/g, "");
      } else if (index === 1 && this.output) {
        this.output = this.output.replace(/\s*/g, "");
      }
    },

    clearLinefeed(index) {
      if (index === 0 && this.input) {
        this.input = this.input.replace(/\r|\n/g, "");
      } else if (index === 1 && this.output) {
        this.output = this.output.replace(/\r|\n/g, "");
      }
    },

    async openFile(index) {
      const result = await this.$openTextFile("Open file");

      if (result && result.data) {
        if (index === 0) {
          this.input = result.data.toString();
        } else if (index === 1) {
          this.output = result.data.toString();
        }
      }
    },

    saveTextFile(index) {
      let text;

      if (index === 0) {
        text = this.input;
      } else if (index === 1) {
        text = this.output;
      }

      if (text) {
        const buffer = Buffer.from(text);

        this.$saveFile(buffer, "Save as");
      }
    },

    saveBinaryFile(index) {
      let text;

      if (index === 0) {
        text = this.input;
      } else if (index === 1) {
        text = this.output;
      }

      if (text) {
        let hex = text.toLocaleLowerCase().replace(/[^a-f0-9]/g, "");

        const buffer = Buffer.from(hex, "hex");

        this.$saveFile(buffer, "Save as");
      }
    },
  },
};
</script>
<style scoped>
/** 触发GPU加速 */
/*
.textarea {
  transform: translate3d(0, 0, 0);
}
*/
</style>