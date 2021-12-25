const punycode = require('punycode');

export class PunycodeDecoder {
  _encoding = "utf8";


  constructor(options) {
    options = options || {};  
    if (options.encoding) {
      this._encoding = options.encoding;
    }   
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return punycode.decode(input);
  }
}
