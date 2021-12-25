export class  AffineCipherDecoder {
  _addkey = 0;
  _multkey = 1;

  constructor(options) {
    options = options || {};

    if (options.addkey) {
      this._addkey = parseInt(options.addkey);
    }
    if (options.multkey) {
      this._multkey = parseInt(options.multkey);
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var word = input;
    word = word.toLowerCase();
    word = word.replace(/\W/g, "");

    var addkey = this._addkey;
    var multkey = this._multkey;

    var multinverse = 1;
    for (let i = 1; i <= 25; i = i + 2) {
      if ((multkey * i) % 26 == 1) {
        multinverse = i;
      }
    }
    var newword = "";
    for (let i = 0; i < word.length; i++) {
      var code = word.charCodeAt(i) - 97;
      var newcode = (multinverse * (code + 26 - addkey)) % 26 + 97;
      var newletter = String.fromCharCode(newcode);
      var newword = newword + newletter;
    }
    return newword.toLowerCase();
  }
}
