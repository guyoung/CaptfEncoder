const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const multKey = defaultValue(options.multKey, 1, 'number');
                const addKey = defaultValue(options.addKey, 0, 'number');

                let word = input;
                word = word.toLowerCase();
                word = word.replace(/\W/g, "");             

                let newword = "";
                for (let i = 0; i < word.length; i++) {
                    var code = word.charCodeAt(i) - 97;
                    var newcode = (multKey * code + addKey) % 26 + 97;
                    var newletter = String.fromCharCode(newcode);
                    newword = newword + newletter;
                }

                output = newword + " ";
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
