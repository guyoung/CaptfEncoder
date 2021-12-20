var scrypt = require("scryptsy");

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {                
                const salt = defaultValue(options.salt, '');
                const iterations = defaultValue(options.iterations, 16384, 'number');
                const memoryFactor = defaultValue(options.memoryFactor, 8, 'number');
                const parallelizationFactor = defaultValue(options.parallelizationFactor, 1, 'number');
                const keyLength = defaultValue(options.keyLength, 64, 'number');

                const data = scrypt(
                    input,
                    salt,
                    iterations,
                    memoryFactor,
                    parallelizationFactor,
                    keyLength
                );

                output = data.toString("hex");
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
