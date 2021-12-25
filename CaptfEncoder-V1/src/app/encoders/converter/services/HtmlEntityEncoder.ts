var he = require("he");

export class HtmlEntityEncoder {
  _encoding = "utf8";

  _encodeEverything = false;
  _useNamedReferences = true;
  _decimal = true;

  constructor(options) {
    options = options || {};  
    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.encodeEverything  != null ) {
      this._encodeEverything = new Boolean(options.encodeEverything).valueOf();
    }
    if (options.useNamedReferences != null) {
     
      this._useNamedReferences = new Boolean(
        options.useNamedReferences
      ).valueOf();
    }
    if (options.decimal  != null) {
      this._decimal = new Boolean(options.decimal).valueOf();
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return he.encode(input, {
      encodeEverything: this._encodeEverything,
      useNamedReferences: this._useNamedReferences,
      decimal: this._decimal
    });
  }
}
