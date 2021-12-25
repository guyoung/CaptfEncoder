const sm3 = require('sm-crypto').sm3;


export class SM3Encoder {
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


    return sm3(input)

  }
}
