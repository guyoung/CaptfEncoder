const ndoeFs = require('fs');
const nodePath = require('path');
const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');

const { log } = require('./log');
const { getCwd } = require('./dir');

class ConfigurationManager {

    constructor() {
        this.store = new Store({
            cwd: nodePath.join(getCwd(), 'config')
        });        
    }

    init() {       
        
        ipcMain.handle('cfg.mgr.getAll', async (event, ...args) => {
            const result = {...this.store.store}
            result.languages = this.languages;
            result.themes = this.themes;
            result.catalogs = this.catalogs;

            return result;
        });  

        ipcMain.handle('cfg.mgr.get', async (event, ...args) => {
            const key = args.length >= 1 ? args[0] : '';

            return this.store.get(key)
        });      

        ipcMain.handle('cfg.mgr.set', async (event, ...args) => {
            const key = args.length >= 1 ? args[0] : '';
            const val = args.length >= 2 ? (args[1] || '') : '';

            this.store.set(key, val);

            return true;
        });

        this.loadLanguages();
        
        this.loadExtensionCatalogs();        

        this.loadThemes();

    }

    loadLanguages() {
        const dir = nodePath.join(getCwd(), 'config', 'language');

        const fsItems = ndoeFs.readdirSync(dir);

        let languages = {};


        fsItems.forEach((fsItem) => {
            const stat = ndoeFs.statSync(nodePath.join(dir, fsItem));

            if (stat.isFile() && fsItem.endsWith('json')) {
                const name = fsItem.substring(0, fsItem.lastIndexOf("."));

                try {
                    const text = ndoeFs.readFileSync(nodePath.join(dir, fsItem), 'utf-8');
                  
                    languages[name] = JSON.parse(text);
                }
                catch {

                }
            }

        });

        this.languages = languages;

    }


    loadExtensionCatalogs() {
        const file = nodePath.join(getCwd(), 'config', 'extension.catalog.json');

        try {
            const text = ndoeFs.readFileSync(file , 'utf-8');

            this.catalogs = JSON.parse(text);
        }
        catch {

        }
      
    } 

    
    loadThemes() {
        const file = nodePath.join(getCwd(), 'config', 'theme.json');

        try {
            const text = ndoeFs.readFileSync(file , 'utf-8');

            this.themes = JSON.parse(text);

        }
        catch {

        }
    }



    get(key) {
        return this.store.get(key)
    }

    set(key, val) {
        this.store.set(key, val);

        return true;
    }



}

module.exports = {
    ConfigurationManager: ConfigurationManager
}