const QRCode = require('qrcode')
const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                QRCode.toDataURL(input, function (err, url) {
                    if (err) {
                       throw err;
                    } else {
                        output = url;
                        
                        return resolve({
                            success: true,
                            output: output,
                        });
                    }

                });
            } else {
                return resolve({
                    success: true,
                    output: output,
                });
            }

           
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

