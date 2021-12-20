const QrCode = require('qrcode-reader');

const defaultValue = require('../../ext.common/default-value');
const {createBase64Image} = require('../../ext.common/image');

module.exports = async function (input, options = {}) {

    try {
        let output = '';

        if (input && input.length > 0) {           
            const image = await createBase64Image(input);

            if (image) {              
                output = await decode(image);
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


const decode = async function (image) {
    return new Promise((resolve, reject) => {
        const qrcode = new QrCode();

        qrcode.callback = function (err, value) {
            if (err) {
                reject(err);
            }

            return resolve(value.result);
        };

        qrcode.decode(image.bitmap);

    });
}



