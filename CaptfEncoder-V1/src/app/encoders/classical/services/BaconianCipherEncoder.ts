export class BaconianCipherEncoder {

  DEFAULT_ALPHABET = "ABCDEFGHIKLMNOPQRSTUWXYZ";
  _alphabet = "ABCDEFGHIKLMNOPQRSTUWXYZ";

  constructor(options) {
    options = options || {};

    if (options.alphabet) {
      this._alphabet = options.alphabet.toUpperCase();
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
        return;
    }
    var plaintext = input.toUpperCase();
    if (this._alphabet == this.DEFAULT_ALPHABET) {
        plaintext
        .replace(/J/g, 'I')
        .replace(/V/g, 'U');
    }

    var index = -1;
    var length = plaintext.length;
    var alphabetIndex;
    var space = '';
    var result = '';
    while (++index < length) {
        alphabetIndex = this._alphabet.indexOf(plaintext.charAt(index));
        if (alphabetIndex > -1) {
            result += space + (
                (alphabetIndex & 0x10 ? 'B' : 'A') + // 0b10000
                (alphabetIndex & 0x08 ? 'B' : 'A') + // 0b01000
                (alphabetIndex & 0x04 ? 'B' : 'A') + // 0b00100
                (alphabetIndex & 0x02 ? 'B' : 'A') + // 0b00010
                (alphabetIndex & 0x01 ? 'B' : 'A')   // 0b00001
            );
            space = '';
        } else if (index) {
            // Prepare a space to be added to the output, unless it’s leading space.
            space = ' ';
        }
    }
    return result;
  }
}
