var urlencode = require('../../../thirdparty/urlencode/urlencode');

export class UrlDecoder {
  _encoding = "utf8";

  //ALL_SPECIAL_CHARS, ALL
  _mode = "ALL_SPECIAL_CHARS";

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.mode) {
      this._mode = options.mode;
    }
  }

  async handle(input) {
    return urlencode.decode(input, this._encoding);
  }
}
