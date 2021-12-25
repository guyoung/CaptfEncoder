export class BaconianCipherDecoder {

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
      var ciphertext = input.toUpperCase();
  
      var index = -1;
      var length = ciphertext.length;
      var space = "";
      var result = "";
      var buffer = [];
      var symbol;
      var alphabetIndex;
      while (++index < length) {
        symbol = ciphertext.charAt(index);
        if (symbol == "A" || symbol == "B") {
          buffer.push(symbol);
        } else {
          // Prepare a space to be added to the output.
          space = " ";
        }
        if (buffer.length == 5) {
          alphabetIndex =
            (buffer[0] == "A" ? 0 : 0x10) + // 0b10000
            (buffer[1] == "A" ? 0 : 0x08) + // 0b01000
            (buffer[2] == "A" ? 0 : 0x04) + // 0b00100
            (buffer[3] == "A" ? 0 : 0x02) + // 0b00010
            (buffer[4] == "A" ? 0 : 0x01); // 0b00001
          buffer = [];
          result += (result.length ? space : "") + this._alphabet.charAt(alphabetIndex);
          space = "";
        }
      }
      return result;
    }
  }
  