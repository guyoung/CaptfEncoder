export class PolybiusSquareCipherDecoder {
  _key = "";
  _letters = "";

  constructor(options) {
    options = options || {};

    if (options.key) {
      this._key = options.key;
      this._letters = options.letters;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");  
    var key = this._key.toLowerCase().replace(/[^a-z]/g, "");
    var letters = this._letters.toLowerCase(); 

    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters only)"); 
    }    
    if (key.length != 25) {
      throw "keysquare must be 25 characters in length";
    }
    if (key.indexOf("j") >= 0) {
      throw "key should not contain letter j";
    }

    if (letters.length != 5) {
      throw "there must be 5 ciphertext characters (and no duplicates)";
    }

	var plaintext = "";
    for(let i=0; i<ciphertext.length; i+=2){ 
		var keyindex = letters.indexOf(ciphertext.charAt(i))*5 
			+ letters.indexOf(ciphertext.charAt(i+1)); 
        if(keyindex >= 0) {
			plaintext += key.charAt(keyindex);
		} 
	}
	
    return plaintext;
  }
}
