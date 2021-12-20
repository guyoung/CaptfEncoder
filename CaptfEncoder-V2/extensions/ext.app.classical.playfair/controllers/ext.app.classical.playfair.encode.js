const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';
            
            if (input && input.length > 0) { 
                let keySquare = defaultValue(options.keySquare, '');

                let plaintext = input.replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
                keySquare = keySquare.replace(/[^a-z]/g, ""); 
            
                if(plaintext.length < 1){ 
                    throw new Error("Please enter some plaintext (letters and numbers only)");
                } 
                if(keySquare.length != 25){ 
                    throw new Error("Key square must be 25 characters in length"); 
                }
                
                while(plaintext.length % 2 != 0) {
                    plaintext += "x";    
                } 
            
                var ciphertext = "";
            
                for(let i=0; i<plaintext.length; i+=2){
                    var a = plaintext.charAt(i); 
                    var b = plaintext.charAt(i+1); 
                    if(a == b) {
                        b = "x";
                    }
                    
                    var row1 = Math.floor(keySquare.indexOf(a) / 5);
                    var col1 = keySquare.indexOf(a) % 5;
                    var row2 = Math.floor(keySquare.indexOf(b) / 5);
                    var col2 = keySquare.indexOf(b) % 5;
            
                    var c, d;
            
                    if(row1 == row2){            
                        if(col1 == 4) {
                            c = keySquare.charAt(row1*5);
                        }
                        else {
                            c = keySquare.charAt(row1*5 + col1 + 1);
                        }
                        if(col2 == 4) {
                            d = keySquare.charAt(row2*5);
                        }
                        else {
                            d = keySquare.charAt(row2*5 + col2 + 1);
                        }
                    }else if(col1 == col2){
                        if(row1 == 4) {
                            c = keySquare.charAt(col1);
                        }
                        else {
                            c = keySquare.charAt((row1+1)*5 + col1);
                        }
                        if(row2 == 4) {
                            d = keySquare.charAt(col2);
                        }
                        else {
                            d = keySquare.charAt((row2+1)*5 + col2);
                        }
                    }else{
                        c = keySquare.charAt(row1*5 + col2);
                        d = keySquare.charAt(row2*5 + col1);
                    }
                    
                    ciphertext += c + d;
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
