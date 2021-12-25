export class ROT18CipherDecoder {

  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
    }
    var ciphertext = input;
    var plaintext = "";
    var shift;

    for (var i = 0; i < ciphertext.length; i++) {
      var c = ciphertext.charCodeAt(i);

      if (48 <= c && c <= 57) {
        shift = 5;
        plaintext += String.fromCharCode(
          ((c - 48 + 10 - shift) % 10) + 48
        );
      } else if (65 <= c && c <= 90) {
        shift = 13;
        plaintext += String.fromCharCode(
          ((c - 65 + 26 - shift) % 26) + 65
        );
      } else if (97 <= c && c <= 122) {
        shift = 13;
        plaintext += String.fromCharCode(
          ((c - 97 + 26 - shift) % 26) + 97
        );
      } else plaintext += ciphertext.charAt(i);
    }

    return plaintext;
  }
}
