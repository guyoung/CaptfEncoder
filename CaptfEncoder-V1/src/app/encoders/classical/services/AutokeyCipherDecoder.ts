export class AutokeyCipherDecoder {
  _keyword = "";

  constructor(options) {
    options = options || {};

    if (options.keyword) {
      this._keyword = options.keyword;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
    var k = this._keyword.toLowerCase().replace(/[^a-z]/g, "");

    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters and numbers only)"); 
    }  
    if (k.length <= 1) {
      throw "keyword should be at least 2 characters long";
    }

    var plaintext = "";

    for (let i = 0; i < ciphertext.length; i++) {
      if (i < k.length) {
        plaintext += String.fromCharCode(
          (ciphertext.charCodeAt(i) - 97 - (k.charCodeAt(i) - 97) + 26) % 26 +
            97
        );
      } else {
        plaintext += String.fromCharCode(
          (ciphertext.charCodeAt(i) -
            97 -
            (plaintext.charCodeAt(i - k.length) - 97) +
            26) %
            26 +
            97
        );
      }
    }

    return plaintext;
  }
}
