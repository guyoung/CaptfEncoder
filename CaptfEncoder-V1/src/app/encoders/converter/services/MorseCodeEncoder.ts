export class MorseCodeEncoder {
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

    input = input.split(/\r?\n/);
    input = Array.prototype.map.call(input, function(line) {
      let words = line.split(/ +/);
      words = Array.prototype.map.call(words, function(word) {
        const letters = Array.prototype.map.call(word, function(character) {
          const letter = character.toUpperCase();
          if (typeof morseTable[letter] == "undefined") {
            return "";
          }

          return morseTable[letter];
        });

        return letters.join("<ld>");
      });
      line = words.join("<wd>");
      return line;
    });
    input = input.join("\n");

    input = input.replace(/<dash>|<dot>|<ld>|<wd>/g, function(match) {
      switch (match) {
        case "<dash>":
          return self._dashFormat;
        case "<dot>":
          return self._dotFormat;
        case "<ld>":
          return self._letterDelim;
        case "<wd>":
          return self._wordDelim;
      }
    });

    return input;
  }

  static get morseTable() {
    return {
      "A": "<dot><dash>",
      "B": "<dash><dot><dot><dot>",
      "C": "<dash><dot><dash><dot>",
      "D": "<dash><dot><dot>",
      "E": "<dot>",
      "F": "<dot><dot><dash><dot>",
      "G": "<dash><dash><dot>",
      "H": "<dot><dot><dot><dot>",
      "I": "<dot><dot>",
      "J": "<dot><dash><dash><dash>",
      "K": "<dash><dot><dash>",
      "L": "<dot><dash><dot><dot>",
      "M": "<dash><dash>",
      "N": "<dash><dot>",
      "O": "<dash><dash><dash>",
      "P": "<dot><dash><dash><dot>",
      "Q": "<dash><dash><dot><dash>",
      "R": "<dot><dash><dot>",
      "S": "<dot><dot><dot>",
      "T": "<dash>",
      "U": "<dot><dot><dash>",
      "V": "<dot><dot><dot><dash>",
      "W": "<dot><dash><dash>",
      "X": "<dash><dot><dot><dash>",
      "Y": "<dash><dot><dash><dash>",
      "Z": "<dash><dash><dot><dot>",
      "1": "<dot><dash><dash><dash><dash>",
      "2": "<dot><dot><dash><dash><dash>",
      "3": "<dot><dot><dot><dash><dash>",
      "4": "<dot><dot><dot><dot><dash>",
      "5": "<dot><dot><dot><dot><dot>",
      "6": "<dash><dot><dot><dot><dot>",
      "7": "<dash><dash><dot><dot><dot>",
      "8": "<dash><dash><dash><dot><dot>",
      "9": "<dash><dash><dash><dash><dot>",
      "0": "<dash><dash><dash><dash><dash>",
      ".": "<dot><dash><dot><dash><dot><dash>",
      ",": "<dash><dash><dot><dot><dash><dash>",
      ":": "<dash><dash><dash><dot><dot><dot>",
      ";": "<dash><dot><dash><dot><dash><dot>",
      "!": "<dash><dot><dash><dot><dash><dash>",
      "?": "<dot><dot><dash><dash><dot><dot>",
      "'": "<dot><dash><dash><dash><dash><dot>",
      '"': "<dot><dash><dot><dot><dash><dot>",
      "/": "<dash><dot><dot><dash><dot>",
      "-": "<dash><dot><dot><dot><dot><dash>",
      "+": "<dot><dash><dot><dash><dot>",
      "(": "<dash><dot><dash><dash><dot>",
      ")": "<dash><dot><dash><dash><dot><dash>",
      "@": "<dot><dash><dash><dot><dash><dot>",
      "=": "<dash><dot><dot><dot><dash>",
      "&": "<dot><dash><dot><dot><dot>",
      "_": "<dot><dot><dash><dash><dot><dash>",
      "$": "<dot><dot><dot><dash><dot><dot><dash>"
    };
  }
}
