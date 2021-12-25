var scrypt = require("scryptsy");

export class ScryptEncoder {
  _encoding = "utf8";
  _salt = "";
  _iterations = 16384;
  _memoryFactor = 8;
  _parallelizationFactor = 1;
  _keyLength = 64;

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.salt) {
      this._salt = options.salt;
    }
    if (options.iterations) {
      this._iterations = parseInt(options.iterations);
    }
    if (options.memoryFactor) {
      this._memoryFactor = parseInt(options.memoryFactor);
    }
    if (options.parallelizationFactor) {
      this._parallelizationFactor = parseInt(options.parallelizationFactor);
    }
    if (options.keyLength) {
      this._keyLength = parseInt(options.keyLength);
    }
  }

  handle(input) {
    return new Promise<string>((resolve, reject) => {
      try {
        var data = scrypt(
          input,
          this._salt,
          this._iterations,
          this._memoryFactor,
          this._parallelizationFactor,
          this._keyLength
        );

        resolve(data.toString("hex"));
      } catch (err) {
        reject(err);
      }
    });
  }
}
