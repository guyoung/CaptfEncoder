const brunfaick = require('../../../thirdparty/brunfaick/index');

export class BrainfuckDecoder {
 

  constructor(options) {
    options = options || {};

  
  }

  public async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var result = brunfaick(input);

    return result;
  }
}
