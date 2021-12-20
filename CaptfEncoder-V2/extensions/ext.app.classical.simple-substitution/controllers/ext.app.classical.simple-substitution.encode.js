const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');

                let plaintext = input.toLowerCase();
                key = key.toLowerCase().replace(/[^a-z]/g, "");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (key.length != 26) {
                    throw new Error("Key must be 26 characters in length");
                }
                var ciphertext = "";
                var re = /[a-z]/;

                for (let i = 0; i < plaintext.length; i++) {
                    if (re.test(plaintext.charAt(i))) {
                        ciphertext += key.charAt(plaintext.charCodeAt(i) - 97);
                    } else {
                        ciphertext += plaintext.charAt(i);
                    }
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
