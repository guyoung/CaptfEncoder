'use strict';
import {rotateRight64hi, rotateRight64lo} from "../tools/tools";
import Hasher32be from "./hasher32be";

/** @type {number[]} */
const SBOX = new Array(256);
/** @type {number[]} */
const SBOX0 = [
  0x68, 0xd0, 0xeb, 0x2b, 0x48, 0x9d, 0x6a, 0xe4, 0xe3, 0xa3, 0x56, 0x81,
  0x7d, 0xf1, 0x85, 0x9e, 0x2c, 0x8e, 0x78, 0xca, 0x17, 0xa9, 0x61, 0xd5,
  0x5d, 0x0b, 0x8c, 0x3c, 0x77, 0x51, 0x22, 0x42, 0x3f, 0x54, 0x41, 0x80,
  0xcc, 0x86, 0xb3, 0x18, 0x2e, 0x57, 0x06, 0x62, 0xf4, 0x36, 0xd1, 0x6b,
  0x1b, 0x65, 0x75, 0x10, 0xda, 0x49, 0x26, 0xf9, 0xcb, 0x66, 0xe7, 0xba,
  0xae, 0x50, 0x52, 0xab, 0x05, 0xf0, 0x0d, 0x73, 0x3b, 0x04, 0x20, 0xfe,
  0xdd, 0xf5, 0xb4, 0x5f, 0x0a, 0xb5, 0xc0, 0xa0, 0x71, 0xa5, 0x2d, 0x60,
  0x72, 0x93, 0x39, 0x08, 0x83, 0x21, 0x5c, 0x87, 0xb1, 0xe0, 0x00, 0xc3,
  0x12, 0x91, 0x8a, 0x02, 0x1c, 0xe6, 0x45, 0xc2, 0xc4, 0xfd, 0xbf, 0x44,
  0xa1, 0x4c, 0x33, 0xc5, 0x84, 0x23, 0x7c, 0xb0, 0x25, 0x15, 0x35, 0x69,
  0xff, 0x94, 0x4d, 0x70, 0xa2, 0xaf, 0xcd, 0xd6, 0x6c, 0xb7, 0xf8, 0x09,
  0xf3, 0x67, 0xa4, 0xea, 0xec, 0xb6, 0xd4, 0xd2, 0x14, 0x1e, 0xe1, 0x24,
  0x38, 0xc6, 0xdb, 0x4b, 0x7a, 0x3a, 0xde, 0x5e, 0xdf, 0x95, 0xfc, 0xaa,
  0xd7, 0xce, 0x07, 0x0f, 0x3d, 0x58, 0x9a, 0x98, 0x9c, 0xf2, 0xa7, 0x11,
  0x7e, 0x8b, 0x43, 0x03, 0xe2, 0xdc, 0xe5, 0xb2, 0x4e, 0xc7, 0x6d, 0xe9,
  0x27, 0x40, 0xd8, 0x37, 0x92, 0x8f, 0x01, 0x1d, 0x53, 0x3e, 0x59, 0xc1,
  0x4f, 0x32, 0x16, 0xfa, 0x74, 0xfb, 0x63, 0x9f, 0x34, 0x1a, 0x2a, 0x5a,
  0x8d, 0xc9, 0xcf, 0xf6, 0x90, 0x28, 0x88, 0x9b, 0x31, 0x0e, 0xbd, 0x4a,
  0xe8, 0x96, 0xa6, 0x0c, 0xc8, 0x79, 0xbc, 0xbe, 0xef, 0x6e, 0x46, 0x97,
  0x5b, 0xed, 0x19, 0xd9, 0xac, 0x99, 0xa8, 0x29, 0x64, 0x1f, 0xad, 0x55,
  0x13, 0xbb, 0xf7, 0x6f, 0xb9, 0x47, 0x2f, 0xee, 0xb8, 0x7b, 0x89, 0x30,
  0xd3, 0x7f, 0x76, 0x82
];
/** @type {number[]} */
const eBOX = [
  0x1, 0xb, 0x9, 0xc, 0xd, 0x6, 0xf, 0x3,
  0xe, 0x8, 0x7, 0x4, 0xa, 0x2, 0x5, 0x0
];
/** @type {number[]} */
const rBOX = [
  0x7, 0xc, 0xb, 0xd, 0xe, 0x4, 0x9, 0xf,
  0x6, 0x3, 0x8, 0xa, 0x2, 0x5, 0x1, 0x0
];
/** @type {number[]} */
const iBOX = new Array(16);
/** @type {number[]} */
const theta = [1, 1, 4, 1, 8, 5, 2, 9];
/** @type {number[]} */
const theta0 = [1, 1, 3, 1, 5, 8, 9, 5];
/** @type {Array[]} */
let C = new Array(512);
/** @type {number[]} */
let RC = new Array(22);
/** @type {Array[]} */
let C0 = new Array(512);
/** @type {number[]} */
let RC0 = new Array(22);
/** @type {Array[]} */
let CT = new Array(512);
/** @type {number[]} */
let RCT = new Array(22);

