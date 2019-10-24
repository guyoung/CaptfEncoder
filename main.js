const electron = require("electron");
const Menu = electron.Menu;

var client;

const app = electron.app;

const protocol = electron.protocol;

const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  Menu.setApplicationMenu(null);

  protocol.interceptFileProtocol(
    "file",
    function(req, callback) {
      var url = req.url.substr(7);
      callback({ path: path.normalize(__dirname + url) });
    },
    function(error) {
      if (error) {
        console.error("Failed to register protocol");
      }
    }
  );

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    title: "CaptfEncoder",
    titleBarStyle: "hidden-inset",
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false
    },
    icon: __dirname + "/icons/app_ico.ico"
  });

  mainWindow.loadURL(
    url.format({
      pathname: "app/index.html",
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
