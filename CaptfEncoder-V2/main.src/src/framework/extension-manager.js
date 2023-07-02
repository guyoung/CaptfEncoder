const ipcMain = require('electron').ipcMain;
const ndoeFs = require('fs');
const nodePath = require('path');

const { log } = require('./log');
const { getCwd } = require('./dir');

const homeExtension = {
    name: "ext.app.home",
    path: "/extensions/ext.app.home",
    title: "Home",
};

class ExtensionManager {
    constructor(config) {
        this.config = config;
    }


    init() {      
        ipcMain.handle('ext.mgr.get_extensions', async (event, ...args) => {
            return new Promise((resolve, reject) => {
                try {
                    const catalogs = [...this.extensionCatalogs.values()];
                    const items = [...this.extensionItems.values()];
                 
                    return resolve({
                        catalogs: catalogs,
                        items: items
                    });
                }
                catch (err) {
                    return resolve([]);
                }
            });
        });

        ipcMain.handle('ext.mgr.get_extension_folder', async (event, ...args) => {
            return new Promise((resolve, reject) => {
                try {
                    const path = nodePath.join(getCwd(), 'extensions');

                    return resolve(path)
                }
                catch (err) {
                    return resolve();
                }
            });
        });

        this.loadExtensions();
    }


    loadExtensions() {
        const path = nodePath.join(getCwd(), 'extensions');
        log.info('Extensions dir: ' + path)
        log.info('Load extensions');

        this.extensionCatalogs = new Map();
        this.extensionItems = new Map();      

        if (this.config.catalogs) {
            this.config.catalogs.map((item) => {
                this.extensionCatalogs.set(item.key, {
                    key: item.key,
                    text: item.text,
                    text_lang: item.text_lang,
                    desc: item.desc,                    
                })
            })
        }

        if (ndoeFs.existsSync(path)) {
            const dirList = ndoeFs.readdirSync(path);

            dirList.forEach((dir) => {

                const stat = ndoeFs.statSync(nodePath.join(path, dir));

                if (stat.isDirectory()) {
                    this.loadExtension(dir);
                }
            });
        } else {
            log.error('Not exists extension dir')
        }


    }

    loadExtension(dir) {
        const path = nodePath.join(getCwd(), 'extensions', dir);

        const fsItems = ndoeFs.readdirSync(path);

        const name = dir;
        let component = null;
        let controllers = [];
        let metadata = null;

        fsItems.forEach((fsItem) => {
            const stat = ndoeFs.statSync(nodePath.join(path, fsItem));

            if (stat.isFile() && fsItem == 'package.json') {
                try {
                    const text = ndoeFs.readFileSync(nodePath.join(path, fsItem), 'utf-8');

                    metadata = JSON.parse(text);
                }
                catch {

                }
            }

            else if (stat.isFile() && fsItem.startsWith('view.')) {
                component = fsItem;
            }

            else if (stat.isDirectory() && fsItem == 'controllers') {

                const controllerPath = nodePath.join(getCwd(), 'extensions', dir, fsItem);

                const controllerFsItems = ndoeFs.readdirSync(controllerPath);

                controllerFsItems.forEach((controllerFsItem) => {

                    if (controllerFsItem.endsWith('.js')) {
                        const controllerName = controllerFsItem.substring(0, controllerFsItem.lastIndexOf("."));
                        const controllerFile = name + "/" + fsItem + '/' + controllerFsItem;

                        this.registerController(controllerName, controllerFile);

                        controllers.push(controllerName);
                    }
                })

            }

        });

        if (component || (controllers && controllers.length > 0)) {

            let catalogKey = name.substring(0, dir.lastIndexOf('.'));

            if (name !== homeExtension.name && !this.extensionCatalogs.has(catalogKey)) {
                this.extensionCatalogs.set(catalogKey, {
                    key: catalogKey,
                    text: catalogKey,
                    desc: ''
                });
            }

            let item = {};

            if (metadata) {
                item = { ...metadata };
            }

            item.name = name

            if (catalogKey) {
                item.catalog = catalogKey
            }

            if (component) {
                item.component = component;
            }

            if (controllers) {
                item.controllers = controllers;
            }

            if (!this.extensionItems.has(name)) {
                this.extensionItems.set(name, item);
            }
        }
    }

    registerController(name, file) {

        log.info('Register Controller: ' + name);

        ipcMain.handle(name, async (event, ...args) => {
            try {
                const input = args.length >= 1 ? args[0] : '';
                const options = args.length >= 2 ? (args[1] || {}) : {};

                const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require

                const handler = requireFunc(nodePath.join(getCwd(), 'extensions', file));

                const result = await handler(input, options);

                return result;
            } catch (err) {
                log.error(err.message);
            }
        });
    }
}


module.exports = {
    ExtensionManager: ExtensionManager
}