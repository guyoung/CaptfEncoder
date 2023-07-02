const { app } = require('electron');
const path = require('path');

function getCwd() {
    let dir;

    if (process.platform === 'darwin') {
        if (app.getAppPath().indexOf('/Contents/Resources/') > -1) {
            dir = path.join(app.getAppPath(), '/../../../../');

        } else {
            dir = process.env.PORTABLE_EXECUTABLE_DIR;

            if (!dir) {
                dir = process.cwd();
            }
        }


    } else {
        dir = process.env.PORTABLE_EXECUTABLE_DIR;

        if (!dir) {
            dir = process.cwd();
        }
    }




    return dir;
}

module.exports = {
    getCwd: getCwd
}