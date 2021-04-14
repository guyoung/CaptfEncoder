const { uint8ArrayToStr } = require('../../ext.common/string');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const arr = runFrom58(input);

                output = uint8ArrayToStr(new Uint8Array(arr), encoding);
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

function runFrom58(input) {
    if (input.length === 0) return [];

    let alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    let result = [0];

    [].forEach.call(input, function (c, charIndex) {
        const index = alphabet.indexOf(c);

        if (index === -1) {
            return;
        }

        let carry = result[0] * 58 + index;
        result[0] = carry & 0xff;
        carry = carry >> 8;

        for (let i = 1; i < result.length; i++) {
            carry += result[i] * 58;
            result[i] = carry & 0xff;
            carry = carry >> 8;
        }

        while (carry > 0) {
            result.push(carry & 0xff);
            carry = carry >> 8;
        }
    });

    return result.reverse();
}

