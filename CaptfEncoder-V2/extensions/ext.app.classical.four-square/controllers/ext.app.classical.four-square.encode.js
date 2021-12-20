const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';
            
            if (input && input.length > 0) { 
                let keySquare1 = defaultValue(options.keySquare1, '');
                let keySquare2 = defaultValue(options.keySquare2, '');

                let plaintext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
                keySquare1 = keySquare1.toLowerCase().replace(/[^a-z]/g, ""); 
                keySquare2 = keySquare2.toLowerCase().replace(/[^a-z]/g, ""); 
                
                if(plaintext.length < 1){ 
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                }    
                if(keySquare1.length != 25 || keySquare2.length != 25){ 
                    throw("Key square must be 25 characters in length");  
                }
        
                if(plaintext.length % 2 == 1) {
                    plaintext += "x";
                }
        
                var ciphertext = ""; 
                var rt = "abcdefghiklmnopqrstuvwxyz";
                
                for(let i=0; i<plaintext.length; i+=2){
                    var a = (rt.indexOf(plaintext.charAt(i)) % 5);
                    var b = Math.floor(rt.indexOf(plaintext.charAt(i)) / 5);
                    var c = Math.floor(rt.indexOf(plaintext.charAt(i+1)) % 5);
                    var d = Math.floor(rt.indexOf(plaintext.charAt(i+1)) / 5);
                    ciphertext += keySquare1.charAt(5*b + c);
                    ciphertext += keySquare2.charAt(5*d + a);
                }
                
                output = ciphertext.toUpperCase();
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
