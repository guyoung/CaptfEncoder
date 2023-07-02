const { strToUint8Array } = require('../../ext.common/string');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const uint8array = strToUint8Array(input, encoding);

                output = runTo16(uint8array);
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

function runTo16(input) {
    if (!input) {
      return "";
    }

    let alphabet = "0123456789abcdef";
    let output = "";

    for (var start = 0, offset = 0; start < input.length; ++start) {
      var enc1 = (input[start] >>> 4) & 0x0f;
      var enc2 = input[start] & 0x0f;

      output += alphabet.charAt(enc1) + alphabet.charAt(enc2);
    }

    return output;
  }

