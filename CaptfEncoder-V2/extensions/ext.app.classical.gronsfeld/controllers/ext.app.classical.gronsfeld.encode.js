const defaultValue = require('../../ext.common/default-value');
const pythonExecute = require('../../ext.common/python-execute');

module.exports = async function (input, options = {}) {

    let output = '';

    if (input && input.length > 0) {
        try {
            let plaintext = input.toUpperCase().replace(/[^A-Z]/g, '');
            
            let numericKey = defaultValue(options.numericKey, '');
            numericKey = numericKey.replace(/[^0-9\s]/g, '');           

            const results = await pythonExecute('ext.app.classical.gronsfeld/python/encode.py', [plaintext, numericKey]);

            if (results && results.length > 0) {
                output = results[0];
            }
        }
        catch (err) {
            return {
                success: false,
                output: '',
                message: err.message
            };
        }
    }

    return {
        success: true,
        output: output,
    };

}

