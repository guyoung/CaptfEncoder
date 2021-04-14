const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let key = defaultValue(options.key, '');
                let letters = defaultValue(options.letters, '');

                let ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");  
                key = key.toLowerCase().replace(/[^a-z]/g, "");
                letters = letters.toLowerCase(); 
            
                if(ciphertext.length < 1){ 
                  throw new Error("Please enter some ciphertext (letters only)"); 
                }    
                if (key.length != 25) {
                  throw new Error("Keysquare must be 25 characters in length");
                }
                if (key.indexOf("j") >= 0) {
                  throw new Error("Key should not contain letter j");
                }
            
                if (letters.length != 5) {
                  throw new Error("There must be 5 ciphertext characters (and no duplicates)");
                }
            
                var plaintext = "";
                for(let i=0; i<ciphertext.length; i+=2){ 
                    var keyindex = letters.indexOf(ciphertext.charAt(i))*5 
                        + letters.indexOf(ciphertext.charAt(i+1)); 
                    if(keyindex >= 0) {
                        plaintext += key.charAt(keyindex);
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

