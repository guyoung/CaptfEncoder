const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keyStream = defaultValue(options.keyStream, '');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
                keyStream = keyStream.toLowerCase().replace(/[^a-z]/g, "");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (keyStream.length <= plaintext.length) {
                    throw new Error("Key stream should be at least as long as plaintext");
                }

                var ciphertext = "";
                for (let i = 0; i < plaintext.length; i++) {
                    ciphertext += String.fromCharCode(
                        (((plaintext.charCodeAt(i) - 97) + (keyStream.charCodeAt(i % keyStream.length) - 97) + 26) % 26) + 97);
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

