const electron = require("electron");
const Menu = electron.Menu;

var client;
// Module to control application life.
const app = electron.app;
// Connect to live update if LIVE_UPDATE env variable is true
if (process.env.LIVE_UPDATE === "true") {
  app.commandLine.appendSwitch("remote-debugging-port", "8315");
  client = require("electron-connect").client;
}
const protocol = electron.protocol;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const template = [
  {
    label: "File",
    submenu: [{ role: "quit" }]
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "about",
        click() {
          require("electron").shell.openExternal(
            "https://github.com/guyoung/CaptfEncoder"
          );
        }
      }
    ]
  }
];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  //Menu.setApplicationMenu(null);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  //Intercept any urls on the page and find the file on disk instead
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

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    title: 'CaptfEncoder',
    titleBarStyle: "hidden-inset",
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否集成 Nodejs
      webSecurity: false
    },
    icon: __dirname + '/icons/app_ico.ico',
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: "app/index.html",
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  if (process.env.OPEN_DEV_TOOLS === "true") {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Connect to live update if LIVE_UPDATE env variable is true
  if (client) {
    client.create(mainWindow, { sendBounds: false });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
