import { StringConverter } from "./StringConverter";

export class HexDecoder {
  _encoding = "utf8";
  _delimiter = "";

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

    if (input.startsWith("0x")) {
      input = input.substr(2);
    }

    if (this._delimiter.length == 0) {
      for (let i = 0; i < input.length; i += 2) {
        var val = input.substr(i, 2);
        val = val.replace(/[^a-f0-9]/g, "");
        if (val) {
          arr.push(parseInt(val, 16));
        }
      }
    } else {
      input.split(this._delimiter).map(val => {
        val = val.replace(/[^a-f0-9]/g, "");
        if (val) {
          arr.push(parseInt(val, 16));
        }
      });
    }

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }
}
