'use strict';

import Hasher32be from "./hasher32be";
import {rotateRight} from "../tools/tools";

// Transform constants
/** @type {number[]} */
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

/**
 * Calculates [SHA256 (SHA224)](https://tools.ietf.org/html/rfc4634) hash
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/hasher/sha256";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Sha256();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/hasher/sha256";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Sha256();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha256');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha256', 'message'));
 * </script>
 */
class Sha256 extends Hasher32be {
  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=64] - Number of rounds (Must be greater than 16)
   * @param {number} [options.length=256] - Length of hash result
   *
   * | Hash type | Length |
   * |-----------|--------|
   * | sha224    | 224    |
   * | sha256    | 256    |
   */
  constructor(options) {
    super(options);

    this.options.length = this.options.length || 256;
    this.options.rounds = this.options.rounds || 64;

    switch (this.options.length) {
      case 224:
        this.state.hash = [
          0xc1059ed8 | 0, 0x367cd507 | 0, 0x3070dd17 | 0, 0xf70e5939 | 0,
          0xffc00b31 | 0, 0x68581511 | 0, 0x64f98fa7 | 0, 0xbefa4fa4 | 0
        ];
        break;
      default:
        this.state.hash = [
          0x6a09e667 | 0, 0xbb67ae85 | 0, 0x3c6ef372 | 0, 0xa54ff53a | 0,
          0x510e527f | 0, 0x9b05688c | 0, 0x1f83d9ab | 0, 0x5be0cd19 | 0
        ];
    }
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */
    this.W = new Array(64);
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
    let f = this.state.hash[5] | 0;
    let g = this.state.hash[6] | 0;
    let h = this.state.hash[7] | 0;

    // Calculate hash
    for (let i = 0; i < this.options.rounds; i++) {
      if (i < 16) {
        this.W[i] = block[i] | 0;
      } else {
        this.W[i] = (this.W[i - 16] + (
            rotateRight(this.W[i - 15], 7) ^
            rotateRight(this.W[i - 15], 18) ^
            (this.W[i - 15] >>> 3)
          ) +
          this.W[i - 7] + (
            rotateRight(this.W[i - 2], 17) ^
            rotateRight(this.W[i - 2], 19) ^
            (this.W[i - 2] >>> 10)
          )) | 0;
      }

      let t1 = (h + (rotateRight(e, 6) ^ rotateRight(e, 11) ^
        rotateRight(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + this.W[i]) | 0;
      let t2 = ((rotateRight(a, 2) ^ rotateRight(a, 13) ^
        rotateRight(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    this.state.hash[0] = (this.state.hash[0] + a) | 0;
    this.state.hash[1] = (this.state.hash[1] + b) | 0;
    this.state.hash[2] = (this.state.hash[2] + c) | 0;
    this.state.hash[3] = (this.state.hash[3] + d) | 0;
    this.state.hash[4] = (this.state.hash[4] + e) | 0;
    this.state.hash[5] = (this.state.hash[5] + f) | 0;
    this.state.hash[6] = (this.state.hash[6] + g) | 0;
    this.state.hash[7] = (this.state.hash[7] + h) | 0;
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
    return this.getStateHash((this.options.length / 32) | 0);
  }
}

export default Sha256;