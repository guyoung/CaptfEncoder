var CryptoJS = require("crypto-js");


export class RabbitEncoder {
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

    var key = CryptoJS.enc.Utf8.parse(this._key);
    
    var encrypted = CryptoJS.Rabbit.encrypt(input, this._key);

    if (this._output=="BASE64") {
      return encrypted.toString();
    }
    if (this._output=="HEX") {
      return encrypted.ciphertext.toString()
    }
  }
}
