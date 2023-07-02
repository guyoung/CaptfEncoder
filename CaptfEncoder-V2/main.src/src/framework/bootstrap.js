
const { log } = require('./log');
const { ConfigurationManager } = require('./configuration-manager');
const { ExtensionManager } = require('./extension-manager');
const { UpdateManager } = require('./update-manager');
const { WindowManager } = require('./window-manager');
const { DialogManager } = require('./dialog-manager');

module.exports = {
    startup() {
        const configurationManager = new ConfigurationManager();
        configurationManager.init();      

        const extensionManager = new ExtensionManager(configurationManager);
        extensionManager.init();
      
        
        const updateManager = new UpdateManager();
        updateManager.init();

        const windowManager = new WindowManager();
        windowManager.init();

        const dialogManager = new DialogManager();
        dialogManager.init();   
    }
}