import { StringConverter } from "./StringConverter";

export class SqlDecoder {
  _encoding = "utf8";
  _digits = 4;
  _delimiter = "";

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.digits) {
      this._digits = parseInt(options.digits);
    }
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

    for (let i = 0; i < input.length; i += this._digits) {
      var val = input.substr(i, this._digits);

      var val = input.substr(i, 2);
      val = val.replace(/[^a-f0-9]/g, "");

      if (val) {
        if (this._digits == 4 && val.endsWith("00")) {
          val = val.substr(0, 2);
        }
        arr.push(val);
      }
    }

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }
}