/**
 * Calculates SBOX from eBOX & rBOX
 *
 * @private
 * @returns {void}
 */
function calculateSBOX() {
  for (let i = 0; i < 16; i++) {
    iBOX[eBOX[i]] = i | 0;
  }
  for (let i = 0; i < 256; i++) {
    let left = eBOX[i >> 4];
    let right = iBOX[i & 0xf];
    let temp = rBOX[left ^ right];
    SBOX[i] = (eBOX[left ^ temp] << 4) | iBOX[right ^ temp];
  }
}

/**
 * Calculates C* & RC* transform tables
 *
 * @private
 * @param {number[]} SBOX
 * @param {number[]} theta
 * @returns {[Array[], number[]]}
 */
function calculateRC(SBOX, theta) {
  /** @type {Array[]} */
  const C = new Array(512);
  /** @type {number[]} */
  const RC = new Array(22);

  for (let t = 0; t < 8; t++) {
    C[t] = [];
  }
  for (let i = 0; i < 256; i++) {
    let V = new Array(10);
    V[1] = SBOX[i];
    V[2] = V[1] << 1;
    if (V[2] >= 0x100) {
      V[2] ^= 0x11d;
    }
    V[3] = V[2] ^ V[1];
    V[4] = V[2] << 1;
    if (V[4] >= 0x100) {
      V[4] ^= 0x11d;
    }
    V[5] = V[4] ^ V[1];
    V[8] = V[4] << 1;
    if (V[8] >= 0x100) {
      V[8] ^= 0x11d;
    }
    V[9] = V[8] ^ V[1];

    // build the circulant table C[0][x] = S[x].[1, 1, 4, 1, 8, 5, 2, 9] | S[x].[1, 1, 3, 1, 5, 8, 9, 5]
    C[0][i * 2] = (V[theta[0]] << 24) | (V[theta[1]] << 16) | (V[theta[2]] << 8) | V[theta[3]];
    C[0][i * 2 + 1] = (V[theta[4]] << 24) | (V[theta[5]] << 16) | (V[theta[6]] << 8) | V[theta[7]];

    // build the remaining circulant tables C[t][x] = C[0][x] rotr t
    for (let t = 1; t < 8; t++) {
      C[t][i * 2] = rotateRight64lo(C[0][i * 2 + 1], C[0][i * 2], t << 3);
      C[t][i * 2 + 1] = rotateRight64hi(C[0][i * 2 + 1], C[0][i * 2], t << 3);
    }
  }
  // build the round constants
  RC[0] = 0;
  RC[1] = 0;
  for (let i = 1; i <= 10; i++) {
    RC[i * 2] = (C[0][16 * i - 16] & 0xff000000) ^
      (C[1][16 * i - 14] & 0x00ff0000) ^
      (C[2][16 * i - 12] & 0x0000ff00) ^
      (C[3][16 * i - 10] & 0x000000ff);
    RC[i * 2 + 1] = (C[4][16 * i - 7] & 0xff000000) ^
      (C[5][16 * i - 5] & 0x00ff0000) ^
      (C[6][16 * i - 3] & 0x0000ff00) ^
      (C[7][16 * i - 1] & 0x000000ff);
  }

  return [C, RC];
}

