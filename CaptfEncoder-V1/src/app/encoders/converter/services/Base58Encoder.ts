import { StringConverter } from "./StringConverter";

export class Base58Encoder {
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

    var uint8array = StringConverter.strToUint8Array(input, this._encoding);

    return this.runTo32(uint8array);
  }

  runTo32(input) {
    if (!input) {
      return "";
    }

    let alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    let result = [0];

    input.forEach(function(b) {
      let carry = (result[0] << 8) + b;
      result[0] = carry % 58;
      carry = (carry / 58) | 0;

      for (let i = 1; i < result.length; i++) {
        carry += result[i] << 8;
        result[i] = carry % 58;
        carry = (carry / 58) | 0;
      }

      while (carry > 0) {
        result.push(carry % 58);
        carry = (carry / 58) | 0;
      }
    });

    var result2 = result
      .map(function(b) {
        return alphabet[b];
      })
      .reverse()
      .join("");

    while (result2.length < input.length) {
      result2 = alphabet[0] + result;
    }

    return result2;
  }
}
