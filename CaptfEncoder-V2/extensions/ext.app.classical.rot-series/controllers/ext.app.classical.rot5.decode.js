const defaultValue = require('../../ext.common/default-value');

module.exports = async function (input, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      let output = '';

      if (input && input.length > 0) {
        const shift = 5;

        var ciphertext = input;
        var plaintext = "";

        for (var i = 0; i < ciphertext.length; i++) {
          var c = ciphertext.charCodeAt(i);

          if (48 <= c && c <= 57)
            plaintext += String.fromCharCode(
              ((c - 48 + 10 - shift) % 10) + 48
            );
          else plaintext += ciphertext.charAt(i);
        }

        output = plaintext;
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

