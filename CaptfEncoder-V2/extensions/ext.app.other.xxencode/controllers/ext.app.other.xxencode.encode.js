const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                output = encode(input);
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

const base = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encode(inString) {
    var stop = false;
    var inIndex = 0;
    var outIndex = 0;
    var bytesRead = 0;

    var inBytes = Buffer.from(inString, 'utf8');
    var buffLen = inBytes.length;
    var outBytes = Buffer.alloc(
        buffLen + buffLen / 3 + 1 + (buffLen / 45) * 2 + 2 + 4
    );

    do {
        var n;
        var bytesLeft = buffLen - bytesRead;

        if (bytesLeft === 0) {
            break;
        }

        if (bytesLeft <= 45) {
            n = bytesLeft;
        } else {
            n = 45;
        }

        outBytes[outIndex++] = base.charCodeAt(n);

        for (var i = 0; i < n; i += 3) {
            if (buffLen - inIndex < 3) {
                var padding = new Array(3);
                var z = 0;

                while (inIndex + z < buffLen) {
                    padding[z] = inBytes[inIndex + z];
                    ++z;
                }

                encodeBytes(padding, 0, outBytes, outIndex);
            } else {
                encodeBytes(inBytes, inIndex, outBytes, outIndex);
            }

            inIndex += 3;
            outIndex += 4;
        }

        outBytes[outIndex++] = 10;
        bytesRead += n;

        if (n >= 45) {
            continue;
        }

        stop = true;
    } while (!stop);

    return outBytes.toString().substring(0, outIndex);

}



function encodeBytes(inBytes, inIndex, outBytes, outIndex) {
    var c1 = inBytes[inIndex] >>> 2;
    var c2 =
        ((inBytes[inIndex] << 4) & 0x30) | ((inBytes[inIndex + 1] >>> 4) & 0xf);
    var c3 =
        ((inBytes[inIndex + 1] << 2) & 0x3c) |
        ((inBytes[inIndex + 2] >>> 6) & 0x3);
    var c4 = inBytes[inIndex + 2] & 0x3f;

    outBytes[outIndex] = base.charCodeAt(c1);
    outBytes[outIndex + 1] = base.charCodeAt(c2);
    outBytes[outIndex + 2] = base.charCodeAt(c3);
    outBytes[outIndex + 3] = base.charCodeAt(c4);
}

