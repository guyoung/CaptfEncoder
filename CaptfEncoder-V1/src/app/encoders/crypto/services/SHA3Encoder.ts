var CryptoJS = require("crypto-js");

export class SHA3Encoder {
  _encoding = "utf8";

  // 224, 256, 384, 512
  _outputLength = 0;

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }

    if (options.outputLength) {
      this._outputLength = options.outputLength;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    if (this._outputLength) {

    } else {
      return CryptoJS.SHA3(input).toString();
    }

    
  }
}
