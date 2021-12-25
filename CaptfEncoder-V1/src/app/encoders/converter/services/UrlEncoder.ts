var urlencode = require('../../../thirdparty/urlencode/urlencode');

import { StringConverter } from "./StringConverter";


export class UrlEncoder {
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
    if (!input || input.length < 1) {
      return "";
    } 
    
    if (this._mode != "ALL") {
      return urlencode(input, this._encoding);
    } else {
      var uint8array = StringConverter.strToUint8Array(input, this._encoding);

      var arr = [];

      uint8array.map(val => {
        val = "%" + val.toString(16);
        arr.push(val);
      });

      return arr.join("");
    }
  }
}
