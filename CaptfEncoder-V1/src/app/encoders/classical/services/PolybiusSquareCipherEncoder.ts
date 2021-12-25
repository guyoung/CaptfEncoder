export class PolybiusSquareCipherEncoder {
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
    var plaintext = input
      .toLowerCase()
      .replace(/j/g, "i")
      .replace(/[^a-z]/g, "");
    var key = this._key.replace(/[^a-z]/g, "");
    var letters = this._letters.toUpperCase();

    if(plaintext.length < 1){ 
      throw("please enter some plaintext (letters only)"); 
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

    var ciphertext = "";
    for (let i = 0; i < plaintext.length; i++) {
      var index = key.indexOf(plaintext.charAt(i));
      if (index >= 0) {
        ciphertext += letters.charAt(index / 5) + letters.charAt(index % 5);
      } else {
        ciphertext += plaintext.charAt(i);
      }
    }
    return ciphertext;
  }
}
