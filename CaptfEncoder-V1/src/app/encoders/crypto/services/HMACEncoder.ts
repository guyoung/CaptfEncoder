var CryptoJS = require("crypto-js");

export class HMACEncoder {
  _encoding = "utf8";
  
  // hmac-md5, hmac-sha1, hmac-sha256, hmac-sha224, hmac-sha512, hmac-sha384, hmac-sha3, hmac-ripemd160
  _pattern = "hmac-md5";

  _passphrase = "";

  // BASE64, HEX
  _output = "BASE64";

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.pattern) {
      this._pattern = options.pattern;
    }
    if (options.passphrase) {
      this._passphrase = options.passphrase;
    }
    if (options.output) {
      this._output = options.output;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var hash;

    if (this._pattern == "hmac-md5") {
      hash = CryptoJS.HmacMD5(input, this._passphrase);
    } else if (this._pattern == "hmac-sha1") {
      hash = CryptoJS.HmacSHA1(input, this._passphrase);
    } else if (this._pattern == "hmac-sha256") {
      hash = CryptoJS.HmacSHA256(input, this._passphrase);
    } else if (this._pattern == "hmac-sha224") {
      hash = CryptoJS.HmacSHA224(input, this._passphrase);
    } else if (this._pattern == "hmac-sha512") {
      hash = CryptoJS.HmacSHA512(input, this._passphrase);
    } else if (this._pattern == "hmac-sha384") {
      hash = CryptoJS.HmacSHA384(input, this._passphrase);
    } else if (this._pattern == "hmac-sha3") {
      hash = CryptoJS.HmacSHA3(input, this._passphrase);
    } else if (this._pattern == "hmac-ripemd160") {
      hash = CryptoJS.HmacRIPEMD160(input, this._passphrase);
    }

    if (!hash) {
      return "";
    } 

    if (this._output=="BASE64") {
      return hash.toString(CryptoJS.enc.Base64);
    }
    
    if (this._output=="HEX") {
      return hash.toString(CryptoJS.enc.Hex);
    }

  }
}
