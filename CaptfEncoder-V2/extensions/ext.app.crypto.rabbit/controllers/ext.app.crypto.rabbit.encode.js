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

                var encrypted = CryptoJS.Rabbit.encrypt(input, key);

                if (outputMode == "BASE64") {
                    output =  encrypted.toString();
                }
                else if (outputMode == "HEX") {
                    output =  encrypted.ciphertext.toString()
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

