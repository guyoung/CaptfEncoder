export class HillCipherDecoder {
  _key = "";

  constructor(options) {
    options = options || {};

    if (options.key) {
      this._key = options.key;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");

    var strKeys = this._key.split(" ");

    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters only, numbers should be spelled)"); 
    }    
    if (ciphertext.length % 2 == 1) {
      throw "ciphertext is not divisible by 2 (wrong algorithm?)";
    }

    if (strKeys.length != 4) {
      throw "key should consist of 4 integers";
    }
    var keys = [strKeys.length];
    for (let i = 0; i < 4; i++) {
      keys[i] = parseInt(strKeys[i]) % 26;
    }

    var det = keys[0] * keys[3] - keys[1] * keys[2];
    det = (det % 26 + 26) % 26;
    var di = 0;
    for (let i = 0; i < 26; i++) {
      if ((det * i) % 26 == 1) di = i;
    }

    if (di == 0) {
      throw "could not invert, try different key";
    }

    var ikeys = new Array(4);
    ikeys[0] = (di * keys[3]) % 26;
    ikeys[1] = (-1 * di * keys[1]) % 26;
    ikeys[2] = (-1 * di * keys[2]) % 26;
    ikeys[3] = di * keys[0];

    for (let i = 0; i < 4; i++) {
      if (ikeys[i] < 0) ikeys[i] += 26;
    }

    var plaintext = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
      plaintext += String.fromCharCode(
        (ikeys[0] * (ciphertext.charCodeAt(i) - 97) +
          ikeys[1] * (ciphertext.charCodeAt(i + 1) - 97)) %
          26 +
          97
      );
      plaintext += String.fromCharCode(
        (ikeys[2] * (ciphertext.charCodeAt(i) - 97) +
          ikeys[3] * (ciphertext.charCodeAt(i + 1) - 97)) %
          26 +
          97
      );
    }

    return plaintext;
  }
}
