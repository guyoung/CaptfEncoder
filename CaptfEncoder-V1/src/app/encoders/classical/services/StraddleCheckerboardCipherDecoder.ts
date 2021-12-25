
export class StraddleCheckerboardCipherDecoder {
  _key = "";
  _numbers = "";

  constructor(options) {
    options = options || {};

    if (options.key) {
      this._key = options.key;
    }
    if (options.numbers) {
      this._numbers = options.numbers;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var ciphertext = input.toLowerCase().replace(/[^0-9]/g, "");
    var key = this._key.toLowerCase().replace(/[^a-z]/g, "");
    var num = this._numbers.replace(/[^0-9]/g, "");

    if (ciphertext.length < 1) {
      throw "please enter some ciphertext (letters only)";
    }
    if (key.length != 26) {
      throw "keysquare must be 26 characters in length";
    }
    if (num.length != 2) {
      throw "there must be 2 numbers provided also e.g. '3 7'";
    }

    var plaintext = "";

    for (var i = 0; i < ciphertext.length; i++) {
      if (parseInt(ciphertext.charAt(i)) == parseInt(num[0])) {
        if (ciphertext.length == i + 1) {
          //console.log("invalid final ciphertext character: "+num[0]);
          plaintext += "?";
        } else {
          plaintext += key.charAt(parseInt(ciphertext.charAt(++i)) + 8);
        }
      } else if (parseInt(ciphertext.charAt(i)) == parseInt(num[1])) {
        if (ciphertext.length == i + 1) {
          //console.log("invalid final ciphertext character: "+num[1]);
          plaintext += "?";
        } else {
          var temp = parseInt(ciphertext.charAt(++i)) + 18;
          if (temp > 25) {
            //console.log("invalid ciphertext sequence: "+num[1]+ciphertext.charAt(i));
            plaintext += "?";
          } else {
            plaintext += key.charAt(temp);
          }
        }
      } else {
        var n = parseInt(ciphertext.charAt(i));
        if (n < parseInt(num[0])) {
          plaintext += key.charAt(n);
        } else if (n < parseInt(num[1])) {
          plaintext += key.charAt(n - 1);
        } else {
          plaintext += key.charAt(n - 2);
        }
      }
    }

    return plaintext;
  }
}