// Build transform tables
(function () {
  calculateSBOX();

  // whirlpool-0
  let x = calculateRC(SBOX0, theta0);
  C0 = x[0];
  RC0 = x[1];
  // whirlpool-t
  x = calculateRC(SBOX, theta0);
  CT = x[0];
  RCT = x[1];
  // whirlpool
  x = calculateRC(SBOX, theta);
  C = x[0];
  RC = x[1];
})();

/**
 * Calculates [WHIRLPOOL (WHIRLPOOL-0, WHIRLPOOL-T)](http://www.larc.usp.br/~pbarreto/WhirlpoolPage.html) hash
 *
 * @example <caption>Calculates WHIRLPOOL hash from string "message" - ES6 style</caption>
 * import Whirlpool from "crypto-api/hasher/whirlpool";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Whirlpool();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates WHIRLPOOL hash from UTF string "message" - ES6 style</caption>
 * import Whirlpool from "crypto-api/hasher/whirlpool";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Whirlpool();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates WHIRLPOOL hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('whirlpool');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates WHIRLPOOL hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('whirlpool', 'message'));
 * </script>
 */
class Whirlpool extends Hasher32be {
  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=10] - Number of rounds (Can be from 1 to 10)
   * @param {string} [options.type] - Algorithm type
   *
   * | Hash type   | Type      |
   * |-------------|-----------|
   * | whirlpool-0 | '0'       |
   * | whirlpool-t | 't'       |
   * | whirlpool   | undefined |
   */
  constructor(options) {
    super(options);

    this.options.type = this.options.type || '';
    this.options.rounds = this.options.rounds || 10;

    this.state.hash = new Array(16);
    for (let i = 0; i < 16; i++) {
      this.state.hash[i] = 0;
    }

    switch (this.options.type) {
      case '0':
      case 0:
        /**
         *  @type {{number[]}[]}
         *  @ignore
         *  */
        this.C = C0;
        /**
         *  @type {number[]}
         *  @ignore
         *  */
        this.RC = RC0;
        break;
      case 't':
        this.C = CT;
        this.RC = RCT;
        break;
      default:
        this.C = C;
        this.RC = RC;
    }
  }

  /**
   * Process ready blocks
   *
   * @protected
   * @ignore
   * @param {number[]} block - Block
   */
  processBlock(block) {
    // compute and apply K^0 to the cipher state
    let K = new Array(16);
    let state = [];
    for (let i = 0; i < 16; i++) {
      state[i] = block[i] ^ (K[i] = this.state.hash[i]) | 0;
    }

    // iterate over all rounds
    let L = [];
    for (let r = 1; r <= this.options.rounds; r++) {
      // compute K^r from K^{r-1}
      for (let i = 0; i < 8; i++) {
        L[i * 2] = 0;
        L[i * 2 + 1] = 0;
        for (let t = 0, s = 56, j = 0; t < 8; t++, s -= 8, j = s < 32 ? 1 : 0) {
          L[i * 2] ^= this.C[t][((K[((i - t) & 7) * 2 + j] >>> (s % 32)) & 0xff) * 2];
          L[i * 2 + 1] ^= this.C[t][((K[((i - t) & 7) * 2 + j] >>> (s % 32)) & 0xff) * 2 + 1];
        }
      }
      for (let i = 0; i < 16; i++) {
        K[i] = L[i];
      }
      K[0] ^= this.RC[r * 2];
      K[1] ^= this.RC[r * 2 + 1];

      // apply the r-th round transformation
      for (let i = 0; i < 8; i++) {
        L[i * 2] = K[i * 2];
        L[i * 2 + 1] = K[i * 2 + 1];
        for (let t = 0, s = 56, j = 0; t < 8; t++, s -= 8, j = s < 32 ? 1 : 0) {
          L[i * 2] ^= this.C[t][((state[((i - t) & 7) * 2 + j] >>> (s % 32)) & 0xff) * 2];
          L[i * 2 + 1] ^= this.C[t][((state[((i - t) & 7) * 2 + j] >>> (s % 32)) & 0xff) * 2 + 1];
        }
      }
      for (let i = 0; i < 16; i++) {
        state[i] = L[i];
      }
    }
    // apply the Miyaguchi-Preneel compression function
    for (let i = 0; i < 16; i++) {
      this.state.hash[i] ^= state[i] ^ block[i];
    }
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

export default Whirlpool;