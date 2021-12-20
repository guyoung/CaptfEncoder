var CryptoJS = require("crypto-js");

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const digits = defaultValue(options.digits, 32, 'number');

                if (digits == 32) {
                    output = CryptoJS.MD5(input).toString();
                }
                if (digits == 16) {
                    output = CryptoJS.MD5(input).toString().substr(8, 16);
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
