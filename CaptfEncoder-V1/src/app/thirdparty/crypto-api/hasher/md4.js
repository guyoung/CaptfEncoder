'use strict';

import Hasher32le from "./hasher32le";
import {rotateLeft} from "../tools/tools";

// Transform constants
/** @type {number[]} */
const S = [
  [3, 7, 11, 19],
  [3, 5, 9, 13],
  [3, 9, 11, 15]
];
/** @type {number} */
const F = 0x00000000;
/** @type {number} */
const G = 0x5a827999;
/** @type {number} */
const H = 0x6ed9eba1;

/**
 * Calculates [MD4](https://tools.ietf.org/html/rfc1320) hash
 *
 * @example <caption>Calculates MD4 hash from string "message" - ES6 style</caption>
 * import Md4 from "crypto-api/hasher/md4";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Md4();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD4 hash from UTF string "message" - ES6 style</caption>
 * import Md4 from "crypto-api/hasher/md4";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Md4();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD4 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md4');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates MD4 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('md4', 'message'));
 * </script>
 */
class Md4 extends Hasher32le {
  /**
   * @param {Object} [options]
   */
  constructor(options) {
    super(options);

    this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  }

  /**
   * @private
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static FF(x, y, z) {
    return (x & y) | ((~x) & z);
  }

  /**
   * @private
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static GG(x, y, z) {
    return (x & y) | (x & z) | (y & z);
  }

  /**
   * @private
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static HH(x, y, z) {
    return x ^ y ^ z;
  }

  /**
   * @private
   * @ignore
   * @param {function} f
   * @param {number} k
   * @param {number} a
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} m
   * @param {number} s
   * @returns {number}
   * @constructor
   */
  static CC(f, k, a, x, y, z, m, s) {
    return rotateLeft((a + f(x, y, z) + m + k), s) | 0;
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

    // Round 1
    a = Md4.CC(Md4.FF, F, a, b, c, d, block[0], S[0][0]);
    d = Md4.CC(Md4.FF, F, d, a, b, c, block[1], S[0][1]);
    c = Md4.CC(Md4.FF, F, c, d, a, b, block[2], S[0][2]);
    b = Md4.CC(Md4.FF, F, b, c, d, a, block[3], S[0][3]);
    a = Md4.CC(Md4.FF, F, a, b, c, d, block[4], S[0][0]);
    d = Md4.CC(Md4.FF, F, d, a, b, c, block[5], S[0][1]);
    c = Md4.CC(Md4.FF, F, c, d, a, b, block[6], S[0][2]);
    b = Md4.CC(Md4.FF, F, b, c, d, a, block[7], S[0][3]);
    a = Md4.CC(Md4.FF, F, a, b, c, d, block[8], S[0][0]);
    d = Md4.CC(Md4.FF, F, d, a, b, c, block[9], S[0][1]);
    c = Md4.CC(Md4.FF, F, c, d, a, b, block[10], S[0][2]);
    b = Md4.CC(Md4.FF, F, b, c, d, a, block[11], S[0][3]);
    a = Md4.CC(Md4.FF, F, a, b, c, d, block[12], S[0][0]);
    d = Md4.CC(Md4.FF, F, d, a, b, c, block[13], S[0][1]);
    c = Md4.CC(Md4.FF, F, c, d, a, b, block[14], S[0][2]);
    b = Md4.CC(Md4.FF, F, b, c, d, a, block[15], S[0][3]);

    // Round 2
    a = Md4.CC(Md4.GG, G, a, b, c, d, block[0], S[1][0]);
    d = Md4.CC(Md4.GG, G, d, a, b, c, block[4], S[1][1]);
    c = Md4.CC(Md4.GG, G, c, d, a, b, block[8], S[1][2]);
    b = Md4.CC(Md4.GG, G, b, c, d, a, block[12], S[1][3]);
    a = Md4.CC(Md4.GG, G, a, b, c, d, block[1], S[1][0]);
    d = Md4.CC(Md4.GG, G, d, a, b, c, block[5], S[1][1]);
    c = Md4.CC(Md4.GG, G, c, d, a, b, block[9], S[1][2]);
    b = Md4.CC(Md4.GG, G, b, c, d, a, block[13], S[1][3]);
    a = Md4.CC(Md4.GG, G, a, b, c, d, block[2], S[1][0]);
    d = Md4.CC(Md4.GG, G, d, a, b, c, block[6], S[1][1]);
    c = Md4.CC(Md4.GG, G, c, d, a, b, block[10], S[1][2]);
    b = Md4.CC(Md4.GG, G, b, c, d, a, block[14], S[1][3]);
    a = Md4.CC(Md4.GG, G, a, b, c, d, block[3], S[1][0]);
    d = Md4.CC(Md4.GG, G, d, a, b, c, block[7], S[1][1]);
    c = Md4.CC(Md4.GG, G, c, d, a, b, block[11], S[1][2]);
    b = Md4.CC(Md4.GG, G, b, c, d, a, block[15], S[1][3]);

    // Round 3
    a = Md4.CC(Md4.HH, H, a, b, c, d, block[0], S[2][0]);
    d = Md4.CC(Md4.HH, H, d, a, b, c, block[8], S[2][1]);
    c = Md4.CC(Md4.HH, H, c, d, a, b, block[4], S[2][2]);
    b = Md4.CC(Md4.HH, H, b, c, d, a, block[12], S[2][3]);
    a = Md4.CC(Md4.HH, H, a, b, c, d, block[2], S[2][0]);
    d = Md4.CC(Md4.HH, H, d, a, b, c, block[10], S[2][1]);
    c = Md4.CC(Md4.HH, H, c, d, a, b, block[6], S[2][2]);
    b = Md4.CC(Md4.HH, H, b, c, d, a, block[14], S[2][3]);
    a = Md4.CC(Md4.HH, H, a, b, c, d, block[1], S[2][0]);
    d = Md4.CC(Md4.HH, H, d, a, b, c, block[9], S[2][1]);
    c = Md4.CC(Md4.HH, H, c, d, a, b, block[5], S[2][2]);
    b = Md4.CC(Md4.HH, H, b, c, d, a, block[13], S[2][3]);
    a = Md4.CC(Md4.HH, H, a, b, c, d, block[3], S[2][0]);
    d = Md4.CC(Md4.HH, H, d, a, b, c, block[11], S[2][1]);
    c = Md4.CC(Md4.HH, H, c, d, a, b, block[7], S[2][2]);
    b = Md4.CC(Md4.HH, H, b, c, d, a, block[15], S[2][3]);

    this.state.hash = [
      (this.state.hash[0] + a) | 0,
      (this.state.hash[1] + b) | 0,
      (this.state.hash[2] + c) | 0,
      (this.state.hash[3] + d) | 0
    ];
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

export default Md4;