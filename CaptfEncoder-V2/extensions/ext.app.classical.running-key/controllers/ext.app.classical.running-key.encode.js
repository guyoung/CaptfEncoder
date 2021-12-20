const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keyStream = defaultValue(options.keyStream, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
                keyStream = keyStream.toLowerCase().replace(/[^a-z]/g, "");

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some ciphertext (letters and numbers only)");
                }
                if (keyStream.length <= ciphertext.length) {
                    throw new Error("Key stream should be at least as long as ciphertext");
                }

                var plaintext = "";

                for (let i = 0; i < ciphertext.length; i++) {
                    plaintext += String.fromCharCode(
                        (((ciphertext.charCodeAt(i) - 97) - (keyStream.charCodeAt(i % keyStream.length) - 97) + 26) % 26) + 97);
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
