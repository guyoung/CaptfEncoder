export class PortaCipherEncoder {
  _keyword = "";

  constructor(options) {
    options = options || {};

    if (options.keyword) {
      this._keyword = options.keyword;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
    var k = this._keyword.toLowerCase().replace(/[^a-z]/g, "");

    if(plaintext.length < 1){ 
      throw ("please enter some plaintext (letters and numbers only)"); 
    }
    if (k.length <= 1) {
      throw "keyword should be at least 2 characters long";
    }

    var ciphertext = "";

    for (let i = 0; i < plaintext.length; i++) {
      var j = i % k.length;
      if (k[j] == "a" || k[j] == "b")
        ciphertext += "nopqrstuvwxyzabcdefghijklm"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "y" || k[j] == "z")
        ciphertext += "znopqrstuvwxybcdefghijklma"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "w" || k[j] == "x")
        ciphertext += "yznopqrstuvwxcdefghijklmab"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "u" || k[j] == "v")
        ciphertext += "xyznopqrstuvwdefghijklmabc"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "s" || k[j] == "t")
        ciphertext += "wxyznopqrstuvefghijklmabcd"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "q" || k[j] == "r")
        ciphertext += "vwxyznopqrstufghijklmabcde"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "o" || k[j] == "p")
        ciphertext += "uvwxyznopqrstghijklmabcdef"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "m" || k[j] == "n")
        ciphertext += "tuvwxyznopqrshijklmabcdefg"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "k" || k[j] == "l")
        ciphertext += "stuvwxyznopqrijklmabcdefgh"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "i" || k[j] == "j")
        ciphertext += "rstuvwxyznopqjklmabcdefghi"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "g" || k[j] == "h")
        ciphertext += "qrstuvwxyznopklmabcdefghij"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "e" || k[j] == "f")
        ciphertext += "pqrstuvwxyznolmabcdefghijk"[
          plaintext.charCodeAt(i) - 97
        ];
      else if (k[j] == "c" || k[j] == "d")
        ciphertext += "opqrstuvwxyznmabcdefghijkl"[
          plaintext.charCodeAt(i) - 97
        ];
    }

    return ciphertext;
  }
}
