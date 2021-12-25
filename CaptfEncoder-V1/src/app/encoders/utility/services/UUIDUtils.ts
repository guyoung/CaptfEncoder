const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");

export class UUIDUtils {
  // v4:RANDOM, v1:TIMESTAMP
  _version: string = "RANDOM";

  constructor(options) {
    options = options || {};

    if (options.version) {
      this._version = options.version;
    }
  }

  generateUUID(): string {
    if (this._version == "TIMESTAMP") {
        return uuidv1();
    }
    if (this._version == "RANDOM") {
        return uuidv4();
    }
  }
}
