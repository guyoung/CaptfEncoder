export class ROT13CipherEncoder {
  _shift = 13;

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

      if (65 <= c && c <= 90)
        ciphertext += String.fromCharCode(((c - 65 + this._shift) % 26) + 65);
      else if (97 <= c && c <= 122)
        ciphertext += String.fromCharCode(((c - 97 + this._shift) % 26) + 97);
      else ciphertext += plaintext.charAt(i);
    }

    return ciphertext;
  }
}
