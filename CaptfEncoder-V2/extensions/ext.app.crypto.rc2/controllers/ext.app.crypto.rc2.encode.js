const forge = require('node-forge');

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const key = defaultValue(options.key, '');
                const iv = defaultValue(options.iv, '');

                // BASE64, HEX
                const outputMode = defaultValue(options.outputMode, 'BASE64');

                const cipher = forge.rc2.createEncryptionCipher(key);
                cipher.start(iv || null);

                cipher.update(forge.util.createBuffer(input));
                cipher.finish();

                if (outputMode == "HEX") {
                    output = cipher.output.toHex()
                }
                if (outputMode == "BASE64") {
                    output = Buffer.from(cipher.output.toHex(), 'hex').toString('base64');
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

