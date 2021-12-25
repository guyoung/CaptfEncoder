'use strict';

import Has160 from "./hasher/has160";
import Md2 from "./hasher/md2";
import Md4 from "./hasher/md4";
import Md5 from "./hasher/md5";
import Ripemd from "./hasher/ripemd";
import Sha0 from "./hasher/sha0";
import Sha1 from "./hasher/sha1";
import Sha256 from "./hasher/sha256";
import Sha512 from "./hasher/sha512";
import Snefru from "./hasher/snefru";
import Whirlpool from "./hasher/whirlpool";
import {fromUtf} from "./encoder/utf";
import {toHex} from "./encoder/hex";
import Hmac from "./mac/hmac";

/**
 * Main class for ES5 compatibility.
 * Please use subclasses of {@link Hasher} for ES6
 */
class CryptoApi {
  /**
   * @ignore
   */
  constructor() {
    /** @type {{}} */
    this.encoder = {};
    /** @type {fromUtf} */
    this.encoder.fromUtf = fromUtf;
    /** @type {toHex} */
    this.encoder.toHex = toHex;
  }

  /**
   * Get hasher by alias
   *
   * @param {string} name
   * @param {Object} options
   * @returns {Hasher}
   */
  getHasher(name, options) {
    options = options || {};
    switch (name) {
      case 'has160':
        return new Has160(options);
      case 'md2':
        return new Md2(options);
      case 'md4':
        return new Md4(options);
      case 'md5':
        return new Md5(options);
      case 'ripemd128':
        options = Object.assign({}, {length: 128}, options);
        return new Ripemd(options);
      case 'ripemd':
      case 'ripemd160':
        options = Object.assign({}, {length: 160}, options);
        return new Ripemd(options);
      case 'ripemd256':
        options = Object.assign({}, {length: 256}, options);
        return new Ripemd(options);
      case 'ripemd320':
        options = Object.assign({}, {length: 320}, options);
        return new Ripemd(options);
      case 'sha0':
        return new Sha0(options);
      case 'sha1':
        return new Sha1(options);
      case 'sha224':
        options = Object.assign({}, {length: 224}, options);
        return new Sha256(options);
      case 'sha256':
        options = Object.assign({}, {length: 256}, options);
        return new Sha256(options);
      case 'sha384':
        options = Object.assign({}, {length: 384}, options);
        return new Sha512(options);
      case 'sha512':
        options = Object.assign({}, {length: 512}, options);
        return new Sha512(options);
      case 'sha512/224':
        options = Object.assign({}, {length: 224}, options);
        return new Sha512(options);
      case 'sha512/256':
        options = Object.assign({}, {length: 256}, options);
        return new Sha512(options);
      case 'snefru':
      case 'snefru128':
      case 'snefru128/8':
        options = Object.assign({}, {length: 128}, options);
        return new Snefru(options);
      case 'snefru256':
      case 'snefru256/8':
        options = Object.assign({}, {length: 256}, options);
        return new Snefru(options);
      case 'snefru128/2':
        options = Object.assign({}, {length: 128, rounds: 2}, options);
        return new Snefru(options);
      case 'snefru256/4':
        options = Object.assign({}, {length: 256, rounds: 4}, options);
        return new Snefru(options);
      case 'whirlpool':
        return new Whirlpool(options);
      case 'whirlpool-0':
        options = Object.assign({}, {type: '0'}, options);
        return new Whirlpool(options);
      case 'whirlpool-t':
        options = Object.assign({}, {type: 't'}, options);
        return new Whirlpool(options);
    }
  }

  /**
   * Hash UTF message and return result in hex
   *
   * @param {string} name
   * @param {string} message
   * @param {Object} options
   * @returns {string}
   */
  hash(name, message, options) {
    options = options || {};
    let hasher = this.getHasher(name, options);
    hasher.update(fromUtf(message));
    return toHex(hasher.finalize());
  }

  /**
   * Get HMAC instance
   *
   * @param {string} key
   * @param {Hasher} hasher
   * @returns {Hmac}
   */
  getHmac(key, hasher) {
    return new Hmac(key, hasher);
  }

  /**
   * HMAC with UTF key from UTF message and return result in hex
   *
   * @param {string} key
   * @param {string} message
   * @param {Hasher} hasher
   * @returns {string}
   */
  hmac(key, message, hasher) {
    let mac = this.getHmac(fromUtf(key), hasher);
    mac.update(fromUtf(message));
    return toHex(mac.finalize());
  }
}

CryptoApi = new CryptoApi();
export default CryptoApi;