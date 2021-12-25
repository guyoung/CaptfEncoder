var bcrypt = require('bcryptjs');

export class BcryptEncoder {

  _encoding = "utf8";
  _rounds = 10;
  
  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.rounds) {
      this._rounds = parseInt(options.rounds);
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    const salt = await bcrypt.genSalt(this._rounds);

    var hash = await bcrypt.hash(input, salt, null);

    return hash;
    
  }
}
