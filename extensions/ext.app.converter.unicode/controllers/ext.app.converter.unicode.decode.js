const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const delimiter = defaultValue(options.delimiter, '');

                input = input.toLowerCase();

                let arr = [];

                if (delimiter == "&#x" || delimiter == "&#") {
                    input.split(';').map(val => {
                        val = val.replace(/[^a-f0-9]/g, "");
                        if (val) {
                            let chr = '';
                            if (delimiter == "&#x") {
                                chr = String.fromCharCode(parseInt(val, 16));
                            } else if (delimiter == "&#") {
                                chr = String.fromCharCode(parseInt(val, 10));
                            }

                            arr.push(chr);
                        }
                    });
                } else if (delimiter == "\\u" || delimiter == "\\u+") {
                    input = input.substr(2);

                    input.split(delimiter).map(val => {
                        val = val.replace(/[^a-f0-9]/g, "");
                        if (val) {
                            let chr = String.fromCharCode(parseInt(val, 16));

                            arr.push(chr);
                        }
                    });
                }

                output = arr.join("");
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