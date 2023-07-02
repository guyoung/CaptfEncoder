const forge = require('node-forge')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = {};
            
            forge.pki.rsa.generateKeyPair(2048, (err, keys) => {
                if (err) {
                    throw err;
                }
                output.publicKey = forge.pki.publicKeyToPem(keys.publicKey);
                output.privateKey = forge.pki.privateKeyToPem(keys.privateKey);

                return resolve({
                    success: true,
                    output: output,
                });
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

