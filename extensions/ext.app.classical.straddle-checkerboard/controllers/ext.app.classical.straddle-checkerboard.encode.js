const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');
                let numbers = defaultValue(options.numbers, '');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
                key = key.toLowerCase().replace(/[^a-z]/g, "");
                numbers = numbers.replace(/[^0-9]/g, "");

                if (plaintext.length < 1) {
                    throw new Error("Please enter some plaintext (letters only)");
                }
                if (key.length != 26) {
                    throw new Error("Key square must be 26 characters in length");
                }
                if (numbers.length != 2) {
                    throw new Error("There must be 2 numbers provided also e.g. '3 7'");
                }

                var ciphertext = "";

                for (let i = 0; i < plaintext.length; i++) {
                    var ind = key.indexOf(plaintext.charAt(i));
                    if (ind < parseInt(numbers[0])) {
                        ciphertext += ind;
                    } else if (ind >= parseInt(numbers[0]) && ind < parseInt(numbers[1]) - 1) {
                        ciphertext += ind + 1;
                    } else if (ind >= parseInt(numbers[1]) - 1 && ind < 8) {
                        ciphertext += ind + 2;
                    } else if (ind < 18) {
                        ciphertext += numbers[0] + "" + (ind - 8);
                    } else {
                        ciphertext += numbers[1] + "" + (ind - 18);
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
