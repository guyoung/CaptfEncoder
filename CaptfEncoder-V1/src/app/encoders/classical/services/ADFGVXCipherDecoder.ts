export class ADFGVXCipherDecoder {
  _keySquare = "";
  _keyword = "";

  constructor(options) {
    options = options || {};

    if (options.keySquare) {
      this._keySquare = options.keySquare;
    }
    if (options.keyword) {
      this._keyword = options.keyword;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    var ciphertext = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    var keysquare = this._keySquare.toLowerCase().replace(/[^a-z0-9]/g, "");
    var keyword = this._keyword.toLowerCase().replace(/[^a-z]/g, "");
    var klen = keyword.length;
    var re = /[^adfgvx]/;

    if (ciphertext.length < 1) {
      throw "please enter some ciphertext (letters only)";
    }
    if (re.test(ciphertext)) {
      throw "ciphertext can only contain A,D,F,G,V or X characters.";
    }
    if (ciphertext.length % 2 != 0) {
      throw "number of ciphertext characters must be even";
    }
    if (keysquare.length != 36) {
      throw "keysquare must be 36 characters in length";
    }
    if (klen <= 1) {
      throw "keyword should be at least 2 characters long";
    }
    var numLongCols = ciphertext.length % klen;
    var cols = new Array(klen);
    var colLength = Math.floor(ciphertext.length / klen);

    var chars = "abcdefghijklmnopqrstuvwxyz";
    var i = 0;
    var upto = 0;

    for (let j = 0; j < klen; ) {
      var t = keyword.indexOf(chars.charAt(i));
      if (t >= 0) {
        var cl;
        if (t < numLongCols) {
          cl = colLength + 1;
        } else {
          cl = colLength;
        }
        cols[t] = ciphertext.substr(upto, cl);
        upto = upto + cl;
        var arrkw = keyword.split("");
        arrkw[t] = "_";
        keyword = arrkw.join("");
        j++;
      } else {
        i++;
      }
    }

    var plaintext1 = "";
    for (let j = 0; j < colLength + 1; j++) {
      for (i = 0; i < klen; i++) {
        plaintext1 += cols[i].charAt(j);
      }
    }

    var adfgvx = "adfgvx";
    var plaintext = "";

    for (i = 0; i < plaintext1.length; i += 2) {
      var keyindex =
        adfgvx.indexOf(plaintext1.charAt(i)) * 6 +
        adfgvx.indexOf(plaintext1.charAt(i + 1));
      plaintext += keysquare.charAt(keyindex);
    }

    return plaintext;
  }
}
