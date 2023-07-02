const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
                let arrKeys = key.split(" ");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (plaintext.length % 2 == 1) {
                    plaintext = plaintext + "x";
                }
                if (arrKeys.length != 4) {
                    throw new Error("Key should consist of 4 integers");
                }

                var keys = [arrKeys.length];
                for (var i = 0; i < 4; i++) {
                    keys[i] = parseInt(arrKeys[i]) % 26;
                }

                var ciphertext = "";

                for (i = 0; i < plaintext.length; i += 2) {
                    ciphertext += String.fromCharCode(
                        (keys[0] * (plaintext.charCodeAt(i) - 97) +
                            keys[1] * (plaintext.charCodeAt(i + 1) - 97)) %
                        26 +
                        97
                    );
                    ciphertext += String.fromCharCode(
                        (keys[2] * (plaintext.charCodeAt(i) - 97) +
                            keys[3] * (plaintext.charCodeAt(i + 1) - 97)) %
                        26 +
                        97
                    );
                }

                output = ciphertext;
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
