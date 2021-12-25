export class ROT47CipherEncoder {
  _shift = 47;

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
    
      if (33 <= c && c <= 126)
        ciphertext += String.fromCharCode(((c - 33 + this._shift) % 94) + 33);     
      else ciphertext += plaintext.charAt(i);
    }

    return ciphertext;
  }
}
