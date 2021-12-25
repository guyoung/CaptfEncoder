import { StringConverter } from "./StringConverter";

export class QuotedPrintableDecoder {
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

    const str = input.replace(/=(?:\r?\n|$)/g, "");
    var arr = this.mimeDecode(str);

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);

  }

  mimeDecode(str) {
    let encodedBytesCount = (str.match(/=[\da-fA-F]{2}/g) || []).length,
      bufferLength = str.length - encodedBytesCount * 2,
      chr,
      hex,
      buffer = new Array(bufferLength),
      bufferPos = 0;

    for (let i = 0, len = str.length; i < len; i++) {
      chr = str.charAt(i);
      if (
        chr === "=" &&
        (hex = str.substr(i + 1, 2)) &&
        /[\da-fA-F]{2}/.test(hex)
      ) {
        buffer[bufferPos++] = parseInt(hex, 16);
        i += 2;
        continue;
      }
      buffer[bufferPos++] = chr.charCodeAt(0);
    }

    return buffer;
  }
}
