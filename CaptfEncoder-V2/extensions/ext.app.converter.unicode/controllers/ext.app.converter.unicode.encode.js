const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const encoding = defaultValue(options.encoding, 'utf8');
                const delimiter = defaultValue(options.delimiter, '&#x');

                let arr = [];

                for (let i = 0; i < input.length; i++) {
                    if (delimiter == "&#x" || delimiter == "\\u"  || delimiter == "\\u+") {
                        let val = input.charCodeAt(i).toString(16).padStart(4, "0");    
                        val = delimiter + val;    
                        arr.push(val);
                    } else if(delimiter == "&#") {
                        let val = input.charCodeAt(i).toString(10);    
                        val = delimiter + val;    
                        arr.push(val);
                    }
                   
                }
            
                if(delimiter == "\\u" || delimiter == "\\u+") {
                    output = arr.join("");
                } else if (delimiter == "&#x" || delimiter == "&#"){
                    output = arr.join(';');
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