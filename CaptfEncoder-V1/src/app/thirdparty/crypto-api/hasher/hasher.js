'use strict';

/**
 * Base hasher class
 * @interface
 */
class Hasher {
  /**
   * @param {Object} options
   * @constructor
   */
  constructor(options) {
    /**
     * Size of unit in bytes (4 = 32 bits)
     * @type {number}
     */
    this.unitSize = 4;
    /**
     * Bytes order in unit
     *   0 - normal
     *   1 - reverse
     * @type {number}
     */
    this.unitOrder = 0;
    /**
     * Size of block in units
     * @type {number}
     */
    this.blockSize = 16;
    /**
     * Size of block in bytes
     * @type {number}
     */
    this.blockSizeInBytes = this.blockSize * this.unitSize;
    /**
     * All algorithm variables that changed during process
     * @protected
     * @type {Object}
     * @property {string} state.message - Unprocessed Message
     * @property {number} state.length - Length of message
     */
    this.state = {};
    this.state.message = '';
    this.state.length = 0;
    /**
     * Options from initialization
     * @protected
     * @type {Object}
     */
    this.options = options || {};
  }

  /**
   * Reset hasher to initial state
   */
  reset() {
    this.state = {};
    this.constructor(this.options);
  }

  /**
   * Return current state
   *
   * @returns {Object}
   */
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Set current state
   *
   * @param {Object} state
   */
  setState(state) {
    this.state = state;
  }

  /**
   * Update message from binary string
   *
   * @param {string} message
   */
  update(message) {
    this.state.message += message;
    this.state.length += message.length;
    this.process();
  }

  /**
   * Process ready blocks
   *
   * @protected
   */
  process() {
  }

  /**
   * Finalize hash and return result
   *
   * @returns {string}
   */
  finalize() {
    return '';
  }

  /**
   * Get hash from state
   *
   * @protected
   * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
   * @returns {string}
   */
  getStateHash(size) {
    return '';
  }

  /**
   * Add PKCS7 padding to message
   *
   * @protected
   * @param {number} length
   */
  addPaddingPKCS7(length) {
    this.state.message += new Array(length + 1).join(String.fromCharCode(length));
  }

  /**
   * Add ISO7816 padding to message
   *
   * @protected
   * @param {number} length
   */
  addPaddingISO7816(length) {
    this.state.message += "\x80" + new Array(length).join("\x00");
  }

  /**
   * Add zero padding to message
   *
   * @protected
   * @param {number} length
   */
  addPaddingZero(length) {
    this.state.message += new Array(length + 1).join("\x00");
  }
}

export default Hasher;