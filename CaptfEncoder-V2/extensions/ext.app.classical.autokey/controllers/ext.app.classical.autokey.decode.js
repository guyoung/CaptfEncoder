const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keyword = defaultValue(options.keyword, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
                keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some ciphertext (letters and numbers only)");
                }
                if (keyword.length <= 1) {
                    throw new Error("Keyword should be at least 2 characters long");
                }

                var plaintext = "";

                for (let i = 0; i < ciphertext.length; i++) {
                    if (i < keyword.length) {
                        plaintext += String.fromCharCode(
                            (ciphertext.charCodeAt(i) - 97 - (keyword.charCodeAt(i) - 97) + 26) % 26 +
                            97
                        );
                    } else {
                        plaintext += String.fromCharCode(
                            (ciphertext.charCodeAt(i) -
                                97 -
                                (plaintext.charCodeAt(i - keyword.length) - 97) +
                                26) %
                            26 +
                            97
                        );
                    }
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

