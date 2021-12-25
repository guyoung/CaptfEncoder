var jsother = require("../../../thirdparty/jother/jother");

export class JotherEncoder {
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
      return;
    }

    if (this._pattern == "STRING") {
      return jsother.toStr(input);
    }
    if (this._pattern == "SCRIPT") {
      return jsother.toScript(input);
    }
  }
}
