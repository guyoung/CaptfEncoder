const he = require('he');

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
       
        try {       

            let output = '';

            if (input && input.length > 0) {
                output = he.encode(input, {
                    encodeEverything: defaultValue(options.encodeEverything, false, 'boolean'),
                    useNamedReferences: defaultValue(options.useNamedReferences, true, 'boolean'),
                    decimal: defaultValue(options.decimal, true, 'boolean')}
                );
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
