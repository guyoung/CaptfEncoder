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

                const encoding = defaultValue(options.encoding, 'utf8');

                let encryptedStr;

                if (outputMode == "HEX") {
                    let buffer = Buffer.from(input, 'hex');
                    encryptedStr = bufferToChars(buffer);
                } else if (outputMode == "BASE64") {
                    let buffer = Buffer.from(input, 'base64');
                    encryptedStr = bufferToChars(buffer);
                }

                if (encryptedStr) {
                    const decipher = forge.rc2.createEncryptionCipher(key);
                    decipher.start(iv);
                    decipher.update(forge.util.createBuffer(encryptedStr));
                    decipher.finish();

                    var bytes = decipher.output.getBytes();
                    output = Buffer.from(bytes).toString(encoding);
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

function bufferToChars(buffer) {
    if (!buffer) return "";
    let str = "";
    for (let i = 0; i < buffer.length;) {
        str += String.fromCharCode(buffer[i++]);
    }
    return str;
}