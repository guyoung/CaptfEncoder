var CryptoJS = require("crypto-js");

export class RabbitDecoder {
  _encoding = "utf8";

  _key = "";

    // BASE64, HEX
    _output = "BASE64"

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.key) {
      this._key = options.key;
    }   
    if (options.output) {
      this._output = options.output;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }
    
    var encryptedStr = input;

    if (this._output=="HEX") {
      encryptedStr = CryptoJS.enc.Hex.parse(encryptedStr);
      encryptedStr = CryptoJS.enc.Base64.stringify(encryptedStr);
    }

    var decrypted = CryptoJS.Rabbit.decrypt(encryptedStr, this._key);

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
