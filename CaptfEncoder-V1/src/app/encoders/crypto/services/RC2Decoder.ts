var RC2 = require("../../../thirdparty/node-forge/lib/rc2");
var Util = require("../../../thirdparty/node-forge/lib/util");


export class RC2Decoder {
  _encoding = "utf8";

  _key = "0123456789abcdef";

  _iv = "0123456789abcdef";

  // BASE64, HEX
  _output = "BASE64";

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

    var encryptedStr;

    if (this._output == "HEX") {    
      let buffer = Buffer.from(input, 'hex');     
      encryptedStr = RC2Decoder.bufferToChars(buffer);
    } else if (this._output == "BASE64") {     
      let buffer = Buffer.from(input, 'base64');      
      encryptedStr = RC2Decoder.bufferToChars(buffer);
    }

    if(!encryptedStr) {
      return;
    }  

    var decipher = RC2.createDecryptionCipher(this._key);
    decipher.start(this._iv);
    decipher.update(Util.createBuffer(encryptedStr));
    decipher.finish();

    var bytes = decipher.output.getBytes();
    return Buffer.from(bytes).toString(this._encoding);
  }

  static bufferToChars(buffer) {
    if (!buffer) return "";
    let str = "";
    for (let i = 0; i < buffer.length; ) {
      str += String.fromCharCode(buffer[i++]);
    }
    return str;
  }
}
