const CryptoJS = require("crypto-js");

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const key = defaultValue(options.key, '');

                // BASE64, HEX
                const outputMode = defaultValue(options.outputMode, 'BASE64');

                const encryptedStr = input;

                if (outputMode == "HEX") {
                    encryptedStr = CryptoJS.enc.Hex.parse(encryptedStr);
                    encryptedStr = CryptoJS.enc.Base64.stringify(encryptedStr);
                }

                var decrypted = CryptoJS.Rabbit.decrypt(encryptedStr, key);

                output = CryptoJS.enc.Utf8.stringify(decrypted);
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
