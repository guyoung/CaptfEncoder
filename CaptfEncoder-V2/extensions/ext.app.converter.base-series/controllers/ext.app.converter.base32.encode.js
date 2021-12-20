const { strToUint8Array } = require('../../ext.common/string');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const uint8array = strToUint8Array(input, encoding);

                output = runTo32(uint8array);
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

function runTo32(input) {
    if (!input) {
        return "";
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
        output = "",
        chr1,
        chr2,
        chr3,
        chr4,
        chr5,
        enc1,
        enc2,
        enc3,
        enc4,
        enc5,
        enc6,
        enc7,
        enc8,
        i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        chr4 = input[i++];
        chr5 = input[i++];

        enc1 = chr1 >> 3;
        enc2 = ((chr1 & 7) << 2) | (chr2 >> 6);
        enc3 = (chr2 >> 1) & 31;
        enc4 = ((chr2 & 1) << 4) | (chr3 >> 4);
        enc5 = ((chr3 & 15) << 1) | (chr4 >> 7);
        enc6 = (chr4 >> 2) & 31;
        enc7 = ((chr4 & 3) << 3) | (chr5 >> 5);
        enc8 = chr5 & 31;

        if (isNaN(chr2)) {
            enc3 = enc4 = enc5 = enc6 = enc7 = enc8 = 32;
        } else if (isNaN(chr3)) {
            enc5 = enc6 = enc7 = enc8 = 32;
        } else if (isNaN(chr4)) {
            enc6 = enc7 = enc8 = 32;
        } else if (isNaN(chr5)) {
            enc8 = 32;
        }

        output +=
            alphabet.charAt(enc1) +
            alphabet.charAt(enc2) +
            alphabet.charAt(enc3) +
            alphabet.charAt(enc4) +
            alphabet.charAt(enc5) +
            alphabet.charAt(enc6) +
            alphabet.charAt(enc7) +
            alphabet.charAt(enc8);
    }

    return output;
}


