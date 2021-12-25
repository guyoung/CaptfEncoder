export class ROT5CipherEncoder {
  _shift = 5;

  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    var plaintext = input;
    var ciphertext = "";

    for (var i = 0; i < plaintext.length; i++) {
      var c = plaintext.charCodeAt(i);
    
      if (48 <= c && c <= 57)
        ciphertext += String.fromCharCode(((c - 48 + this._shift) % 10) + 48);     
      else ciphertext += plaintext.charAt(i);
    }

    return ciphertext;
  }
}
