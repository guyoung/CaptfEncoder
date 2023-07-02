const path = require('path');
const fs = require('fs');
const axios = require("axios");
const ipcMain = require('electron').ipcMain;

const { log } = require('./log');
const { getCwd } = require('./dir');


class UpdateManager {

    constructor() {
        this.updateUrl = 'https://github.com/guyoung/CaptfEncoder'
    }

    init() {
        ipcMain.handle('upd.mgr.check_update', async (event, ...args) => {
            const result = await this.checkUpdate();

            return result;

        });
    }

    async checkUpdate() {
        let needUpdate = false;

        const localInfo = this.getLocal();
        const serverInfo = await this.getServer();

        //console.log(serverInfo, serverInfo.productVersions)

        

        let localVersion, localVersionNumber=0, serverVersion, serverVersionNumber=0;

        if (localInfo && localInfo.productVersions && localInfo.productVersions.length > 0) {
            localVersion = localInfo.productVersions[0].version;
            localVersionNumber = localInfo.productVersions[0].versionNumber;
        }

        if (serverInfo && serverInfo.productVersions && serverInfo.productVersions.length > 0) {
            serverVersion = serverInfo.productVersions[0].version;
            serverVersionNumber = serverInfo.productVersions[0].versionNumber;
        }

        if (serverVersionNumber > localVersionNumber) {
            needUpdate = true;
        }


        if (needUpdate) {
            return {
                needUpdate: true,
                localVersion: localVersion,
                serverVersion: serverVersion,
                updateUrl: this.updateUrl
            }
        } else {
            return {
                needUpdate: false,
                localVersion: localVersion,
                serverVersion: serverVersion,
            }
        }
    }

    getLocal() {
        var file = path.join(getCwd(), 'product.json');

        try {         
            var data = fs.readFileSync(file, "utf8");         
            var json = JSON.parse(data);

            return json;
        } catch(err) { 
            return;
        }
    }

    async getServer() {
        const url =
            'https://raw.githubusercontent.com/guyoung/CaptfEncoder/master/product.json';

        try {
            const response = await axios.get(url);           
            return response.data;
        } catch (err) {          
            return null;
        }
    }
}

module.exports = {
    UpdateManager: UpdateManager
}