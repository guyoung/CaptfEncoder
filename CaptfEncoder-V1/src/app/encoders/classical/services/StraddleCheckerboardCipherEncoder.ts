export class StraddleCheckerboardCipherEncoder {
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
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
    var key = this._key.toLowerCase().replace(/[^a-z]/g, "");
    var num = this._numbers.replace(/[^0-9]/g, "");

    if (plaintext.length < 1) {
      throw "please enter some plaintext (letters only)";
    }
    if (key.length != 26) {
      throw "keysquare must be 26 characters in length";
    }
    if (num.length != 2) {
      throw "there must be 2 numbers provided also e.g. '3 7'";
    }

    var ciphertext = "";

    for (let i = 0; i < plaintext.length; i++) {
      var ind = key.indexOf(plaintext.charAt(i));
      if (ind < parseInt(num[0])) {
        ciphertext += ind;
      } else if (ind >= parseInt(num[0]) && ind < parseInt(num[1]) - 1) {
        ciphertext += ind + 1;
      } else if (ind >= parseInt(num[1]) - 1 && ind < 8) {
        ciphertext += ind + 2;
      } else if (ind < 18) {
        ciphertext += num[0] + "" + (ind - 8);
      } else {
        ciphertext += num[1] + "" + (ind - 18);
      }
    }

    return ciphertext;
  }
}
