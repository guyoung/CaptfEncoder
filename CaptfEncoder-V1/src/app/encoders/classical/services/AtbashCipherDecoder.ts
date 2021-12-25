

export class AtbashCipherDecoder {
  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }  
    var ciphertext = input.toLowerCase();
    var chars = "ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();
    var plaintext = "";
    var re = /[a-z]/;
    for (let i = 0; i < ciphertext.length; i++) {
      if (re.test(ciphertext.charAt(i))) {
        plaintext += String.fromCharCode(
          chars.indexOf(ciphertext.charAt(i)) + 97
        );
      } else {
        plaintext += ciphertext.charAt(i);
      }
    }

    return plaintext;
  }
}
