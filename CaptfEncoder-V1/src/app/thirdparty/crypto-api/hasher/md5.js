'use strict';

import Hasher32le from "./hasher32le";
import {rotateLeft} from "../tools/tools";

// Transform constants
/** @type {number[]} */
const S = [
  [7, 12, 17, 22],
  [5, 9, 14, 20],
  [4, 11, 16, 23],
  [6, 10, 15, 21]
];
/** @type {number[]} */
const T = new Array(64);
for (let i = 0; i < 64; i++) {
  T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
}

/**
 * Calculates [MD5](https://tools.ietf.org/html/rfc1321) hash
 *
 * @example <caption>Calculates MD5 hash from string "message" - ES6 style</caption>
 * import Md5 from "crypto-api/hasher/md5";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Md5();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD5 hash from UTF string "message" - ES6 style</caption>
 * import Md5 from "crypto-api/hasher/md5";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Md5();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates MD5 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates MD5 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('md5', 'message'));
 * </script>
 */
class Md5 extends Hasher32le {
  /**
   * @param {Object} [options]
   */
  constructor(options) {
    super(options);

    this.state.hash = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  }

  /**
   * @protected
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static FF(x, y, z) {
    return (x & y) | (~x & z);
  }

  /**
   * @protected
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static GG(x, y, z) {
    return (x & z) | (y & ~z);
  }

  /**
   * @protected
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
   * @protected
   * @ignore
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number}
   */
  static II(x, y, z) {
    return y ^ (x | ~z);
  }

