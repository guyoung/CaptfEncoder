const defaultValue = require('../../ext.common/default-value');
const jother = require('../../ext.common/jother/jother');


module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');    
                // STRING, SCRIPT
                const pattern = defaultValue(options.pattern, 'STRING');
               
                if (pattern == "STRING") {
                    output = jother.toStr(input);
                  }
                  if (pattern == "SCRIPT") {
                    output = jother.toScript(input);
                  }
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
