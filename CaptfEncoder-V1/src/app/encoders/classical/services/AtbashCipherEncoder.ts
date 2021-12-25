export class AtbashCipherEncoder {
  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }  
    var plaintext = input.toLowerCase();

    var chars = "ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();

    var ciphertext = "";
    var re = /[a-z]/;

    for (let i = 0; i < plaintext.length; i++) {
      if (re.test(plaintext.charAt(i))) {
        ciphertext += chars.charAt(plaintext.charCodeAt(i) - 97);
      } else {
        ciphertext += plaintext.charAt(i);
      } 
    }

    return ciphertext;
  }
}
