const urlencode = require('urlencode');

const defaultValue = require('../../ext.common/default-value');
const { strToUint8Array } = require('../../ext.common/string');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';        

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const mode = defaultValue(options.mode, 'allSpecialChars');

                if (mode != "all") {
                    output = urlencode(input, encoding);

                } else {
                    var uint8array = strToUint8Array(input, encoding);

                    var arr = [];

                    uint8array.map(val => {
                        val = "%" + val.toString(16);
                        arr.push(val);
                    });

                    output = arr.join("");
                }               
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
