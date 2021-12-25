var jsencrypt = require("jsencrypt");


export class RSADecoder {
  _encoding = "utf8";
  _keyKind = "Public";
  _key = "";  

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.keyKind) {
      this._keyKind = options.keyKind;
    }
    if (options.key) {
      this._key = options.key;
    }
   
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var encrypt = new jsencrypt.JSEncrypt();

    if (this._keyKind="Public"){
      encrypt.setPublicKey(this._key); 
    }
    else if (this._keyKind="Private"){
      encrypt.setPrivateKey(this._key); 
    }          

    var decrypted = encrypt.decrypt(input);

    return decrypted;

  }
}
