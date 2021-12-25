export class SimpleSubstitutionCipherDecoder {
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
    var ciphertext = input.toLowerCase();
    var key = this._key.toLowerCase().replace(/[^a-z]/g, "");

    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters only)"); 
  }   
    if (key.length != 26) {
      throw "key must be 26 characters in length";
    }

    var plaintext = "";
    var re = /[a-z]/;

    for (let i = 0; i < ciphertext.length; i++) {
      if (re.test(ciphertext.charAt(i))) {
        plaintext += String.fromCharCode(
          key.indexOf(ciphertext.charAt(i)) + 97
        );
      } else {
        plaintext += ciphertext.charAt(i);
      }
    }
    return plaintext;
  }
}
