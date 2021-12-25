'use strict';

import Hasher32be from "./hasher32be";
import {rotateLeft} from "../tools/tools";

// Transform constants
/** @type {number[]} */
const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

/**
 * Calculates [SHA0](http://pages.saclay.inria.fr/pierre.karpman/fips180.pdf) hash
 *
 * @example <caption>Calculates SHA0 hash from string "message" - ES6 style</caption>
 * import Sha0 from "crypto-api/hasher/sha0";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Sha0();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA0 hash from UTF string "message" - ES6 style</caption>
 * import Sha0 from "crypto-api/hasher/sha0";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Sha0();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA0 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha0');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA0 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha0', 'message'));
 * </script>
 */
class Sha0 extends Hasher32be {
  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=80] - Number of rounds (Must be greater than 16)
   */
  constructor(options) {
    super(options);

    this.options.rounds = this.options.rounds || 80;
    this.state.hash = [
      0x67452301 | 0,
      0xefcdab89 | 0,
      0x98badcfe | 0,
      0x10325476 | 0,
      0xc3d2e1f0 | 0
    ];
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */
    this.W = new Array(80);
  }

  /**
   * Process ready blocks
   *
   * @protected
   * @ignore
   * @param {number[]} block - Block
   */
  processBlock(block) {
    // Working variables
    let a = this.state.hash[0] | 0;
    let b = this.state.hash[1] | 0;
    let c = this.state.hash[2] | 0;
    let d = this.state.hash[3] | 0;
    let e = this.state.hash[4] | 0;

    // Calculate hash
    for (let i = 0; i < this.options.rounds; i++) {
      if (i < 16) {
        this.W[i] = block[i] | 0;
      } else {
        this.W[i] = (this.W[i - 3] ^ this.W[i - 8] ^ this.W[i - 14] ^ this.W[i - 16]) | 0;
      }

      let t = (rotateLeft(a, 5) + e + this.W[i] + K[(i / 20) >> 0]) | 0;
      if (i < 20) {
        t = (t + ((b & c) | (~b & d))) | 0;
      } else if (i < 40) {
        t = (t + (b ^ c ^ d)) | 0;
      } else if (i < 60) {
        t = (t + ((b & c) | (b & d) | (c & d))) | 0;
      } else {
        t = (t + (b ^ c ^ d)) | 0;
      }
      e = d;
      d = c;
      c = rotateLeft(b, 30) | 0;
      b = a;
      a = t;
    }

    this.state.hash[0] = (this.state.hash[0] + a) | 0;
    this.state.hash[1] = (this.state.hash[1] + b) | 0;
    this.state.hash[2] = (this.state.hash[2] + c) | 0;
    this.state.hash[3] = (this.state.hash[3] + d) | 0;
    this.state.hash[4] = (this.state.hash[4] + e) | 0;
  }

  /**
   * Finalize hash and return result
   *
   * @returns {string}
   */
  finalize() {
    this.addPaddingISO7816(
      this.state.message.length < 56 ?
        56 - this.state.message.length | 0 :
        120 - this.state.message.length | 0);
    this.addLengthBits();
    this.process();
    return this.getStateHash();
  }
}

export default Sha0;