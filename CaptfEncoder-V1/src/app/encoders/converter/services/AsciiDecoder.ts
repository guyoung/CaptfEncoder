import { StringConverter } from "./StringConverter";

export class AsciiDecoder {
  _base = 10;
  _encoding = "utf8";
  _delimiter = " ";

  constructor(options) {
    options = options || {};

    if (options.base) {
      this._base = parseInt(options.base);
    }

    if (options.encoding) {
      this._encoding = options.encoding;
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

    input.split(this._delimiter).map(val => {
      val = val.replace(/[^a-f0-9]/g, "");
      if (val) {
        arr.push(parseInt(val, this._base));
      }
    });

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }
}
