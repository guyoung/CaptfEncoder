const defaultValue = require('../../ext.common/default-value');
const { strToUint8Array } = require('../../ext.common/string')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const base = defaultValue(options.base, 10, 'number');
                const delimiter = defaultValue(options.delimiter, ' ');

                const uint8array = strToUint8Array(input, encoding);

                var arr = [];
                uint8array.map(val => {
                    arr.push(val.toString(base));
                });

                output = arr.join(delimiter);
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