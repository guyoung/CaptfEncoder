const CryptoApi = require('../../ext.common/crypto-api/crypto-api_m')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let hasher = CryptoApi.getHasher('md4');
                hasher.update(CryptoApi.encoder.fromUtf(input));
                output = CryptoApi.encoder.toHex(hasher.finalize());
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
