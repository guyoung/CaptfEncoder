const defaultValue = require('../../ext.common/default-value');
const { decode } = require('../brainfuck')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');

                output = decode(input, {
                    eval:  defaultValue(options.eval, false, 'boolean'),
                    scope: defaultValue(options.scope, false, 'boolean')
                  });
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

