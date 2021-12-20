const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
    return new Promise((resolve, reject) => {
        try {
            let output = '';

            const DEFAULT_ALPHABET = "ABCDEFGHIKLMNOPQRSTUWXYZ";

            if (input && input.length > 0) {
                let alphabet = defaultValue(options.alphabet, 'ABCDEFGHIKLMNOPQRSTUWXYZ');

                let ciphertext = input.toUpperCase();
                alphabet = alphabet.toUpperCase();

                var index = -1;
                var length = ciphertext.length;
                var space = "";
                var result = "";
                var buffer = [];
                var symbol;
                var alphabetIndex;
                while (++index < length) {
                    symbol = ciphertext.charAt(index);
                    if (symbol == "A" || symbol == "B") {
                        buffer.push(symbol);
                    } else {
                        // Prepare a space to be added to the output.
                        space = " ";
                    }
                    if (buffer.length == 5) {
                        alphabetIndex =
                            (buffer[0] == "A" ? 0 : 0x10) + // 0b10000
                            (buffer[1] == "A" ? 0 : 0x08) + // 0b01000
                            (buffer[2] == "A" ? 0 : 0x04) + // 0b00100
                            (buffer[3] == "A" ? 0 : 0x02) + // 0b00010
                            (buffer[4] == "A" ? 0 : 0x01); // 0b00001
                        buffer = [];
                        result += (result.length ? space : "") + alphabet.charAt(alphabetIndex);
                        space = "";
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

