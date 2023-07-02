const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                var plaintext = input;
                var ciphertext = "";
                var shift;

                for (var i = 0; i < plaintext.length; i++) {
                    var c = plaintext.charCodeAt(i);

                    if (48 <= c && c <= 57) {
                        shift = 5;
                        ciphertext += String.fromCharCode(((c - 48 + shift) % 10) + 48);
                    }
                    else if (65 <= c && c <= 90) {
                        shift = 13;
                        ciphertext += String.fromCharCode(((c - 65 + shift) % 26) + 65);
                    }
                    else if (97 <= c && c <= 122) {
                        shift = 13;
                        ciphertext += String.fromCharCode(((c - 97 + shift) % 26) + 97);
                    }

                    else ciphertext += plaintext.charAt(i);
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
