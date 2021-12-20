'use strict';

const interpret = require('./interpreter');
const parse = require('./parser');

module.exports = (program, input = '') => {
  if (typeof program !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof program}`);
  }

  if (input !== undefined && typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`);
  }

  const state = {
    input,
    output: '',
    pointer: 0,
    tape: [],
  };

  return interpret(parse(program), state).output;
};
