export class UuencodeDecoder {
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

    return this.decode(input).toString(this._encoding);
  }

  /**
   * uudecode a value
   *
   * @param {(String|Buffer)} The value to be decoded.
   * @returns {Buffer} The decoded value.
   */
  decode(inString) {
    var stop = false;
    var inIndex = 0;
    var outIndex = 0;
    var totalLen = 0;

    var inBytes = Buffer.from(inString);
    var buffLen = inBytes.length;
    var outBytes = Buffer.alloc(buffLen);

    do {
      if (inIndex < buffLen) {
        var n = (inBytes[inIndex] - 32) & 0x3f;

        ++inIndex;

        if (n > 45) {
          throw "Invalid Data";
        }

        if (n < 45) {
          stop = true;
        }

        totalLen += n;

        while (n > 0) {
          this.decodeChars(inBytes, inIndex, outBytes, outIndex);
          outIndex += 3;
          inIndex += 4;
          n -= 3;
        }

        ++inIndex;
      } else {
        stop = true;
      }
    } while (!stop);

    return outBytes.slice(0, totalLen);
  }

  decodeChars(inBytes, inIndex, outBytes, outIndex) 
  {
    var c1 = inBytes[inIndex];
    var c2 = inBytes[inIndex + 1];
    var c3 = inBytes[inIndex + 2];
    var c4 = inBytes[inIndex + 3];

    var b1 = (((c1 - 32) & 0x3f) << 2) | (((c2 - 32) & 0x3f) >> 4);
    var b2 = (((c2 - 32) & 0x3f) << 4) | (((c3 - 32) & 0x3f) >> 2);
    var b3 = (((c3 - 32) & 0x3f) << 6) | ((c4 - 32) & 0x3f);

    outBytes[outIndex] = b1 & 0xff;
    outBytes[outIndex + 1] = b2 & 0xff;
    outBytes[outIndex + 2] = b3 & 0xff;
  }
}
