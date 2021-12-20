module.exports = function (program) {
    const tokens = [];
  
    const length = program.length;
  
    let line = 1;
    let character = 1;
  
    const locations = [];
  
    for (let i = 0, starts = 0, ends = 0; i < length; i++) {
      const c = program[i];
  
      if (c === '\n') {
        ++line;
        character = 1;
  
        continue;
      }
  
      if ([ '+', '-', '<', '>', ',', '.', '[', ']', ].indexOf(c) > -1) {
        const token = {
          character,
          line,
          type: c,
        };
  
        if (c === '[') {
          ++starts;
  
          locations.push({
            character,
            line,
            tokenId: tokens.length,
          });
        }
  
        if (c === ']') {
          ++ends;
  
          if (starts < ends) {
            throw new SyntaxError(
              `An unmatched ] command was found at line ${line}, character ${character}.
              You can't close a loop without opening one!`
            );
          }
  
          const { tokenId, } = locations.pop();
  
          token.start = tokenId;
          tokens[tokenId].end = tokens.length;
        }
  
        tokens.push(token);
      }
  
      ++character;
    }
  
    if (locations.length) {
      const { line, character, } = locations.shift();
  
      throw new SyntaxError(
        `An unmatched [ was found at line ${line}, character ${character}.
        Don't forget to close your loops!`
      );
    }
  
    return tokens;
  };
  