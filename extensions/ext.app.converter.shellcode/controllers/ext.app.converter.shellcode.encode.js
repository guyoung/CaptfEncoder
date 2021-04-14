const defaultValue = require('../../ext.common/default-value');
const { strToUint8Array } = require('../../ext.common/string')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const delimiter = defaultValue(options.digits, '\\x');

                const uint8array = strToUint8Array(input, encoding);

                let arr = [];
                uint8array.map(val => {
                    val = val.toString(16);
                    val = delimiter + val;
                    arr.push(val);
                });

                output = arr.join('');
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