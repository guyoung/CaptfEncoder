const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');
                let numbers = defaultValue(options.numbers, '');

                let ciphertext = input.toLowerCase().replace(/[^0-9]/g, "");
                key = key.toLowerCase().replace(/[^a-z]/g, "");
                numbers = numbers.replace(/[^0-9]/g, "");

                if (ciphertext.length < 1) {
                    throw new Error("Please enter some ciphertext (letters only)");
                }
                if (key.length != 26) {
                    throw new Error("Key square must be 26 characters in length");
                }
                if (num.length != 2) {
                    throw new Error("There must be 2 numbers provided also e.g. '3 7'");
                }

                var plaintext = "";

                for (var i = 0; i < ciphertext.length; i++) {
                    if (parseInt(ciphertext.charAt(i)) == parseInt(numbers[0])) {
                        if (ciphertext.length == i + 1) {
                            //throw new Error("Invalid final ciphertext character: "+numbers[0]);
                            plaintext += "?";
                        } else {
                            plaintext += key.charAt(parseInt(ciphertext.charAt(++i)) + 8);
                        }
                    } else if (parseInt(ciphertext.charAt(i)) == parseInt(numbers[1])) {
                        if (ciphertext.length == i + 1) {
                            //throw new Error("Invalid final ciphertext character: "+numbers[1]);
                            plaintext += "?";
                        } else {
                            var temp = parseInt(ciphertext.charAt(++i)) + 18;
                            if (temp > 25) {
                                //throw new Error("Invalid ciphertext sequence: "+numbers[1]+ciphertext.charAt(i));
                                plaintext += "?";
                            } else {
                                plaintext += key.charAt(temp);
                            }
                        }
                    } else {
                        var n = parseInt(ciphertext.charAt(i));
                        if (n < parseInt(numbers[0])) {
                            plaintext += key.charAt(n);
                        } else if (n < parseInt(numbers[1])) {
                            plaintext += key.charAt(n - 1);
                        } else {
                            plaintext += key.charAt(n - 2);
                        }
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

