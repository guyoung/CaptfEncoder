const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare = defaultValue(options.keySquare, '');
                let keyword = defaultValue(options.keyword, '');

                let plaintext = input.toLowerCase().replace(/[^a-z0-9]/g, "");
                keySquare = keySquare.toLowerCase().replace(/[^a-z0-9]/g, "");
                keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (keySquare.length != 36) {
                    throw new Error("Key square must be 36 characters in length");
                }
                if (keyword.length <= 1) {
                    throw new Error("Keyword should be at least 2 characters long");
                }

                var adfgvx = "ADFGVX";
                var ciphertext1 = "";

                for (let i = 0; i < plaintext.length; i++) {
                    var index = keySquare.indexOf(plaintext.charAt(i));
                    ciphertext1 += adfgvx.charAt(index / 6) + adfgvx.charAt(index % 6);
                }

                var colLength = ciphertext1.length / keyword.length;
                var chars = "abcdefghijklmnopqrstuvwxyz";

                var ciphertext = "";
                var k = 0;

                for (let i = 0; i < keyword.length; i++) {
                    while (k < 26) {
                        var t = keyword.indexOf(chars.charAt(k));
                        var arrkw = keyword.split(""); arrkw[t] = "_"; keyword = arrkw.join("");
                        if (t >= 0) break;
                        else k++;
                    }

                    for (let j = 0; j < colLength; j++) {
                        ciphertext += ciphertext1.charAt(j * keyword.length + t);
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
