const defaultValue = require('../../ext.common/default-value');
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

                output = input.split(/\r?\n/);
         
                output = Array.prototype.map.call(output, function (line) {
                    let words = line.split(/ +/);
                    words = Array.prototype.map.call(words, function (word) {
                        const letters = Array.prototype.map.call(word, function (character) {
                            const letter = character.toUpperCase();
                            if (typeof morseTable[letter] == "undefined") {
                                return "";
                            }

                            return morseTable[letter];
                        });

                        return letters.join("<ld>");
                    });
                    line = words.join("<wd>");
                    return line;
                });
                output = output.join("\n");      

                output = output.replace(/<dash>|<dot>|<ld>|<wd>/g, function (match) {
                    switch (match) {
                        case "<dash>":
                            return dashFormat;
                        case "<dot>":
                            return dotFormat;
                        case "<ld>":
                            return letterDelim;
                        case "<wd>":
                            return wordDelim;
                    }
                });          
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