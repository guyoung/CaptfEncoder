export class PlayfairCipherDecoder {
  _keySquare = "";

  constructor(options) {
    options = options || {};

    if (options.keySquare) {
      this._keySquare = options.keySquare;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
        return;
    }
    var ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/[j]/g, "i");
    var keysquare = this._keySquare.toLowerCase().replace(/[^a-z]/g, ""); 
  
    if(ciphertext.length < 1){ 
        throw("please enter some ciphertext (letters only)"); 
    }
       
    if(ciphertext.length % 2 != 0){ 
        throw("ciphertext length must be even."); 
    }    
    
    if(keysquare.length != 25){ 
        throw("keysquare must be 25 characters in length"); 
    }

    var plaintext = "";

    for(let i=0; i<ciphertext.length; i+=2){
        var a = ciphertext.charAt(i); 
        var b = ciphertext.charAt(i+1); 
        var row1 = Math.floor(keysquare.indexOf(a) / 5);
        var col1 = keysquare.indexOf(a) % 5;
        var row2 = Math.floor(keysquare.indexOf(b) / 5);
        var col2 = keysquare.indexOf(b) % 5;
        
        var c, d;
        if(row1 == row2){
            if(col1 == 0) {
                c = keysquare.charAt(row1*5 + 4);
            }
            else {
                c = keysquare.charAt(row1*5 + col1 - 1);
            }
            if(col2 == 0) {
                d = keysquare.charAt(row2*5 + 4);
            }
            else {
                d = keysquare.charAt(row2*5 + col2 - 1);
            }
        }else if(col1 == col2){
            if(row1 == 0) {
                c = keysquare.charAt(20 + col1);
            }
            else{
                c = keysquare.charAt((row1-1)*5 + col1);
            } 
            if(row2 == 0) {
                d = keysquare.charAt(20 + col2);
            }
            else {
                d = keysquare.charAt((row2-1)*5 + col2);
            }
        }else{
            c = keysquare.charAt(row1*5 + col2);
            d = keysquare.charAt(row2*5 + col1);
        }
        plaintext += c + d;
    }
    return plaintext.toUpperCase();
  }
}
