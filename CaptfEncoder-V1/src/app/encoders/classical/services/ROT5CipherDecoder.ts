export class ROT5CipherDecoder {
  _shift = 5;

  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
    }
    var ciphertext = input;
    var plaintext = "";

    for (var i = 0; i < ciphertext.length; i++) {
      var c = ciphertext.charCodeAt(i);

      if (48 <= c && c <= 57)
        plaintext += String.fromCharCode(
          ((c - 48 + 10 - this._shift) % 10) + 48
        );     
      else plaintext += ciphertext.charAt(i);
    }

    return plaintext;
  }
}
