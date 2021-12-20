const { uint8ArrayToStr } = require('../../ext.common/string');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                const arr = runFrom16(input);

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

function runFrom16(input) {
    if (!input) {
      return []
    }

    input = input.toUpperCase();

    var table = [ 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  -1, -1, -1, -1, -1, -1, 
      -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    
    let output = [];

    for ( var start = 0, offset = 0; start + 2 <= input.length; start += 2 ) {

      var a = table[input.charCodeAt(start) & 0x7F];    
      var b = table[input.charCodeAt(start + 1) & 0x7F];
      
      if ( a < 0 || b < 0 ) { 
          continue;
      }
      
      output[offset++] = a << 4 | b;
    }

    return output;
  }
