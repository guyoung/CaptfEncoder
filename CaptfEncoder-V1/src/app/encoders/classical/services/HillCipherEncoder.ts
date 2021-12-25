export class HillCipherEncoder {
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
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
    var strKeys = this._key.split(" ");

    if(plaintext.length < 1){ 
      throw("please enter some plaintext (letters and numbers only)"); 
    }   
    if (plaintext.length % 2 == 1) {
      plaintext = plaintext + "x";
    }
    if (strKeys.length != 4) {
      throw "key should consist of 4 integers";
    }

    var keys = [strKeys.length];
    for (var i = 0; i < 4; i++) {
      keys[i] = parseInt(strKeys[i]) % 26;
    }

    var ciphertext = "";

    for (i = 0; i < plaintext.length; i += 2) {
      ciphertext += String.fromCharCode(
        (keys[0] * (plaintext.charCodeAt(i) - 97) +
          keys[1] * (plaintext.charCodeAt(i + 1) - 97)) %
          26 +
          97
      );
      ciphertext += String.fromCharCode(
        (keys[2] * (plaintext.charCodeAt(i) - 97) +
          keys[3] * (plaintext.charCodeAt(i + 1) - 97)) %
          26 +
          97
      );
    }

    return ciphertext;
  }
}
