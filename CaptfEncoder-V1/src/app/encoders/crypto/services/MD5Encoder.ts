var CryptoJS = require("crypto-js");

export class MD5Encoder {

  _encoding = "utf8";
  _digits = 32;
  
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

    if (this._digits == 32) {
      return CryptoJS.MD5(input).toString();
    }
    if (this._digits == 16) {
      return CryptoJS.MD5(input).toString().substr(8, 16);
    }
    
  }
}
