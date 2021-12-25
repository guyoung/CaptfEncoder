export class ADFGXCipherEncoder {
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
    
    var plaintext = input.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, "");  
    var keysquare = this._keySquare.toLowerCase().replace(/[^abcdefghiklmnopqrstuvwxyz]/g, ""); 
    var keyword = this._keyword.toLowerCase().replace(/[^a-z]/g, "");  
    
    if(plaintext.length < 1){ 
        throw("please enter some plaintext (letters only)");
    }    
    if(keysquare.length != 25){ 
        throw("keysquare must be 25 characters in length containing letters a-z (no j)");
    }
    if(keyword.length <= 1){ 
        throw("keyword should be at least 2 characters long"); 
    }
    
    var adfgvx = "ADFGX";    
    var ciphertext1 = "";

    for(let i=0; i<plaintext.length; i++){
        var index = keysquare.indexOf(plaintext.charAt(i));
        ciphertext1 += adfgvx.charAt(index/5) + adfgvx.charAt(index%5);
    }

    var colLength = ciphertext1.length / keyword.length;
    var chars = "abcdefghijklmnopqrstuvwxyz"; 

    var ciphertext = ""; 
    var k=0;

    for(let i=0; i < keyword.length; i++){
        while(k<26){
            var t = keyword.indexOf(chars.charAt(k));
            var arrkw = keyword.split(""); 
            arrkw[t] = "_"; keyword = arrkw.join("");
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
