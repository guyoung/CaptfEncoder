const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');

                let ciphertext = input.toLowerCase();
                key = key.toLowerCase().replace(/[^a-z]/g, "");
            
                if(ciphertext.length < 1){ 
                    throw new Error("Please enter some ciphertext (letters only)"); 
              }   
                if (key.length != 26) {
                    throw new Error("Key must be 26 characters in length");
                }
            
                var plaintext = "";
                var re = /[a-z]/;
            
                for (let i = 0; i < ciphertext.length; i++) {
                  if (re.test(ciphertext.charAt(i))) {
                    plaintext += String.fromCharCode(
                      key.indexOf(ciphertext.charAt(i)) + 97
                    );
                  } else {
                    plaintext += ciphertext.charAt(i);
                  }
                }
                
                output = plaintext;
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

