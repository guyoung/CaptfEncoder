import { StringConverter } from "./StringConverter";

export class HexEncoder {
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


    var uint8array = StringConverter.strToUint8Array(input, this._encoding);

    var arr = [];
    uint8array.map(val => {
      val = val.toString(16);
      if (this._delimiter == "0x" || this._delimiter == "\\x") {
        val = this._delimiter + val;
      }
      arr.push(val);
    }); 
    
    if (this._delimiter == "0x" || this._delimiter == "\\x") {
      return arr.join("");
    }

    else {
        return arr.join(this._delimiter)
    }
  }
}
