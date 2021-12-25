import { StringConverter } from "./StringConverter";

export class ShellcodeEncoder {
  _encoding = "utf8";
  _delimiter = "\\x";

  constructor(options) {
    options = options || {};

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
      val = val.toString(16);
      val = this._delimiter + val;
      arr.push(val);
    });

    return arr.join("");
  }
}
