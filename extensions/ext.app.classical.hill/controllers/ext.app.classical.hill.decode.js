const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
                let strKeys = key.split(" ");

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some ciphertext (letters only, numbers should be spelled)");
                }
                if (ciphertext.length % 2 == 1) {
                    throw new Error("Ciphertext is not divisible by 2 (wrong algorithm?)");
                }

                if (strKeys.length != 4) {
                    throw new Error("Key should consist of 4 integers");
                }
                var keys = [strKeys.length];
                for (let i = 0; i < 4; i++) {
                    keys[i] = parseInt(strKeys[i]) % 26;
                }

                var det = keys[0] * keys[3] - keys[1] * keys[2];
                det = (det % 26 + 26) % 26;
                var di = 0;
                for (let i = 0; i < 26; i++) {
                    if ((det * i) % 26 == 1) di = i;
                }

                if (di == 0) {
                    throw new Error("Could not invert, try different key");
                }

                var ikeys = new Array(4);
                ikeys[0] = (di * keys[3]) % 26;
                ikeys[1] = (-1 * di * keys[1]) % 26;
                ikeys[2] = (-1 * di * keys[2]) % 26;
                ikeys[3] = di * keys[0];

                for (let i = 0; i < 4; i++) {
                    if (ikeys[i] < 0) ikeys[i] += 26;
                }

                var plaintext = "";
                for (let i = 0; i < ciphertext.length; i += 2) {
                    plaintext += String.fromCharCode(
                        (ikeys[0] * (ciphertext.charCodeAt(i) - 97) +
                            ikeys[1] * (ciphertext.charCodeAt(i + 1) - 97)) %
                        26 +
                        97
                    );
                    plaintext += String.fromCharCode(
                        (ikeys[2] * (ciphertext.charCodeAt(i) - 97) +
                            ikeys[3] * (ciphertext.charCodeAt(i + 1) - 97)) %
                        26 +
                        97
                    );
                }

                output = plaintext;
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

