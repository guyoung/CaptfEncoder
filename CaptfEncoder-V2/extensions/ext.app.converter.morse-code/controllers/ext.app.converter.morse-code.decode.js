const defaultValue = require('../../ext.common/default-value');
const { replaceAll } = require('../../ext.common/string');
const { getMorseTable } = require('../morse-code');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const dashFormat = defaultValue(options.dashFormat, '-');
                const dotFormat = defaultValue(options.dotFormat, '.');
                const letterDelim = defaultValue(options.letterDelim, ' ');
                const wordDelim = defaultValue(options.wordDelim, '/');

                const morseTable = getMorseTable();

                let reversedTable = {};

                for (const letter in morseTable) {
                  const signal = morseTable[letter];
                  reversedTable[signal] = letter;
                }
            
                output = replaceAll(input, dashFormat, "<dash>");
                output = replaceAll(output, dotFormat, "<dot>");
            
                let words = [output];
                if (wordDelim) {
                  words = output.split(wordDelim);
                }
                words = Array.prototype.map.call(words, function(word) {
                  const signals = word.split(letterDelim);
            
                  const letters = signals.map(function(signal) {
                    return reversedTable[signal];
                  });
                  
                  return letters.join('');
                });
            
                output = words.join(' ');
            }

            return resolve({
                success: true,
                output: output,
            });
        }
        catch (err) {
          return resolve({
                success: false,
                output: '',
                message: err.message
            });
        }
    });
}