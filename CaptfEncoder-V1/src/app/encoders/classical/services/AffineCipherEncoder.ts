export class AffineCipherEncoder {
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

    var newword = "";
    for (let i = 0; i < word.length; i++) {
      var code = word.charCodeAt(i) - 97;
      var newcode = (multkey * code + addkey) % 26 + 97;
      var newletter = String.fromCharCode(newcode);
      newword = newword + newletter;
    }
    return newword + " ";
  }
}
