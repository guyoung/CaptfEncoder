export class TapCodeEncoder {
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

    var tapCodeTable = TapCodeEncoder.tapCodeTable;

    var words = input.split(this._wordDelim);
    words = Array.prototype.map.call(words, function(word) {
      word = word.toUpperCase();
      word.replace(/\K/g, "");
      const letters = Array.prototype.map.call(word, function(character) {
        const letter = character.toUpperCase();
        if (typeof tapCodeTable[letter] == "undefined") {
          return "";
        }

        return tapCodeTable[letter];
      });

      return letters.join("");
    });

    return words.join(this._wordDelim);
  }

  static get tapCodeTable() {
    return {
      A: "11",
      B: "12",
      C: "13",
      D: "14",
      E: "15",
      F: "21",
      G: "22",
      H: "23",
      I: "24",
      J: "25",
      L: "31",
      M: "32",
      N: "33",
      O: "34",
      P: "35",
      Q: "41",
      R: "42",
      S: "43",
      T: "44",
      U: "45",
      V: "51",
      W: "52",
      X: "53",
      Y: "54",
      Z: "55"
    };
  }
}
