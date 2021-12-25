export class FourSquareCipherEncoder {
    _keySquare1 = "";
    _keySquare2 = "";
  
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
      
        var plaintext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
        var k1 = this._keySquare1.toLowerCase().replace(/[^a-z]/g, ""); 
        var k2 = this._keySquare2.toLowerCase().replace(/[^a-z]/g, ""); 
        
        if(plaintext.length < 1){ 
            throw ("please enter some plaintext (letters and numbers only)");
        }    
        if(k1.length != 25 || k2.length != 25){ 
            throw("keysquare must be 25 characters in length");  
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
            ciphertext += k1.charAt(5*b + c);
            ciphertext += k2.charAt(5*d + a);
        }
        
        return ciphertext.toUpperCase();
    }
  }
  