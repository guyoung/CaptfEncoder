var RC2 = require("../../../thirdparty/node-forge/lib/rc2");
var Util = require("../../../thirdparty/node-forge/lib/util");

export class RC2Encoder {
  _encoding = "utf8";

  _key = "0123456789abcdef";

  _iv = "0123456789abcdef";

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
   
    if (options.output) {
      this._output = options.output;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var cipher = RC2.createEncryptionCipher(this._key);
    cipher.start(this._iv || null);

    cipher.update(Util.createBuffer(input));
    cipher.finish();

    if (this._output=="HEX") {
      return cipher.output.toHex()
    }
    if (this._output=="BASE64") { 
      return Buffer.from(cipher.output.toHex(), 'hex').toString('base64');
    }
  }
}