  /**
   * @protected
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
   */
  static CC(f, k, a, x, y, z, m, s) {
    return (rotateLeft((a + f(x, y, z) + m + k), s) + x) | 0;
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
    a = Md5.CC(Md5.FF, T[0], a, b, c, d, block[0], S[0][0]);
    d = Md5.CC(Md5.FF, T[1], d, a, b, c, block[1], S[0][1]);
    c = Md5.CC(Md5.FF, T[2], c, d, a, b, block[2], S[0][2]);
    b = Md5.CC(Md5.FF, T[3], b, c, d, a, block[3], S[0][3]);
    a = Md5.CC(Md5.FF, T[4], a, b, c, d, block[4], S[0][0]);
    d = Md5.CC(Md5.FF, T[5], d, a, b, c, block[5], S[0][1]);
    c = Md5.CC(Md5.FF, T[6], c, d, a, b, block[6], S[0][2]);
    b = Md5.CC(Md5.FF, T[7], b, c, d, a, block[7], S[0][3]);
    a = Md5.CC(Md5.FF, T[8], a, b, c, d, block[8], S[0][0]);
    d = Md5.CC(Md5.FF, T[9], d, a, b, c, block[9], S[0][1]);
    c = Md5.CC(Md5.FF, T[10], c, d, a, b, block[10], S[0][2]);
    b = Md5.CC(Md5.FF, T[11], b, c, d, a, block[11], S[0][3]);
    a = Md5.CC(Md5.FF, T[12], a, b, c, d, block[12], S[0][0]);
    d = Md5.CC(Md5.FF, T[13], d, a, b, c, block[13], S[0][1]);
    c = Md5.CC(Md5.FF, T[14], c, d, a, b, block[14], S[0][2]);
    b = Md5.CC(Md5.FF, T[15], b, c, d, a, block[15], S[0][3]);

    // Round 2
    a = Md5.CC(Md5.GG, T[16], a, b, c, d, block[1], S[1][0]);
    d = Md5.CC(Md5.GG, T[17], d, a, b, c, block[6], S[1][1]);
    c = Md5.CC(Md5.GG, T[18], c, d, a, b, block[11], S[1][2]);
    b = Md5.CC(Md5.GG, T[19], b, c, d, a, block[0], S[1][3]);
    a = Md5.CC(Md5.GG, T[20], a, b, c, d, block[5], S[1][0]);
    d = Md5.CC(Md5.GG, T[21], d, a, b, c, block[10], S[1][1]);
    c = Md5.CC(Md5.GG, T[22], c, d, a, b, block[15], S[1][2]);
    b = Md5.CC(Md5.GG, T[23], b, c, d, a, block[4], S[1][3]);
    a = Md5.CC(Md5.GG, T[24], a, b, c, d, block[9], S[1][0]);
    d = Md5.CC(Md5.GG, T[25], d, a, b, c, block[14], S[1][1]);
    c = Md5.CC(Md5.GG, T[26], c, d, a, b, block[3], S[1][2]);
    b = Md5.CC(Md5.GG, T[27], b, c, d, a, block[8], S[1][3]);
    a = Md5.CC(Md5.GG, T[28], a, b, c, d, block[13], S[1][0]);
    d = Md5.CC(Md5.GG, T[29], d, a, b, c, block[2], S[1][1]);
    c = Md5.CC(Md5.GG, T[30], c, d, a, b, block[7], S[1][2]);
    b = Md5.CC(Md5.GG, T[31], b, c, d, a, block[12], S[1][3]);

    // Round 3
    a = Md5.CC(Md5.HH, T[32], a, b, c, d, block[5], S[2][0]);
    d = Md5.CC(Md5.HH, T[33], d, a, b, c, block[8], S[2][1]);
    c = Md5.CC(Md5.HH, T[34], c, d, a, b, block[11], S[2][2]);
    b = Md5.CC(Md5.HH, T[35], b, c, d, a, block[14], S[2][3]);
    a = Md5.CC(Md5.HH, T[36], a, b, c, d, block[1], S[2][0]);
    d = Md5.CC(Md5.HH, T[37], d, a, b, c, block[4], S[2][1]);
    c = Md5.CC(Md5.HH, T[38], c, d, a, b, block[7], S[2][2]);
    b = Md5.CC(Md5.HH, T[39], b, c, d, a, block[10], S[2][3]);
    a = Md5.CC(Md5.HH, T[40], a, b, c, d, block[13], S[2][0]);
    d = Md5.CC(Md5.HH, T[41], d, a, b, c, block[0], S[2][1]);
    c = Md5.CC(Md5.HH, T[42], c, d, a, b, block[3], S[2][2]);
    b = Md5.CC(Md5.HH, T[43], b, c, d, a, block[6], S[2][3]);
    a = Md5.CC(Md5.HH, T[44], a, b, c, d, block[9], S[2][0]);
    d = Md5.CC(Md5.HH, T[45], d, a, b, c, block[12], S[2][1]);
    c = Md5.CC(Md5.HH, T[46], c, d, a, b, block[15], S[2][2]);
    b = Md5.CC(Md5.HH, T[47], b, c, d, a, block[2], S[2][3]);

    // Round 4
    a = Md5.CC(Md5.II, T[48], a, b, c, d, block[0], S[3][0]);
    d = Md5.CC(Md5.II, T[49], d, a, b, c, block[7], S[3][1]);
    c = Md5.CC(Md5.II, T[50], c, d, a, b, block[14], S[3][2]);
    b = Md5.CC(Md5.II, T[51], b, c, d, a, block[5], S[3][3]);
    a = Md5.CC(Md5.II, T[52], a, b, c, d, block[12], S[3][0]);
    d = Md5.CC(Md5.II, T[53], d, a, b, c, block[3], S[3][1]);
    c = Md5.CC(Md5.II, T[54], c, d, a, b, block[10], S[3][2]);
    b = Md5.CC(Md5.II, T[55], b, c, d, a, block[1], S[3][3]);
    a = Md5.CC(Md5.II, T[56], a, b, c, d, block[8], S[3][0]);
    d = Md5.CC(Md5.II, T[57], d, a, b, c, block[15], S[3][1]);
    c = Md5.CC(Md5.II, T[58], c, d, a, b, block[6], S[3][2]);
    b = Md5.CC(Md5.II, T[59], b, c, d, a, block[13], S[3][3]);
    a = Md5.CC(Md5.II, T[60], a, b, c, d, block[4], S[3][0]);
    d = Md5.CC(Md5.II, T[61], d, a, b, c, block[11], S[3][1]);
    c = Md5.CC(Md5.II, T[62], c, d, a, b, block[2], S[3][2]);
    b = Md5.CC(Md5.II, T[63], b, c, d, a, block[9], S[3][3]);

    this.state.hash[0] = (this.state.hash[0] + a) | 0;
    this.state.hash[1] = (this.state.hash[1] + b) | 0;
    this.state.hash[2] = (this.state.hash[2] + c) | 0;
    this.state.hash[3] = (this.state.hash[3] + d) | 0;
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

export default Md5;