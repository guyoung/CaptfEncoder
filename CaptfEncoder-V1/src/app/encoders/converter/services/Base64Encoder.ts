var Base64 = require("../../../thirdparty/js-base64/base64").Base64;

export class Base64Encoder {
  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return Base64.encode(input);
  }
}
