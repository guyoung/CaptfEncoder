const ip = require('ip');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let base = defaultValue(options.base, 10, 'number');

                if (!ip.isV4Format(input)) {
                    throw new Error("Incorrectly ipv4 format");
                }

                const number = ip.toLong(input);

                output = number.toString(base);   
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

