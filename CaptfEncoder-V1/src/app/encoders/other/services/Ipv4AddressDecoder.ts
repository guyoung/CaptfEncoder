var ip = require('ip');

export class Ipv4AddressDecoder {
  

  _base = 10;

  constructor(options) {
    options = options || {};

    if (options.base) {
      this._base = parseInt(options.base);
    }

  }

  public async handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    if (input.startsWith("0x")) {
      input = input.substr(2);
    }

    const number = parseInt(input, this._base);

    return ip.fromLong(number); 
   
  }
}
