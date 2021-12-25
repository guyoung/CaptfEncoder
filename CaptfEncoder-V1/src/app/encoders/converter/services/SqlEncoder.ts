import { StringConverter } from "./StringConverter";

export class SqlEncoder {
  _encoding = "utf8";
  _digits = 4;

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.digits) {
      this._digits = parseInt(options.digits);
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
      val = val.padEnd(this._digits, "0");
      arr.push(val);
    });

    return arr.join("");
  }
}
