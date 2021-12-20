const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const shift = 5;

                var plaintext = input;
                var ciphertext = "";

                for (var i = 0; i < plaintext.length; i++) {
                    var c = plaintext.charCodeAt(i);

                    if (48 <= c && c <= 57)
                        ciphertext += String.fromCharCode(((c - 48 + shift) % 10) + 48);
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
