import Ripemd from "../../../thirdparty/crypto-api/hasher/Ripemd";
import {toHex} from "../../../thirdparty/crypto-api/encoder/hex";
import {fromUtf} from "../../../thirdparty/crypto-api/encoder/utf";

export class RIPEMDEncoder {

  _encoding = "utf8";
  _length = 160;  
  
  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.length) {
        this._length = parseInt(options.length);
      }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    let hasher = new Ripemd({
        length: this._length
    });
    hasher.update(fromUtf(input));
    return toHex(hasher.finalize());

  }
}
