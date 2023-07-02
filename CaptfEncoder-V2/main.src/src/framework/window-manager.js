
const { app, BrowserWindow, BrowserWindowConstructorOptions } = require('electron');
const path = require('path');
const { EventEmitter } = require('events');
const ipcMain = require('electron').ipcMain;

class WindowManager extends EventEmitter {
    constructor() {
        super();

        this.windows = new Set();

        app.on('browser-window-blur', this.emit.bind(this, 'blur'));
        app.on('browser-window-focus', this.emit.bind(this, 'focus'));
    }

    init() {
        ipcMain.handle('win.mgr.create_window', (event, ...args)=> {
            let title, hash, query;

            if (args.length > 0) {
                title = args[0];
            }

            if (args.length > 1) {
                hash = args[1];
            }

            if (args.length > 2) {
                query = args[2];
            }

            this.createWindow(title, hash, query);

            return true;
        });

        ipcMain.handle('win.mgr.maximize_window', (event, ...args)=> {
            this.getCurrentWindow().maximize();

            return true;
        });

        ipcMain.handle('win.mgr.unmaximize_window', (event, ...args)=> {
            this.getCurrentWindow().unmaximize();

            return true;
        });

        ipcMain.handle('win.mgr.minimize_window', (event, ...args)=> {
            this.getCurrentWindow().minimize();

            return true;
        });

        ipcMain.handle('win.mgr.close_window', (event, ...args)=> {
            this.getCurrentWindow().close();

            return true;
        });

    }

    getCurrentWindow() {
        return BrowserWindow.getFocusedWindow()
    }

    createWindow(title, hash, query) {
        const option = {
            title: title,
            width: 800,
            height: 600,
            resizable: true,
            fullscreen: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        }

        const newWindow = new BrowserWindow(option)
        if (!option.show) {
            newWindow.once('ready-to-show', () => {
                newWindow.show()
            })
        }


        newWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'), {
            hash: hash,
            query: query
        })

        this._register(newWindow)

        return newWindow
    }

    _register(win) {
        this.windows.add(win);

        win.on('closed', () => {
            this.windows.delete(win);

            if (!BrowserWindow.getFocusedWindow()) {
                this.emit('blur')
            }
        });

        this.emit('focus');
    }

    dispatch(action, args) {
        this.windows.forEach(win => {
            if (win && win.webContents) {
                win.webContents.send('action', action, args)
            }
        })
    }
}


module.exports = {
    WindowManager: WindowManager
}