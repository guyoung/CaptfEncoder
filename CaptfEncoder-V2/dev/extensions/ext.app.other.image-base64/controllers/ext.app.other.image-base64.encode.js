const mimeTypes = require('mime-types')
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.file && input.data) {

                const mime = mimeTypes.lookup(input.file);
                const base64Str = Buffer.from(input.data).toString("base64");
               
                output = `data:${mime};base64,${base64Str}`;
                
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

