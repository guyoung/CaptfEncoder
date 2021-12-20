const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare1 = defaultValue(options.keySquare1, '');
                let keySquare2 = defaultValue(options.keySquare2, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/[j]/g, "i");
                keySquare1 = keySquare1.toLowerCase().replace(/[^a-z]/g, "");
                keySquare2 = keySquare2.toLowerCase().replace(/[^a-z]/g, "");

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (keySquare1.length != 25 || keySquare2.length != 25) {
                    throw new Error("keysquare must be 25 characters in length");
                }
                if (ciphertext.length % 2 == 1) {
                    throw new Error("ciphertext should be even length (wrong algorithm?)");
                }

                var plaintext = "";
                var rt = "abcdefghiklmnopqrstuvwxyz";

                for (let i = 0; i < ciphertext.length; i += 2) {
                    var a = (keySquare1.indexOf(ciphertext.charAt(i)) % 5);
                    var b = Math.floor(keySquare1.indexOf(ciphertext.charAt(i)) / 5);
                    var c = (keySquare2.indexOf(ciphertext.charAt(i + 1)) % 5);
                    var d = Math.floor(keySquare2.indexOf(ciphertext.charAt(i + 1)) / 5);
                    plaintext += rt.charAt(5 * b + c);
                    plaintext += rt.charAt(5 * d + a);
                }

                return plaintext.toUpperCase();
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

