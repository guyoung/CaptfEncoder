const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                let keySquare = defaultValue(options.keySquare, '');

                var ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/[j]/g, "i");
                keySquare = keySquare.toLowerCase().replace(/[^a-z]/g, ""); 
              
                if(ciphertext.length < 1){ 
                    throw new Error("Please enter some ciphertext (letters only)"); 
                }
                   
                if(ciphertext.length % 2 != 0){ 
                    throw new Error("Ciphertext length must be even."); 
                }    
                
                if(keySquare.length != 25){ 
                    throw new Error("Key square must be 25 characters in length"); 
                }
            
                var plaintext = "";
            
                for(let i=0; i<ciphertext.length; i+=2){
                    var a = ciphertext.charAt(i); 
                    var b = ciphertext.charAt(i+1); 
                    var row1 = Math.floor(keySquare.indexOf(a) / 5);
                    var col1 = keySquare.indexOf(a) % 5;
                    var row2 = Math.floor(keySquare.indexOf(b) / 5);
                    var col2 = keySquare.indexOf(b) % 5;
                    
                    var c, d;
                    if(row1 == row2){
                        if(col1 == 0) {
                            c = keySquare.charAt(row1*5 + 4);
                        }
                        else {
                            c = keySquare.charAt(row1*5 + col1 - 1);
                        }
                        if(col2 == 0) {
                            d = keySquare.charAt(row2*5 + 4);
                        }
                        else {
                            d = keySquare.charAt(row2*5 + col2 - 1);
                        }
                    }else if(col1 == col2){
                        if(row1 == 0) {
                            c = keySquare.charAt(20 + col1);
                        }
                        else{
                            c = keySquare.charAt((row1-1)*5 + col1);
                        } 
                        if(row2 == 0) {
                            d = keySquare.charAt(20 + col2);
                        }
                        else {
                            d = keySquare.charAt((row2-1)*5 + col2);
                        }
                    }else{
                        c = keySquare.charAt(row1*5 + col2);
                        d = keySquare.charAt(row2*5 + col1);
                    }
                    plaintext += c + d;
                }
                
                output = plaintext.toUpperCase();
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

