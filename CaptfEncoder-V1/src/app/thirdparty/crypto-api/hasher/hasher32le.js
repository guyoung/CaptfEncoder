'use strict';

import Hasher from "./hasher";

/**
 * Hasher for 32 bit little endian blocks
 * @interface
 */
class Hasher32le extends Hasher {
  /**
   * @param {Object} [options]
   */
  constructor(options) {
    super(options);

    /**
     * Current block (only for speed optimization)
     * @private
     * @type {number[]}
     */
    this.blockUnits = [];
  }

  /**
   * Process ready blocks
   *
   * @protected
   */
  process() {
    while (this.state.message.length >= this.blockSizeInBytes) {
      this.blockUnits = [];
      for (let b = 0; b < this.blockSizeInBytes; b += 4) {
        this.blockUnits.push(
          this.state.message.charCodeAt(b) |
          this.state.message.charCodeAt(b + 1) << 8 |
          this.state.message.charCodeAt(b + 2) << 16 |
          this.state.message.charCodeAt(b + 3) << 24);
      }
      this.state.message = this.state.message.substr(this.blockSizeInBytes);
      this.processBlock(this.blockUnits);
    }
  }

  /**
   * Process ready blocks
   *
   * @protected
   * @param {number[]} M
   */
  processBlock(M) {
  }

  /**
   * Get hash from state
   *
   * @protected
   * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
   * @returns {string}
   */
  getStateHash(size) {
    size = size || this.state.hash.length;
    let hash = '';
    for (let i = 0; i < size; i++) {
      hash += String.fromCharCode(this.state.hash[i] & 0xff) +
        String.fromCharCode(this.state.hash[i] >> 8 & 0xff) +
        String.fromCharCode(this.state.hash[i] >> 16 & 0xff) +
        String.fromCharCode(this.state.hash[i] >> 24 & 0xff);
    }
    return hash;
  }

  /**
   * Add to message cumulative size of message in bits
   *
   * @protected
   */
  addLengthBits() {
    let lengthBits = this.state.length << 3;
    for (let i = 0; i < 4; i++) {
      this.state.message += String.fromCharCode(lengthBits >> (i << 3));
    }
    // @todo fix length to 64 bit
    this.state.message += "\x00\x00\x00\x00";
  }
}

export default Hasher32le;