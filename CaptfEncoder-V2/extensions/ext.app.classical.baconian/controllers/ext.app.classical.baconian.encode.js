const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            const DEFAULT_ALPHABET = "ABCDEFGHIKLMNOPQRSTUWXYZ";
            
            if (input && input.length > 0) {
                let alphabet = defaultValue(options.alphabet, 'ABCDEFGHIKLMNOPQRSTUWXYZ');

                let plaintext = input.toUpperCase();
                alphabet = alphabet.toUpperCase();

                if (alphabet == DEFAULT_ALPHABET) {
                    plaintext
                        .replace(/J/g, 'I')
                        .replace(/V/g, 'U');
                }

                var index = -1;
                var length = plaintext.length;
                var alphabetIndex;
                var space = '';
                var result = '';
                while (++index < length) {
                    alphabetIndex = alphabet.indexOf(plaintext.charAt(index));
                    if (alphabetIndex > -1) {
                        result += space + (
                            (alphabetIndex & 0x10 ? 'B' : 'A') + // 0b10000
                            (alphabetIndex & 0x08 ? 'B' : 'A') + // 0b01000
                            (alphabetIndex & 0x04 ? 'B' : 'A') + // 0b00100
                            (alphabetIndex & 0x02 ? 'B' : 'A') + // 0b00010
                            (alphabetIndex & 0x01 ? 'B' : 'A')   // 0b00001
                        );
                        space = '';
                    } else if (index) {
                        // Prepare a space to be added to the output, unless it’s leading space.
                        space = ' ';
                    }
                }

                output = result;

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
