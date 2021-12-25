import { StringConverter } from "./StringConverter";

export class Base58Decoder {
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

    var arr = this.runFrom(input);

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }

  runFrom(input) {
    if (input.length === 0) return [];

    let alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    let result = [0];

    [].forEach.call(input, function(c, charIndex) {
      const index = alphabet.indexOf(c);

      if (index === -1) {
        return;
      }

      let carry = result[0] * 58 + index;
      result[0] = carry & 0xff;
      carry = carry >> 8;

      for (let i = 1; i < result.length; i++) {
        carry += result[i] * 58;
        result[i] = carry & 0xff;
        carry = carry >> 8;
      }

      while (carry > 0) {
        result.push(carry & 0xff);
        carry = carry >> 8;
      }
    });

    return result.reverse();
  }
}
