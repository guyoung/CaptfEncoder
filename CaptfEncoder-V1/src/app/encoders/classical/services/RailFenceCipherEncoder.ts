export class RailFenceCipherEncoder {
  _number = 2;

  constructor(options) {
    options = options || {};

    if (options.number) {
      this._number = parseInt(options.number);
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var plaintext = input;

    if (this._number == 1) {
      return plaintext;
    }

    var ciphertext = "";
    var line;

    for (line = 0; line < this._number - 1; line++) {
      var skip = 2 * (this._number - line - 1);
      var j = 0;
      for (let i = line; i < plaintext.length; ) {
        ciphertext += plaintext.charAt(i);
        if (line == 0 || j % 2 == 0) {
          i += skip;
        } else {
          i += 2 * (this._number - 1) - skip;
        }
        j++;
      }
    }

    for (let i = line; i < plaintext.length; i += 2 * (this._number - 1)) {
      ciphertext += plaintext.charAt(i);
    }

    return ciphertext;
  }
}
