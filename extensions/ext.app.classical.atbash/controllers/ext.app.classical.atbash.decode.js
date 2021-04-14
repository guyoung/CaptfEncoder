const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let ciphertext = input.toLowerCase();
                const chars = "ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();
                let plaintext = "";
                const re = /[a-z]/;

                for (let i = 0; i < ciphertext.length; i++) {
                    if (re.test(ciphertext.charAt(i))) {
                        plaintext += String.fromCharCode(
                            chars.indexOf(ciphertext.charAt(i)) + 97
                        );
                    } else {
                        plaintext += ciphertext.charAt(i);
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

