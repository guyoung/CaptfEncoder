const defaultValue = require('../../ext.common/default-value');
const { getTapCodeTable } = require('../tap-code');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            if (input && input.length > 0) {
                const wordDelim = defaultValue(options.wordDelim, ' ');

                const tapCodeTable = getTapCodeTable();

                let reversedTable = {};

                for (const letter in tapCodeTable) {
                    const signal = tapCodeTable[letter];
                    reversedTable[signal] = letter;
                }

                let words = [input];
                if (wordDelim) {
                    words = input.split(wordDelim);
                }
                words = Array.prototype.map.call(words, function (word) {

                    var letters = []
                    for (let i = 0; i < word.length; i = i + 2) {
                        var val = word.substr(i, 2);
                        if (reversedTable[val]) {
                            letters.push(reversedTable[val]);
                        }
                    }

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