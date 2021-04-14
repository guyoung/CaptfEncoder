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
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (keyword.length <= 1) {
                    throw new Error("keyword should be at least 2 characters long");
                }

                var plaintext = "";
                for (let i = 0; i < ciphertext.length; i++) {
                    plaintext += String.fromCharCode(
                        (((keyword.charCodeAt(i % keyword.length) - 97) - (ciphertext.charCodeAt(i) - 97) + 26) % 26) + 97);
                }

                return plaintext;
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

