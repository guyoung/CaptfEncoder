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
                    throw new Error("please enter some ciphertext (letters and numbers only)");
                }
                if (keyword.length <= 1) {
                    throw new Error("keyword should be at least 2 characters long");
                }

                var plaintext = "";

                for (let i = 0; i < ciphertext.length; i++) {
                    var j = i % keyword.length;

                    if (keyword[j] == "a" || keyword[j] == "b")
                        plaintext += "nopqrstuvwxyzabcdefghijklm"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "y" || keyword[j] == "z")
                        plaintext += "znopqrstuvwxybcdefghijklma"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "w" || keyword[j] == "x")
                        plaintext += "yznopqrstuvwxcdefghijklmab"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "u" || keyword[j] == "v")
                        plaintext += "xyznopqrstuvwdefghijklmabc"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "s" || keyword[j] == "t")
                        plaintext += "wxyznopqrstuvefghijklmabcd"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "q" || keyword[j] == "r")
                        plaintext += "vwxyznopqrstufghijklmabcde"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "o" || keyword[j] == "p")
                        plaintext += "uvwxyznopqrstghijklmabcdef"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "m" || keyword[j] == "n")
                        plaintext += "tuvwxyznopqrshijklmabcdefg"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "k" || keyword[j] == "l")
                        plaintext += "stuvwxyznopqrijklmabcdefgh"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "i" || keyword[j] == "j")
                        plaintext += "rstuvwxyznopqjklmabcdefghi"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "g" || keyword[j] == "h")
                        plaintext += "qrstuvwxyznopklmabcdefghij"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "e" || keyword[j] == "f")
                        plaintext += "pqrstuvwxyznolmabcdefghijk"[
                            ciphertext.charCodeAt(i) - 97
                        ];
                    else if (keyword[j] == "c" || keyword[j] == "d")
                        plaintext += "opqrstuvwxyznmabcdefghijkl"[
                            ciphertext.charCodeAt(i) - 97
                        ];
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

