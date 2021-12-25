var CryptoJS = require("crypto-js");


export class AES2Encoder {
  _encoding = "utf8";

  _key = "0123456789abcdef";

  _iv = "0123456789abcdef";

  // CFB, CTR, CTRGladman, ECB, OFB
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

    // CFB, CTR, CTRGladman, ECB, OFB
    var mode = CryptoJS.mode.ECB;
    if (this._mode == "CFB") {
      mode = CryptoJS.mode.CFB;
    }
    else if (this._mode == "CTR") {
      mode = CryptoJS.mode.CTRGladman;
    } else if (this._mode == "CTRGladman") {
      mode = CryptoJS.mode.CTRGladman;
    } else if (this._mode == "OFB") {
      mode = CryptoJS.mode.OFB;
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

    var encrypted = CryptoJS.AES.encrypt(input, key, {
      iv: iv,
      mode: mode,
      padding: padding
    });

    if (this._output=="BASE64") {
      return encrypted.toString();
    }
    if (this._output=="HEX") {
      return encrypted.ciphertext.toString()
    }
  }
}
