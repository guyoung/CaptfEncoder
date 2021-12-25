import Md4 from "../../../thirdparty/crypto-api/hasher/md4";
import {toHex} from "../../../thirdparty/crypto-api/encoder/hex";
import {fromUtf} from "../../../thirdparty/crypto-api/encoder/utf";

export class MD4Encoder {

  _encoding = "utf8";

  
  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
  
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    let hasher = new Md4();
    hasher.update(fromUtf(input));
    return toHex(hasher.finalize());

  }
}
