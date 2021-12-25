var ip = require('ip');

export class Ipv4AddressEncoder {
  

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

    const number = ip.toLong('127.0.0.1');
    return number.toString(this._base);   
  }
}
