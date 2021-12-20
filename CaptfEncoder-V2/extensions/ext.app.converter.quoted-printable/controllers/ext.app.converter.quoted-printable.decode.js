const defaultValue = require('../../ext.common/default-value');
const { uint8ArrayToStr } = require('../../ext.common/string');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const str = input.replace(/=(?:\r?\n|$)/g, "");
                var arr = mimeDecode(str);
            
                return uint8ArrayToStr(new Uint8Array(arr), encoding);
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

function mimeDecode(str) {
    let encodedBytesCount = (str.match(/=[\da-fA-F]{2}/g) || []).length,
      bufferLength = str.length - encodedBytesCount * 2,
      chr,
      hex,
      buffer = new Array(bufferLength),
      bufferPos = 0;

    for (let i = 0, len = str.length; i < len; i++) {
      chr = str.charAt(i);
      if (
        chr === "=" &&
        (hex = str.substr(i + 1, 2)) &&
        /[\da-fA-F]{2}/.test(hex)
      ) {
        buffer[bufferPos++] = parseInt(hex, 16);
        i += 2;
        continue;
      }
      buffer[bufferPos++] = chr.charCodeAt(0);
    }

    return buffer;
  }