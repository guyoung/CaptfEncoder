
const defaultValue = require('../../ext.common/default-value');

const crypto = require("crypto");

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input && input.data) { 

            const algorithm = defaultValue(options.algorithm, 'md5');

            const hasher = crypto.createHash(algorithm);

            hasher.update(Buffer.from(input.data));

            const result = hasher.digest("hex");

            if (result) {
                output = result;      
            }   
        }

        return {
            success: true,
            output: output,
        };
    }
    catch (err) {
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}


