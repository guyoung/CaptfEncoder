export class PlayfairCipherEncoder {
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
    var plaintext = input.replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
    var keysquare = this._keySquare.replace(/[^a-z]/g, ""); 

    if(plaintext.length < 1){ 
        throw("please enter some plaintext (letters and numbers only)");
    } 
    if(keysquare.length != 25){ 
        throw("keysquare must be 25 characters in length"); 
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
        
        var row1 = Math.floor(keysquare.indexOf(a) / 5);
        var col1 = keysquare.indexOf(a) % 5;
        var row2 = Math.floor(keysquare.indexOf(b) / 5);
        var col2 = keysquare.indexOf(b) % 5;

        var c, d;

        if(row1 == row2){            
            if(col1 == 4) {
                c = keysquare.charAt(row1*5);
            }
            else {
                c = keysquare.charAt(row1*5 + col1 + 1);
            }
            if(col2 == 4) {
                d = keysquare.charAt(row2*5);
            }
            else {
                d = keysquare.charAt(row2*5 + col2 + 1);
            }
        }else if(col1 == col2){
            if(row1 == 4) {
                c = keysquare.charAt(col1);
            }
            else {
                c = keysquare.charAt((row1+1)*5 + col1);
            }
            if(row2 == 4) {
                d = keysquare.charAt(col2);
            }
            else {
                d = keysquare.charAt((row2+1)*5 + col2);
            }
        }else{
            c = keysquare.charAt(row1*5 + col2);
            d = keysquare.charAt(row2*5 + col1);
        }
        
        ciphertext += c + d;
    }
    
    return ciphertext.toUpperCase();
  }
}
