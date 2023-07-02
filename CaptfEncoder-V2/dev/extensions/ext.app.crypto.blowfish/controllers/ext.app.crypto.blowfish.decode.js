const Blowfish = require("egoroof-blowfish");

const defaultValue = require('../../ext.common/default-value');
const { arrayFromBase64, arrayFromHex } = require('../../ext.common/uint8-array')

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const key = defaultValue(options.key, '');

                if (key.length === 0) {
                    throw new Error("Key is not empty");    
                }

                // optional for ECB mode; bytes length should be equal 8
                const iv = defaultValue(options.iv, '');
                // ECB, CBC
                const mode = defaultValue(options.mode, 'ECB');
                // PKCS5, ONE_AND_ZEROS, LAST_BYTE, NULL, SPACES
                const padding = defaultValue(options.padding, 'PKCS5');
                // BASE64, HEX
                const outputMode = defaultValue(options.outputMode, 'BASE64');

                // ECB, CBC
                let _mode = Blowfish.MODE.ECB;
                if (mode == "CBC") {
                    _mode = Blowfish.MODE.CBC;
                }

                // PKCS5, ONE_AND_ZEROS, LAST_BYTE, NULL, SPACES
                let _padding = Blowfish.PADDING.PKCS5;
                if (padding == "ONE_AND_ZEROS") {
                    _padding = Blowfish.PADDING.ONE_AND_ZEROS;
                } else if (padding == "LAST_BYTE") {
                    _padding = Blowfish.PADDING.LAST_BYTE;
                } else if (padding == "NULL") {
                    _padding = Blowfish.PADDING.NULL;
                } else if (padding == "SPACES") {
                    _padding = Blowfish.PADDING.SPACES;
                }

                let bf = new Blowfish(key, _mode, _padding);
                bf.setIv(iv);

                let arr;

                if (outputMode == "BASE64") {
                    arr = arrayFromBase64(input)
                }
                else if (this._output == "HEX") {
                    arr = arrayFromHex(input);
                }


                output = bf.decode(arr, Blowfish.TYPE.STRING);
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

