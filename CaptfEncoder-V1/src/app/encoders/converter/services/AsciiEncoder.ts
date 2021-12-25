import { StringConverter } from "./StringConverter";

export class AsciiEncoder {
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

    var uint8array = StringConverter.strToUint8Array(input, this._encoding);

    var arr = [];
    uint8array.map(val => {
      arr.push(val.toString(this._base));
    });

    return arr.join(this._delimiter);
  }
}
