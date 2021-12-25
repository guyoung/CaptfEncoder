var jsother = require("../../../thirdparty/jother/jother");

export class JotherDecoder {
  // STRING, SCRIPT
  _pattern: string = "STRING";

  constructor(options) {
    options = options || {};

    if (options.pattern) {
      this._pattern = options.pattern;
    }
  }

  public async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return eval(input);
  }
}
