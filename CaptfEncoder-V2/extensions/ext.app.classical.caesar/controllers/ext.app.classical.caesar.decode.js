const defaultValue = require('../../ext.common/default-value');
const caesarShift = require('../caesarShift');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const shift = defaultValue(options.shift, 1, 'number');

                output = caesarShift(input, (26 - shift) % 26)
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

