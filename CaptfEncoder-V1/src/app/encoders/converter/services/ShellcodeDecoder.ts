import { StringConverter } from "./StringConverter";

export class ShellcodeDecoder {
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

    input = input.toLowerCase();

    var arr = [];

    input.split().map(val => {
      val = val.replace(/[^a-f0-9]/g, "");
      if (val) {
        arr.push(parseInt(val, 16));
      }
    });

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }
}
