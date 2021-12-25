import { StringConverter } from "./StringConverter";

export class Base16Encoder {
  _encoding = "utf8";

  constructor(options) {
    options = options || {};
    if (options.encoding) {
      this._encoding = options.encoding;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var uint8array = StringConverter.strToUint8Array(input, this._encoding);

    return this.runTo32(uint8array);
  }

  runTo32(input) {
    if (!input) {
      return "";
    }

    let alphabet = "0123456789abcdef";
    let output = "";

    for (var start = 0, offset = 0; start < input.length; ++start) {
      var enc1 = (input[start] >>> 4) & 0x0f;
      var enc2 = input[start] & 0x0f;

      output += alphabet.charAt(enc1) + alphabet.charAt(enc2);
    }

    return output;
  }
}
