
const defaultValue = require('../../ext.common/default-value');

const {crc32}= require("crc");

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input && input.data) { 
            const result = crc32(Buffer.from(input.data));

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


