'use strict';

/**
 * Calculates [HMAC](https://tools.ietf.org/html/rfc2104)
 *
 * @example <caption>Calculates HMAC-MD5 from string "message" with key "key" - ES6 style</caption>
 * import Md5 from "crypto-api/hasher/md5";
 * import Hmac from "crypto-api/mac/hmac";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Md5();
 * let hmac = new Hmac('key', hasher);
 * hmac.update('message');
 * console.log(toHex(hmac.finalize()));
 *
 * @example <caption>Calculates HMAC-MD5 from UTF string "message" with UTF key "key" - ES6 style</caption>
 * import Md5 from "crypto-api/hasher/md5";
 * import Hmac from "crypto-api/mac/hmac";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Md5();
 * let hmac = new Hmac(fromUtf('key'), hasher);
 * hmac.update(fromUtf('message'));
 * console.log(toHex(hmac.finalize()));
 *
 * @example <caption>Calculates HMAC-MD5 from string "message" with key "key" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   var hmac = CryptoApi.getHmac('key', hasher);
 *   hmac.update('message');
 *   console.log(CryptoApi.encoder.toHex(hmac.finalize()));
 * </script>
 *
 * @example <caption>Calculates HMAC-MD5 from UTF string "message" with UTF key "key" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('md5');
 *   console.log(CryptoApi.hmac('key', 'message', hasher));
 * </script>
 */
class Hmac {
  /**
   *
   * @param {string} key
   * @param {Hasher} hasher
   */
  constructor(key, hasher) {
    if (key.length > hasher.blockSizeInBytes) {
      hasher.update(key);
      key =  hasher.finalize();
      hasher.reset();
    }
    for (let i = key.length; i < hasher.blockSizeInBytes; i++) {
      key += "\x00";
    }
    /**
     * @type {string}
     * @ignore
     */
    this.oPad = '';
    for (let i = 0; i < key.length; i++) {
      hasher.update(String.fromCharCode(0x36 ^ key.charCodeAt(i)));
      this.oPad += String.fromCharCode(0x5c ^ key.charCodeAt(i));
    }
    /**
     * @type {Hasher}
     * @ignore
     */
    this.hasher = hasher;
  }

  /**
   * Update message from binary string
   *
   * @param {string} message
   */
  update(message) {
    this.hasher.update(message);
  }

  /**
   * Finalize hmac and return result
   *
   * @returns {string}
   */
  finalize() {
    let hash = this.hasher.finalize();
    this.hasher.reset();
    this.hasher.update(this.oPad);
    this.hasher.update(hash);
    return this.hasher.finalize();
  }
}

export default Hmac;