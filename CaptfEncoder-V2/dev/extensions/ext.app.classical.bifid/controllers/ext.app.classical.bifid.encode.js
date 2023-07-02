const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare = defaultValue(options.keySquare, '');
                const period = defaultValue(options.period, 1, 'number');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");
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
                var ct1 = "";
                var ct2 = "";

                for (let i = 0; i < plaintext.length; i++) {
                    var index = keySquare.indexOf(plaintext.charAt(i));
                    ct1 += ind.charAt(index / 5);
                    ct2 += ind.charAt(index % 5);
                }

                var i = 0;
                var ct3 = "";
                var bit = ct1.substr(i, period);

                while (bit.length > 0) {
                    ct3 += bit + ct2.substr(i, period);
                    i += period;
                    bit = ct1.substr(i, period);
                }

                var ciphertext = "";
                for (let i = 0; i < ct3.length; i += 2) {
                    ciphertext += keySquare.charAt(
                        (parseInt(ct3.charAt(i)) - 1) * 5 + (parseInt(ct3.charAt(i + 1)) - 1));
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
