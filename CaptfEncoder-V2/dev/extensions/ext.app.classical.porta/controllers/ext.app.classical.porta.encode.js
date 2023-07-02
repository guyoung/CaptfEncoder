const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keyword = defaultValue(options.keyword, '');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
                keyword = keyword.toLowerCase().replace(/[^a-z]/g, "");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }
                if (keyword.length <= 1) {
                    throw new Error("keyword should be at least 2 characters long");
                }

                let ciphertext = "";

                for (let i = 0; i < plaintext.length; i++) {
                    var j = i % keyword.length;
                    if (keyword[j] == "a" || keyword[j] == "b")
                        ciphertext += "nopqrstuvwxyzabcdefghijklm"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "y" || keyword[j] == "z")
                        ciphertext += "znopqrstuvwxybcdefghijklma"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "w" || keyword[j] == "x")
                        ciphertext += "yznopqrstuvwxcdefghijklmab"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "u" || keyword[j] == "v")
                        ciphertext += "xyznopqrstuvwdefghijklmabc"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "s" || keyword[j] == "t")
                        ciphertext += "wxyznopqrstuvefghijklmabcd"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "q" || keyword[j] == "r")
                        ciphertext += "vwxyznopqrstufghijklmabcde"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "o" || keyword[j] == "p")
                        ciphertext += "uvwxyznopqrstghijklmabcdef"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "m" || keyword[j] == "n")
                        ciphertext += "tuvwxyznopqrshijklmabcdefg"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "k" || keyword[j] == "l")
                        ciphertext += "stuvwxyznopqrijklmabcdefgh"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "i" || keyword[j] == "j")
                        ciphertext += "rstuvwxyznopqjklmabcdefghi"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "g" || keyword[j] == "h")
                        ciphertext += "qrstuvwxyznopklmabcdefghij"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "e" || keyword[j] == "f")
                        ciphertext += "pqrstuvwxyznolmabcdefghijk"[
                            plaintext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "c" || keyword[j] == "d")
                        ciphertext += "opqrstuvwxyznmabcdefghijkl"[
                            plaintext.charCodeAt(i) - 97
                        ];
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
