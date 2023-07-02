const mimeTypes = require('mime-types')
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {                

                const matches = input.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

                if (matches.length !== 3) {
                  throw new Error("Invalid input string");
                }

                const mime = matches[1];
                const extension = mimeTypes.extension(mime);
                const base64Str = matches[2];
                const buffer = Buffer.from(base64Str, "base64");

                output = {
                    mime: mime,
                    extension: extension? extension : '',
                    data: buffer
                };
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

