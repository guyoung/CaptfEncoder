const { strToUint8Array } = require('../../ext.common/string');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const uint8array = strToUint8Array(input, encoding);

                output = runTo58(uint8array);
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

function runTo58(input) {
    if (!input) {
        return "";
    }

    let alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    let result = [0];

    input.forEach(function (b) {
        let carry = (result[0] << 8) + b;
        result[0] = carry % 58;
        carry = (carry / 58) | 0;

        for (let i = 1; i < result.length; i++) {
            carry += result[i] << 8;
            result[i] = carry % 58;
            carry = (carry / 58) | 0;
        }

        while (carry > 0) {
            result.push(carry % 58);
            carry = (carry / 58) | 0;
        }
    });

    var result2 = result
        .map(function (b) {
            return alphabet[b];
        })
        .reverse()
        .join("");

    while (result2.length < input.length) {
        result2 = alphabet[0] + result;
    }

    return result2;
}


