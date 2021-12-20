const CryptoApi = require('../../ext.common/crypto-api/crypto-api_m')

const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {               
                let hasher;
                const length = defaultValue(options.length, 160, 'number')
                
                if (length === 128) {
                    hasher = CryptoApi.getHasher('ripemd128');
                }
                else if (length === 160) {
                    hasher = CryptoApi.getHasher('ripemd160');
                }
                else if (length === 256) {
                    hasher = CryptoApi.getHasher('ripemd256');
                }
                else if (length === 320) {
                    hasher = CryptoApi.getHasher('ripemd320');
                }               
                
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
