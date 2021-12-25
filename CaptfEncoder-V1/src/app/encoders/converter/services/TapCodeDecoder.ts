import { TapCodeEncoder } from "./TapCodeEncoder";
import { StringConverter } from "./StringConverter";

export class TapCodeDecoder {
  _wordDelim = " ";

  constructor(options) {
    options = options || {};

    if (options.wordDelim) {
      this._wordDelim = options.wordDelim;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var self = this;

    var tapCodeTable = TapCodeEncoder.tapCodeTable;

    let reversedTable = {};

    for (const letter in tapCodeTable) {
      const signal = tapCodeTable[letter];
      reversedTable[signal] = letter;
    }

    let words = [input];
    if (self._wordDelim) {
      words = input.split(self._wordDelim);
    }
    words = Array.prototype.map.call(words, function(word) {

      var letters = []
      for(let i=0; i< word.length; i=i+2) {
        var val = word.substr(i, 2);
        if (reversedTable[val]) {
          letters.push(reversedTable[val]);
        }        
      }

      return letters.join("");
    });

    var result = words.join(" ");

    return result;
  }
}
