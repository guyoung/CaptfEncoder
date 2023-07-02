const nodePath = require('path');

const { PythonShell } = require('python-shell');

function pythonExecute(path, args=[], pythonPath) {      
    return new Promise((resolve, reject) => {             
        if(!pythonPath) {
            pythonPath = 'python'
        }        

        let options = {
            mode: 'text',
            pythonPath: pythonPath,
            scriptPath: nodePath.join(getCwd(), 'extensions'),
            pythonOptions: ['-u'],
            args: args
        };  

        PythonShell.run(path, options, function (err, results) {
            if (err) {
                reject(err)
            }

            resolve(results);
        });
    });
   
}

function getCwd() {
    let dir = process.env.PORTABLE_EXECUTABLE_DIR;

    if (!dir) {
        dir = process.cwd();
    }

    return dir;
}

module.exports = pythonExecute