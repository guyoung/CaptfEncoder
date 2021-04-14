const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');
                let letters = defaultValue(options.letters, '');

                let plaintext = input
                    .toLowerCase()
                    .replace(/j/g, "i")
                    .replace(/[^a-z]/g, "");
                key = key.replace(/[^a-z]/g, "");
                letters = letters.toUpperCase();

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters only)");
                }
                if (key.length != 25) {
                    throw new Error("Keysquare must be 25 characters in length");
                }
                if (key.indexOf("j") >= 0) {
                    throw new Error("Key should not contain letter j");
                }
                if (letters.length != 5) {
                    throw new Error("There must be 5 ciphertext characters (and no duplicates)");
                }

                var ciphertext = "";
                for (let i = 0; i < plaintext.length; i++) {
                    var index = key.indexOf(plaintext.charAt(i));
                    if (index >= 0) {
                        ciphertext += letters.charAt(index / 5) + letters.charAt(index % 5);
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
