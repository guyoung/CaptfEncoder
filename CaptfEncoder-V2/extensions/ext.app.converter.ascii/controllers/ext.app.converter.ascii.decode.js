const defaultValue = require('../../ext.common/default-value');
const { uint8ArrayToStr } = require('../../ext.common/string')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const base = defaultValue(options.base, 10, 'number');
                const delimiter = defaultValue(options.delimiter, ' ');

                input = input.toLowerCase();

                var arr = [];

                if (input.startsWith("0x")) {
                    input = input.substr(2);
                }

                input.split(delimiter).map(val => {
                    val = val.replace(/[^a-f0-9]/g, "");
                    if (val) {
                        arr.push(parseInt(val, base));
                    }
                });

                output =  uint8ArrayToStr(new Uint8Array(arr), encoding);
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