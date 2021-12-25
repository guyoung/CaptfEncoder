export class ROT13CipherDecoder {
  _shift = 13;

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

      if (65 <= c && c <= 90)
        plaintext += String.fromCharCode(
          ((c - 65 + 26 - this._shift) % 26) + 65
        );
      else if (97 <= c && c <= 122)
        plaintext += String.fromCharCode(
          ((c - 97 + 26 - this._shift) % 26) + 97
        );
      else plaintext += ciphertext.charAt(i);
    }

    return plaintext;
  }
}
