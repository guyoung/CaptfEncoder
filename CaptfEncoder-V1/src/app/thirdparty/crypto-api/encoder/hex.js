'use strict';

/**
 * Convert binary result of hash to hex
 *
 * @param {string} raw
 * @returns {string}
 */
function toHex(raw) {
  let str = '';
  for (let i = 0, l = raw.length; i < l; i++) {
    str += (raw.charCodeAt(i) < 16 ? '0' : '') + raw.charCodeAt(i).toString(16);
  }
  return str;
}

export {toHex};