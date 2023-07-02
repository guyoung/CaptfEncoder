const defaultValue = require('../../ext.common/default-value');


module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const _eval = defaultValue(options.eval, false, 'boolean');
                const _scope = defaultValue(options.scope, false, 'boolean');  
                
                output = eval(input);
            }

            return resolve({
                success: true,
                output: output,
            });
        }
        catch (err) {
            return resolve({
                success: false,
                output: '',
                message: err.message
            });
        }
    });
}

