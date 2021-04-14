const defaultValue = require('../../ext.common/default-value');
const { getTapCodeTable } = require('../tap-code');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const wordDelim = defaultValue(options.wordDelim, ' ');

                const tapCodeTable = getTapCodeTable();

                let words = input.split(wordDelim);
                words = Array.prototype.map.call(words, function(word) {
                  word = word.toUpperCase();
                  word.replace(/\K/g, "");
                  const letters = Array.prototype.map.call(word, function(character) {
                    const letter = character.toUpperCase();
                    if (typeof tapCodeTable[letter] == "undefined") {
                      return "";
                    }
            
                    return tapCodeTable[letter];
                  });
            
                  return letters.join('');
                });

                
            
                output = words.join(wordDelim);

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