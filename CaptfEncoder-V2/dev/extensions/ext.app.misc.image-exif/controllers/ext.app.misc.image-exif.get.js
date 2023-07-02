
const defaultValue = require('../../ext.common/default-value');
const {createBase64Image} = require('../../ext.common/image');

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input) {            
            const image = await createBase64Image(input);       
            
            output = JSON.stringify(image._exif, null, 4);           
        }

        return {
            success: true,
            output: output,
        };
    }
    catch (err) {
        console.log(err)
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}


