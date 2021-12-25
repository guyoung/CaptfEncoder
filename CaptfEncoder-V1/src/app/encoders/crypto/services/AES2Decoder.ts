var CryptoJS = require("crypto-js");

export class AES2Decoder {
  _encoding = "utf8";

  _key = "0123456789abcdef";

  _iv = "0123456789abcdef";

  // CBC, ECB, CTR, OCF, CFB
  _mode = "CBC";

  // Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding
  _padding = "Pkcs7";

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
    if (options.iv) {
      this._iv = options.iv;
    }
    if (options.mode) {
      this._mode = options.mode;
    }
    if (options.padding) {
      this._padding = options.padding;
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
    var iv = CryptoJS.enc.Utf8.parse(this._iv);

    // CBC, ECB, CTR, OCF, CFB
    var mode = CryptoJS.mode.CBC;
    if (this._mode == "ECB") {
      mode = CryptoJS.mode.ECB;
    } else if (this._mode == "CTR") {
      mode = CryptoJS.mode.CTR;
    } else if (this._mode == "OCF") {
      mode = CryptoJS.mode.OCF;
    } else if (this._mode == "CFB") {
      mode = CryptoJS.mode.CFB;
    }

    // Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding
    var padding = CryptoJS.pad.Pkcs7;
    if (this._padding == "AnsiX923") {
      padding = CryptoJS.pad.AnsiX923;
    } else if (this._padding == "Iso10126") {
      padding = CryptoJS.pad.Iso10126;
    } else if (this._padding == "Iso97971") {
      padding = CryptoJS.pad.Iso97971;
    } else if (this._padding == "ZeroPadding") {
      padding = CryptoJS.pad.ZeroPadding;
    } else if (this._padding == "NoPadding") {
      padding = CryptoJS.pad.NoPadding;
    }

    var encryptedStr = input;

    if (this._output=="HEX") {
      encryptedStr = CryptoJS.enc.Hex.parse(encryptedStr);
      encryptedStr = CryptoJS.enc.Base64.stringify(encryptedStr);
    }

    var decrypted = CryptoJS.AES.decrypt(encryptedStr, key, {
      iv: iv,
      mode: mode,
      padding: padding
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
