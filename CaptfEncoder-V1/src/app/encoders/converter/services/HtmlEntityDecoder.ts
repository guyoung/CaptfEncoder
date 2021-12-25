var he = require("he");

export class HtmlEntityDecoder {
  _encoding = "utf8";

  _encodeEverything = false;
  _useNamedReferences = true;
  _decimal = true;

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.encodeEverything) {
      this._encodeEverything = new Boolean(options.encodeEverything).valueOf();
    }
    if (options.useNamedReferences) {
      this._useNamedReferences = new Boolean(
        options.useNamedReferences
      ).valueOf();
    }
    if (options.decimal) {
      this._decimal = new Boolean(options.decimal).valueOf();
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return he.decode(input);
  }
}
