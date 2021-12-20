var CryptoJS = require("crypto-js");

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const key = defaultValue(options.key, '');
                const digestMode = defaultValue(options.digestMode, '');

                // BASE64, HEX
                const outputMode = defaultValue(options.outputMode, 'BASE64');

                let hash;

                if (digestMode == "hmac-md5") {
                    hash = CryptoJS.HmacMD5(input, key);
                } else if (digestMode == "hmac-sha1") {
                    hash = CryptoJS.HmacSHA1(input, key);
                } else if (digestMode == "hmac-sha256") {
                    hash = CryptoJS.HmacSHA256(input, key);
                } else if (digestMode == "hmac-sha224") {
                    hash = CryptoJS.HmacSHA224(input, key);
                } else if (digestMode == "hmac-sha512") {
                    hash = CryptoJS.HmacSHA512(input, key);
                } else if (digestMode == "hmac-sha384") {
                    hash = CryptoJS.HmacSHA384(input, key);
                } else if (digestMode == "hmac-sha3") {
                    hash = CryptoJS.HmacSHA3(input, key);
                } else if (digestMode == "hmac-ripemd160") {
                    hash = CryptoJS.HmacRIPEMD160(input, key);
                }

                if (hash) {
                    if (outputMode == "BASE64") {
                        output = hash.toString(CryptoJS.enc.Base64);
                    }

                    if (outputMode == "HEX") {
                        output = hash.toString(CryptoJS.enc.Hex);
                    }
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
