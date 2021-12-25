export class RailFenceCipherDecoder {
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
    var ciphertext = input;

    var pt = new Array(ciphertext.length);
    var k = 0;
    var line;

    for (line = 0; line < this._number - 1; line++) {
      var skip = 2 * (this._number - line - 1);
      var j = 0;
      for (var i = line; i < ciphertext.length; ) {
        pt[i] = ciphertext.charAt(k++);
        if (line == 0 || j % 2 == 0) i += skip;
        else i += 2 * (this._number - 1) - skip;
        j++;
      }
    }

    for (i = line; i < ciphertext.length; i += 2 * (this._number - 1)) {
      pt[i] = ciphertext.charAt(k++);
    }

    var plaintext = pt.join("");

    return plaintext;
  }
}
