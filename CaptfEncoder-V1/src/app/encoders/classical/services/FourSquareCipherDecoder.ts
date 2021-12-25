export class FourSquareCipherDecoder {
    _keySquare1  = "";
    _keySquare2  = "";
  
    constructor(options) {
      options = options || {};
  
      if (options.keySquare1) {
        this._keySquare1 = options.keySquare1;
      }
      if (options.keySquare2) {
        this._keySquare2 = options.keySquare2;
      }
    }
  
     async handle(input) {
        if (!input || input.length < 1) {
            return;
        }
        var ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/[j]/g, "i"); 
        var k1 = this._keySquare1.toLowerCase().replace(/[^a-z]/g, ""); 
        var k2 = this._keySquare2.toLowerCase().replace(/[^a-z]/g, ""); 
       
        if(ciphertext.length < 1){ 
            throw("please enter some plaintext (letters and numbers only)"); 
        }    
        if(k1.length != 25 || k2.length != 25){ 
            throw("keysquare must be 25 characters in length");
        }
        if(ciphertext.length % 2 == 1){
            throw("ciphertext should be even length (wrong algorithm?)"); 
        }
        
        var plaintext = "";  
        var rt = "abcdefghiklmnopqrstuvwxyz";
        
        for(let i=0; i<ciphertext.length; i+=2){
            var a = (k1.indexOf(ciphertext.charAt(i)) % 5); 
            var b = Math.floor(k1.indexOf(ciphertext.charAt(i)) / 5); 
            var c = (k2.indexOf(ciphertext.charAt(i+1)) % 5); 
            var d = Math.floor(k2.indexOf(ciphertext.charAt(i+1)) / 5); 
            plaintext += rt.charAt(5*b + c);
            plaintext += rt.charAt(5*d + a);
        }
        
        return plaintext.toUpperCase();
    }
  }
  