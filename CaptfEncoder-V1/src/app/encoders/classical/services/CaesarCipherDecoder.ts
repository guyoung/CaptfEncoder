import { CaesarCipherEncoder } from "./CaesarCipherEncoder";

export class CaesarCipherDecoder {
  _shift = 0;

  constructor(options) {
    options = options || {};

    if (options.shift) {
      this._shift = parseInt(options.shift);
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    return CaesarCipherEncoder.caesarShift(input, (26 - this._shift) % 26);
  }
}
