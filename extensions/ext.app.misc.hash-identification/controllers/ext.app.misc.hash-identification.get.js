const defaultValue = require('../../ext.common/default-value');
const pythonExecute = require('../../ext.common/python-execute');

module.exports = async function (input, options = {}) {
    try {
        let output = '';

        if (input && input.length > 0) {
            const results = await pythonExecute('ext.app.misc.hash-identification/python/get.py', [input], 'python3');

            if (results && results.length > 1) {
                const data = JSON.parse(results[1]);

                if (data) {                   
                    data.forEach((item,index)=>{                      
                        output+= `name: ${item.name}, hashcat: ${item.hashcat}\r\n`;                       
                    });                 

                }
            }

        }

        return {
            success: true,
            output: output,
        };


    } catch (err) {
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}

