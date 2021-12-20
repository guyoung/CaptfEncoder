const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';
            
            if (input && input.length > 0) {               
                let plaintext = input.toLowerCase();
                const chars = "ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();            
                let ciphertext = "";
                const re = /[a-z]/;
            
                for (let i = 0; i < plaintext.length; i++) {
                  if (re.test(plaintext.charAt(i))) {
                    ciphertext += chars.charAt(plaintext.charCodeAt(i) - 97);
                  } else {
                    ciphertext += plaintext.charAt(i);
                  } 
                }
            
                output = ciphertext;
                
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
