const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const number = defaultValue(options.number, 2, 'number');

                let ciphertext = input;

                var pt = new Array(ciphertext.length);
                var k = 0;
                var line;

                for (line = 0; line < number - 1; line++) {
                    var skip = 2 * (number - line - 1);
                    var j = 0;
                    for (var i = line; i < ciphertext.length;) {
                        pt[i] = ciphertext.charAt(k++);
                        if (line == 0 || j % 2 == 0) i += skip;
                        else i += 2 * (number - 1) - skip;
                        j++;
                    }
                }

                for (i = line; i < ciphertext.length; i += 2 * (number - 1)) {
                    pt[i] = ciphertext.charAt(k++);
                }

                var plaintext = pt.join("");

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

