'use strict';

/**
 * Rotate x to n bits left
 *
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */
function rotateLeft(x, n) {
  return ((x << n) | (x >>> (32 - n))) | 0;
}

/**
 * Rotate x to n bits right
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */
function rotateRight(x, n) {
  return ((x >>> n) | (x << (32 - n))) | 0;
}

/**
 * Rotate 64bit to n bits right and return hi
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */
function rotateRight64hi(hi, lo, n) {
  if (n === 32) {
    return lo;
  }
  if (n > 32) {
    return rotateRight64hi(lo, hi, n - 32);
  }
  return ((hi >>> n) | (lo << (32 - n))) & (0xFFFFFFFF);
}

/**
 * Rotate 64bit to n bits right and return lo
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */
function rotateRight64lo(hi, lo, n) {
  if (n === 32) {
    return hi;
  }
  if (n > 32) {
    return rotateRight64lo(lo, hi, n - 32);
  }
  return ((lo >>> n) | (hi << (32 - n))) & (0xFFFFFFFF);
}

export {rotateLeft, rotateRight, rotateRight64lo, rotateRight64hi};