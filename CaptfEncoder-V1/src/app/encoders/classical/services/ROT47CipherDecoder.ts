export class ROT47CipherDecoder {
  _shift = 47;

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

      if (33 <= c && c <= 126)
        plaintext += String.fromCharCode(
          ((c - 33 + 94 - this._shift) % 94) + 33
        );     
      else plaintext += ciphertext.charAt(i);
    }

    return plaintext;
  }
}
