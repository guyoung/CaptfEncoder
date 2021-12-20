const defaultValue = require('../../ext.common/default-value');


module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare = defaultValue(options.keySquare, '');
                let keyword = defaultValue(options.keyword, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "");
                keySquare = keySquare.toLowerCase().replace(/[^a-z0-9]/g, "");
                keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");
                const klen = keyword.length;
                const re = /[^adfgvx]/;

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some ciphertext (letters only)");
                }
                if (re.test(ciphertext)) {
                    throw new Error("Ciphertext can only contain A,D,F,G,V or X characters.");
                }
                if (ciphertext.length % 2 != 0) {
                    throw new Error("Number of ciphertext characters must be even");
                }
                if (keySquare.length != 36) {
                    throw new Error("Key square must be 36 characters in length");
                }
                if (klen <= 1) {
                    throw new Error("Keyword should be at least 2 characters long");
                }
                var numLongCols = ciphertext.length % klen;
                var cols = new Array(klen);
                var colLength = Math.floor(ciphertext.length / klen);

                var chars = "abcdefghijklmnopqrstuvwxyz";
                var i = 0;
                var upto = 0;

                for (let j = 0; j < klen;) {
                    var t = keyword.indexOf(chars.charAt(i));
                    if (t >= 0) {
                        var cl;
                        if (t < numLongCols) {
                            cl = colLength + 1;
                        } else {
                            cl = colLength;
                        }
                        cols[t] = ciphertext.substr(upto, cl);
                        upto = upto + cl;
                        var arrkw = keyword.split("");
                        arrkw[t] = "_";
                        keyword = arrkw.join("");
                        j++;
                    } else {
                        i++;
                    }
                }

                var plaintext1 = "";
                for (let j = 0; j < colLength + 1; j++) {
                    for (i = 0; i < klen; i++) {
                        plaintext1 += cols[i].charAt(j);
                    }
                }

                var adfgvx = "adfgvx";
                var plaintext = "";

                for (i = 0; i < plaintext1.length; i += 2) {
                    var keyindex =
                        adfgvx.indexOf(plaintext1.charAt(i)) * 6 +
                        adfgvx.indexOf(plaintext1.charAt(i + 1));
                    plaintext += keySquare.charAt(keyindex);
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

