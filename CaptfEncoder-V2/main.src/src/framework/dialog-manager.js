const path = require('path');
const fs = require('fs');
const { ipcMain, dialog, BrowserWindow } = require('electron');


const { log } = require('./log');
const { getCwd } = require('./dir');

class DialogManager {

    constructor() {

    }

    init() {
        ipcMain.handle('dlg.mgr.open_file', async (event, ...args) => {
            return new Promise((resolve, reject) => {
                try {
                    let options = {};

                    if (args.length > 0) {
                        options = args[0];
                    }

                    options.properties = ['openFile'];

                    const files = dialog.showOpenDialogSync(this.getCurrentWindow(), options);

                    if (files && files.length > 0) {
                        const data = fs.readFileSync(files[0]);
                      
                        const stat = fs.statSync(files[0]);

                        return resolve({
                            file: files[0],
                            size: stat.size,
                            data: data
                        });
                    }

                    return resolve(null);
                }
                catch (err) {
                    return resolve(null);
                }
            });

        });


        ipcMain.handle('dlg.mgr.save_file', async (event, ...args) => {
            return new Promise((resolve, reject) => {
                try {
                    let options = {};

                    if (args.length > 0) {
                        const buffer = args[0];

                        if (args.length > 1) {
                            options = args[1]
                        }
    
                        options.properties = ['createDirectory', 'showOverwriteConfirmation'];
    
                        const file = dialog.showSaveDialogSync(this.getCurrentWindow(), options);
    
                        if (file) {
                            fs.writeFile(file, buffer, err => {
                                if (!err) {
                                    return resolve(file)
                                }
                              });
                        }
                    }  

                    return resolve(null);
                }
                catch (err) {
                    return resolve(null);
                }
            });

        });

    }

    getCurrentWindow() {
        return BrowserWindow.getFocusedWindow()
    }


}

module.exports = {
    DialogManager: DialogManager
}