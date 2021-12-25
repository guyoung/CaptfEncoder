export class ADFGVXCipherEncoder {
    _keySquare = "";
    _keyword = "";
  
    constructor(options) {
      options = options || {};
  
      if (options.keySquare) {
        this._keySquare = options.keySquare;
      }
      if (options.keyword) {
          this._keyword = options.keyword;
        }
    }
  
    async handle(input) { 
        if (!input || input.length < 1) {
            return;
        }

        var plaintext = input.toLowerCase().replace(/[^a-z0-9]/g, "");  
        var keysquare = this._keySquare.toLowerCase().replace(/[^a-z0-9]/g, ""); 
        var keyword = this._keyword.toLowerCase().replace(/[^a-z]/g, ""); 
        
        if(plaintext.length < 1){ 
            throw("please enter some plaintext (letters and numbers only)"); 
        }   
        if(keysquare.length != 36){ 
            throw("keysquare must be 36 characters in length"); 
        }
        if(keyword.length <= 1){ 
            throw("keyword should be at least 2 characters long"); }

        var adfgvx = "ADFGVX";    
        var ciphertext1 = "";

        for(let i=0; i<plaintext.length; i++){
            var index = keysquare.indexOf(plaintext.charAt(i));
            ciphertext1 += adfgvx.charAt(index/6) + adfgvx.charAt(index%6);
        }
        
        var colLength = ciphertext1.length / keyword.length;
        var chars = "abcdefghijklmnopqrstuvwxyz"; 

        var ciphertext = ""; 
        var k=0;

        for(let i=0; i < keyword.length; i++){
            while(k<26){
                var t = keyword.indexOf(chars.charAt(k));
                var arrkw = keyword.split(""); arrkw[t] = "_"; keyword = arrkw.join("");
                if(t >= 0) break;
                else k++;
            }

            for(let j=0; j < colLength; j++) {
                ciphertext += ciphertext1.charAt(j*keyword.length + t);
            }
        }
        
        return ciphertext;
    }
  }
  