// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

const bootstrap = require('./framework/bootstrap');
const {getCwd} = require('./framework/dir');

function createWindow() {



  if (process.env.NODE_ENV === 'production') {
    Menu.setApplicationMenu(null);
  } else {

  }


  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    resizable: true,
    frame: process.env.NODE_ENV !== 'production',
    webPreferences: {
      //webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: __dirname + "/icons/app_ico.ico"
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'), {
    query: { "layoutMode": "normal" }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    //process.env.NODE_ENV == "development" ? mainWindow.webContents.openDevTools() : "";
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// whenReady: 当 Electron 完成初始化时被触发
app.whenReady().then(() => {

  try {
  
    bootstrap.startup();

    createWindow();


    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  } catch(err){
    dialog.showErrorBox('Error', err.message)
  }
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// window-all-closed: 所有窗口被关闭
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.