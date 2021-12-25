export class PortaCipherDecoder {
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
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
    var k = this._keyword.toLowerCase().replace(/[^a-z]/g, "");

    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters and numbers only)"); 
    }    
    if (k.length <= 1) {
      throw "keyword should be at least 2 characters long";
    }

    var plaintext = "";

    for (let i = 0; i < ciphertext.length; i++) {
      var j = i % k.length;

      if (k[j] == "a" || k[j] == "b")
        plaintext += "nopqrstuvwxyzabcdefghijklm"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "y" || k[j] == "z")
        plaintext += "znopqrstuvwxybcdefghijklma"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "w" || k[j] == "x")
        plaintext += "yznopqrstuvwxcdefghijklmab"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "u" || k[j] == "v")
        plaintext += "xyznopqrstuvwdefghijklmabc"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "s" || k[j] == "t")
        plaintext += "wxyznopqrstuvefghijklmabcd"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "q" || k[j] == "r")
        plaintext += "vwxyznopqrstufghijklmabcde"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "o" || k[j] == "p")
        plaintext += "uvwxyznopqrstghijklmabcdef"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "m" || k[j] == "n")
        plaintext += "tuvwxyznopqrshijklmabcdefg"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "k" || k[j] == "l")
        plaintext += "stuvwxyznopqrijklmabcdefgh"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "i" || k[j] == "j")
        plaintext += "rstuvwxyznopqjklmabcdefghi"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "g" || k[j] == "h")
        plaintext += "qrstuvwxyznopklmabcdefghij"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "e" || k[j] == "f")
        plaintext += "pqrstuvwxyznolmabcdefghijk"[
          ciphertext.charCodeAt(i) - 97
        ];
      else if (k[j] == "c" || k[j] == "d")
        plaintext += "opqrstuvwxyznmabcdefghijkl"[
          ciphertext.charCodeAt(i) - 97
        ];
    }
    return plaintext;
  }
}
