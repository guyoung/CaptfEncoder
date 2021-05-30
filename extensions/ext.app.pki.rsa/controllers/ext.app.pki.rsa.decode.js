const jsencrypt = require("nodejs-jsencrypt");

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const keyKind = defaultValue(options.keyKind, 'PUBLIC');
                const key = defaultValue(options.key, '');

                var encrypt = new jsencrypt.JSEncrypt();

                if (keyKind == "PUBLIC") {
                    encrypt.setPublicKey(key);
                }
                else if (keyKind == "PRIVATE") {
                    encrypt.setPrivateKey(key);
                }

                output = encrypt.decrypt(input);

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

