const ip = require('ip');
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let base = defaultValue(options.base, 10, 'number');

                if (input.startsWith("0x")) {
                    input = input.substr(2);
                  }
              
                  const number = parseInt(input, base);
              
                  output = ip.fromLong(number); 
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
