'use strict';

/**
 * Convert UTF8/UTF16 string to binary input for hasher
 *
 * @param {string} message
 * @returns {string}
 */
function fromUtf(message) {
  let raw = '';
  for (let i = 0, msgLen = message.length; i < msgLen; i++) {
    let charCode = message.charCodeAt(i);
    if (charCode < 0x80) {
      raw += String.fromCharCode(charCode);
    }
    else if (charCode < 0x800) {
      raw += String.fromCharCode(0xc0 | (charCode >> 6));
      raw += String.fromCharCode(0x80 | (charCode & 0x3f));
    }
    else if (charCode < 0xd800 || charCode >= 0xe000) {
      raw += String.fromCharCode(0xe0 | (charCode >> 12));
      raw += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
      raw += String.fromCharCode(0x80 | (charCode & 0x3f));
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charCode = 0x10000 + (((charCode & 0x3ff) << 10)
        | (message.charCodeAt(i) & 0x3ff));
      raw += String.fromCharCode(0xf0 | (charCode >> 18));
      raw += String.fromCharCode(0x80 | ((charCode >> 12) & 0x3f));
      raw += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
      raw += String.fromCharCode(0x80 | (charCode & 0x3f));
    }
  }
  return raw;
}

export {fromUtf};