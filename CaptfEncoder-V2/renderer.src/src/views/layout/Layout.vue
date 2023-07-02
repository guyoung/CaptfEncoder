<template>
  <v-app>
    <v-system-bar
      class="title-bar"
      :height="mode === 'normal' ? 24 : 36"
      color="primary"
      dark
      app
    >
      <span v-if="mode !== 'normal'" class=".subtitle-1 font-weight-bold"
        >CaptfEncoder V2</span
      >
      <v-spacer></v-spacer>
      <v-icon class="mx-3" @click="minimizeWindow">mdi-window-minimize</v-icon>
      <v-icon class="mx-3" @click="maximizeWindow" v-if="!window.maximized"
        >mdi-window-maximize</v-icon
      >
      <v-icon class="mx-3" @click="unmaximizeWindow" v-if="window.maximized"
        >mdi-window-restore</v-icon
      >
      <v-icon class="mx-3" @click="closeWindow">mdi-close</v-icon>
    </v-system-bar>
    <v-app-bar
      v-if="mode === 'normal' && appBarShow === true"
      height="64"
      color="primary"
      dark
      clipped-left
      app
    >
      <v-toolbar-title>
        <v-avatar tile>
          <v-btn @click="navShow = !navShow" text>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-avatar>
        <span class="title font-weight-bold">CaptfEncoder V2</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-form>
          <v-container>
            <v-row dense>
              <v-col>
                <Search />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-btn class="d-md-flex d-none" @click="fullscreen" text>
          <v-icon v-text="fullscreenIcon"></v-icon>
        </v-btn>
        <v-btn class="d-md-flex d-none" @click="openSite" text>
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn class="d-md-flex d-none" @click="openWechat" text>
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text>
              <v-icon>mdi-more</v-icon>
            </v-btn>
          </template>
          <v-list class="menu-more-list">
            <v-list-item @click="themePickerShow = !themePickerShow">
              <v-list-item-icon>
                <v-icon>mdi-palette</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.theme")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="languagePickerShow = !languagePickerShow">
              <v-list-item-icon>
                <v-icon>mdi-note-text</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.language")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="openExtensionsFolder">
              <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.extension")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="openSite">
              <v-list-item-icon>
                <v-icon>mdi-github</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.support_site")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="openIssues">
              <v-list-item-icon>
                <v-icon>mdi-chat-question</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.new_issuse")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="checkUpdate">
              <v-list-item-icon>
                <v-icon>mdi-cloud-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.check_update")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="openAbout">
              <v-list-item-icon>
                <v-icon>mdi-alpha-a-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("renderer.appbar.menu.about")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <Navigation
      v-if="mode === 'normal' && navShow === true"
      :color="navColor"
    />

    <v-main class="divder pb-12">
      <v-expand-transition>
        <v-tabs
          color="secondary"
          style="position: sticky; z-index: 5"
          v-bind:style="{ top: mode === 'normal' ? 88 + 'px' : 24 + 'px' }"
          show-arrows
        >
          <v-tab
            :name="i"
            @contextmenu="showMenu"
            v-for="(item, i) in tabList"
            :key="item.name"
            :to="item.path"
          >
            {{ $getItemLocaleTitle(item) }}
            <v-icon
              size="20"
              v-if="i !== 0"
              @click.stop.prevent="closeTab(i)"
              @contextmenu.stop.prevent=""
              >mdi-close</v-icon
            >
          </v-tab>
        </v-tabs>
      </v-expand-transition>
      <v-menu
        v-if="mode === 'normal'"
        v-model="tabMenuShow"
        :position-x="tabMenuPositionX"
        :position-y="tabMenuPositionY"
        absolute
        offset-y
        min-width="110"
      >
        <v-list dense>
          <v-list-item
            @click="createWindow(tabMenuTargetIndex)"
            v-ripple="{ class: 'secondary--text' }"
          >
            <v-list-item-title>{{
              $t("renderer.tab.menu.open_in_new_window")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="closeTab(tabMenuTargetIndex)"
            v-ripple="{ class: 'secondary--text' }"
          >
            <v-list-item-title>{{
              $t("renderer.tab.menu.close")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="closeOther(tabMenuTargetIndex)"
            v-ripple="{ class: 'secondary--text' }"
          >
            <v-list-item-title>{{
              $t("renderer.tab.menu.close_other")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="closeAll"
            v-ripple="{ class: 'secondary--text' }"
          >
            <v-list-item-title>{{
              $t("renderer.tab.menu.close_all")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-container fluid fill-height class="tab-content-container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </v-main>

    <v-navigation-drawer
      width="640"
      v-model="themePickerShow"
      overlay-opacity="0"
      floating
      temporary
      right
      app
    >
      <ThemePicker />
    </v-navigation-drawer>

    <v-navigation-drawer
      width="240"
      v-model="languagePickerShow"
      overlay-opacity="0"
      floating
      temporary
      right
      app
    >
      <LanguagePicker />
    </v-navigation-drawer>

    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.show"
      :timeout="snackbar.timeout || 6000"
      vertical
      multi-line
      class="snackbar"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="hideSnackbar">
          {{ $t("renderer.snackbar.button.close") }}
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog width="400" v-model="updateDialogShow">
      <CheckUpdateDialog />
    </v-dialog>

    <v-dialog width="400" v-model="wechatDialogShow">
      <WechatDialog />
    </v-dialog>

    <v-dialog width="400" v-model="aboutDialog">
      <AboutDialog />
    </v-dialog>
  </v-app>
</template>

<script>
const _ = require("lodash");
import screenfull from "screenfull";
import { mapGetters, mapActions } from "vuex";
import Navigation from "../navigation/Navigation";
import ThemePicker from "../theme-picker/ThemePicker";
import LanguagePicker from "../language-picker/LanguagePicker";
import Search from "../search/Search";
import WechatDialog from "../dialog/WechatDialog";
import AboutDialog from "../dialog/AboutDialog";
import CheckUpdateDialog from "../dialog/CheckUpdateDialog ";

export default {
  name: "Layout",

  components: {
    Navigation,
    ThemePicker,
    LanguagePicker,
    Search,
    WechatDialog,
    AboutDialog,
    CheckUpdateDialog,
  },

  props: {
    mode: String,
  },

  data() {
    return {
      homeRoute: {
        name: "ext.app.home",
        path: "/extensions/ext.app.home/",
        title: "Home",
        titles: {
          zh: "首页"
        }
      },

      appBarShow: true,
      navShow: true,
      navColor: "primary",
      updateDialogShow: false,
      wechatDialogShow: false,
      aboutDialog: false,

      tabList: [],

      tabMenuShow: false,
      tabMenuPositionX: 0,
      tabMenuPositionY: 0,
      tabMenuTargetIndex: -1,

      fullscreenIcon: "mdi-fullscreen",

      themePickerShow: false,
      languagePickerShow: false,
    };
  },

  created() {
    const index = _.findIndex(this.tabList, function (item) {
      return item.name == this.homeRoute.name;
    });

    if (this.mode === "normal" && index < 0) {   
      this.tabList.push(this.homeRoute);
    }
  },

  mounted() {},

  computed: {
    ...mapGetters(["window", "snackbar"]),
  },

  watch: {
    $route(to) {
      const index = _.findIndex(this.tabList, function (item) {
        return item.name == to.name;
      });

      if (index < 0) {         
        this.tabList.push({
          name: to.name,
          path: to.path,
          title: to.meta.title,
          titles: to.meta.titles,

        });
      }
    },
  },

  methods: {
    ...mapActions(["hideSnackbar"]), 

    maximizeWindow() {
      this.$store.dispatch("maximizeWindow");
    },
    unmaximizeWindow() {
      this.$store.dispatch("unmaximizeWindow");
    },
    minimizeWindow() {
      this.$minimizeWindow();
    },
    closeWindow() {
      this.$closeWindow();
    },

    fullscreen() {
      this.fullscreenIcon = screenfull.isFullscreen
        ? "mdi-fullscreen"
        : "mdi-fullscreen-exit";
      screenfull.toggle();
    },

    openSite() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder");
    },

    openWechat() {
      this.wechatDialogShow = true;
    },

    openIssues() {
      this.$openExternalUrl("https://github.com/guyoung/CaptfEncoder/issues");
    },

    openExtensionsFolder() {
      this.$openExtensionsFolder();
    },
    async checkUpdate() {
      this.updateDialogShow = true;
    },

    openAbout() {
      this.aboutDialog = true;
    },

    showMenu(e) {
      e.preventDefault();
      this.tabMenuTargetIndex = e.target.name;
      this.tabMenuShow = false;
      this.tabMenuPositionX = e.clientX;
      this.tabMenuPositionY = e.clientY;
      this.$nextTick(() => {
        this.tabMenuShow = true;
      });
    },

    createWindow(index) {
      const title = this.tabList[index].title;
      const hash = this.tabList[index].path;
      const query = { layout: "simple" };

      this.$createWindow(title, hash, query);
    },

    closeTab(index) {
      this.tabList.splice(index, 1);

      if (index <= this.tabList.length - 1) {
        this.$router.push(this.tabList[index].path);
      } else {
        this.$router.push(this.tabList[index - 1].path);
      }
    },

    closeOther(index) {
      const tab = this.tabList[index];

      _.remove(this.tabList, (item) => {
        return !(item.name === this.homeRoute.name || item.name === tab.name);
      });
    },

    closeAll() {
      _.remove(this.tabList, (item) => {
        return !(item.name === this.homeRoute.name);
      });

      this.$router.push(this.homeRoute.path);
    },
  },
};
</script>
<style scoped>
.title-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.tab-content-container {
  padding: 10px;
}

.snackbar {
  word-break: break-all;
}

.menu-more-list {
  min-width: 200px;
}

.menu-more-list .v-list-item__content {
  min-width: 120px;
}
</style>