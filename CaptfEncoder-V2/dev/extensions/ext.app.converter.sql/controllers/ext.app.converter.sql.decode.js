const defaultValue = require('../../ext.common/default-value');
const { uint8ArrayToStr } = require('../../ext.common/string')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const delimiter = '';                
                const digits = defaultValue(options.digits, 4, 'number');

                input = input.toLowerCase();

                let arr = [];
            
                if (input.startsWith("0x")) {
                  input = input.substr(2);
                }
            
                for (let i = 0; i < input.length; i += digits) {
                  var val = input.substr(i, digits);
            
                  var val = input.substr(i, 2);
                  val = val.replace(/[^a-f0-9]/g, "");
            
                  if (val) {
                    if (digits == 4 && val.endsWith("00")) {
                      val = val.substr(0, 2);
                    }
                    arr.push(val);
                  }
                }
            
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