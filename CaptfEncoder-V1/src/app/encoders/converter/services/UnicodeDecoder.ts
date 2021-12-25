export class UnicodeDecoder {
  _delimiter = "\\u";

  constructor(options) {
    options = options || {};

    if (options.delimiter) {
        this._delimiter = options.delimiter;
      }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    input = input.toLowerCase();

    var arr = [];

    if (input.startsWith("0x")) {
      input = input.substr(2);
    }
    input.split(this._delimiter).map(val => {
      val = val.replace(/[^a-f0-9]/g, "");
      if (val) {
        var chr = String.fromCharCode(parseInt(val, 16));
        arr.push(chr);
      }
    });

    return arr.join("");
  }
}
