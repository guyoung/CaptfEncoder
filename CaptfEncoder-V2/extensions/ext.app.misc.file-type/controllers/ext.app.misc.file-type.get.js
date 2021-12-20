
const defaultValue = require('../../ext.common/default-value');

const fileType = require("file-type");

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input && input.data) { 
            const result = fileType(Buffer.from(input.data));

            if (result) {
                output = `ext: ${result.ext}\nmime: ${result.mime}`;      
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


