const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare = defaultValue(options.keySquare, '');
                const period = defaultValue(options.period, 1, 'number');

                let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");
                keySquare = keySquare.toLowerCase().replace(/[^a-z]/g, "");

                if (keySquare.length != 25) {
                    throw new Error("Key square must be 25 characters in length");
                }
                if (keySquare.indexOf("j") >= 0) {
                    throw new Error("key should not contain letter j (combine with i).");
                }
                if (period <= 0) {
                    throw new Error("period should greater than 0");
                }

                var ind = "12345";
                var pt1 = "";

                for (let i = 0; i < ciphertext.length; i++) {
                    var index = keySquare.indexOf(ciphertext.charAt(i));
                    pt1 += ind.charAt(index / 5) + ind.charAt(index % 5);
                }

                var i = 0;
                var pt2 = "";
                var pt3 = "";

                while (pt1.length - i >= 2 * period) {
                    pt2 += pt1.substr(i, period);
                    pt3 += pt1.substr(i + period, period);
                    i += 2 * period;
                }

                var k = (pt1.length - i) / 2;

                if (k >= 1) {
                    pt2 += pt1.substr(i, k);
                    pt3 += pt1.substr(i + k, k);
                }

                var plaintext = "";
                for (i = 0; i < pt2.length; i++) {
                    plaintext += keySquare.charAt(
                        (parseInt(pt2.charAt(i)) - 1) * 5 + (parseInt(pt3.charAt(i)) - 1));
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

