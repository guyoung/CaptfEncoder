var CryptoJS = require("crypto-js");

export class SHA224Encoder {
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

    return CryptoJS.SHA224(input).toString();
  }
}
