export class SimpleSubstitutionCipherEncoder {
  _key = "";

  constructor(options) {
    options = options || {};

    if (options.key) {
      this._key = options.key;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var plaintext = input.toLowerCase();
    var key = this._key.toLowerCase().replace(/[^a-z]/g, "");

    if(plaintext.length < 1){ 
        throw("please enter some plaintext (letters and numbers only)");
    }    
    if (key.length != 26) {
      throw "key must be 26 characters in length";
    }
    var ciphertext = "";
    var re = /[a-z]/;

    for (let i = 0; i < plaintext.length; i++) {
      if (re.test(plaintext.charAt(i))) {
        ciphertext += key.charAt(plaintext.charCodeAt(i) - 97);
      } else {
        ciphertext += plaintext.charAt(i);
      }
    }
    return ciphertext;
  }
}
