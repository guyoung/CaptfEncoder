module.exports = function (tokens, state) {
    const length = tokens.length;
    let i = 0;
  
    while (i < length) {
      const { pointer, tape, } = state;
      const bite = tape[pointer];
  
      const { character, end, line, start, type, } = tokens[i];
  
      if (type === '[') {
        if (bite) {
          ++i;
          continue;
        } else {
          i = end + 1;
          continue;
        }
      }
  
      if (type === ']') {
        if (bite) {
          i = start + 1;
          continue;
        } else {
          ++i;
          continue;
        }
      }
  
      if (type === '+') {
        const nextBite = (tape[pointer] || 0) + 1;
        state.tape[pointer] = nextBite > 255 ? 0 : nextBite;
      }
  
      if (type === '-') {
        const nextBite = (tape[pointer] || 0) - 1;
        state.tape[pointer] = nextBite < 0 ? 255 : nextBite;
      }
  
      if (type === '<') {
        --state.pointer;
  
        if (state.pointer !== state.pointer || state.pointer < 0) {
          throw new RangeError(
            `Your program used the < command one too many times in a row.
            You are already at the left-most memory position.
            Check line ${line}, character ${character}.`
          );
        }
      }
  
      if (type === '>') {
        ++state.pointer;
      }
  
      if (type === ',') {
        state.tape[pointer] = state.input.charCodeAt() || 0;
        state.input = state.input.substring(1);
      }
  
      if (type === '.') {
        state.output += String.fromCharCode(tape[pointer]);
      }
  
      ++i;
    }
  
    return state;
  };