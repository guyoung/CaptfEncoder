const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';
            
            if (input && input.length > 0) { 
                const number = defaultValue(options.number, 2, 'number');

                let plaintext = input;

                if (number == 1) {
                  return plaintext;
                }
            
                var ciphertext = "";
                var line;
            
                for (line = 0; line < number - 1; line++) {
                  var skip = 2 * (number - line - 1);
                  var j = 0;
                  for (let i = line; i < plaintext.length; ) {
                    ciphertext += plaintext.charAt(i);
                    if (line == 0 || j % 2 == 0) {
                      i += skip;
                    } else {
                      i += 2 * (number - 1) - skip;
                    }
                    j++;
                  }
                }
            
                for (let i = line; i < plaintext.length; i += 2 * (number - 1)) {
                  ciphertext += plaintext.charAt(i);
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
