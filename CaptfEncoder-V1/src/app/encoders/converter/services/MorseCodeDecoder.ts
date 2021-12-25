import { MorseCodeEncoder } from "./MorseCodeEncoder";
import { StringConverter } from "./StringConverter";

export class MorseCodeDecoder {
  _dashFormat = "-";
  _dotFormat = "·";
  _letterDelim = " ";
  _wordDelim = "/";

  constructor(options) {
    options = options || {};

    if (options.dashFormat) {
      this._dashFormat = options.dashFormat;
    }
    if (options.dotFormat) {
      this._dotFormat = options.dotFormat;
    }
    if (options.letterDelim) {
      this._letterDelim = options.letterDelim;
    }
    if (options.wordDelim) {
      this._wordDelim = options.wordDelim;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var self = this;

    var morseTable = MorseCodeEncoder.morseTable;

    let reversedTable = {};

    for (const letter in morseTable) {
      const signal = morseTable[letter];
      reversedTable[signal] = letter;
    }

    input = StringConverter.replaceAll(input, this._dashFormat, "<dash>");
    input = StringConverter.replaceAll(input, this._dotFormat, "<dot>");

    let words = [input];
    if (self._wordDelim) {
      words = input.split(self._wordDelim);
    }
    words = Array.prototype.map.call(words, function(word) {
      const signals = word.split(self._letterDelim);

      const letters = signals.map(function(signal) {
        return reversedTable[signal];
      });
      
      return letters.join("");
    });

    var result = words.join(" ");

    return result;
  }
}
