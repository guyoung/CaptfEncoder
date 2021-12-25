
import { StringConverter } from "./StringConverter";

export class Base32Decoder {
  _encoding = "utf8";

  constructor(options) {
    options = options || {};
    if (options.encoding) {
      this._encoding = options.encoding;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }
        
    var arr = this.runFrom32(input);

    return StringConverter.uint8ArrayToStr(new Uint8Array(arr), this._encoding);
  }

  runFrom32(input) {
    if (!input) {
      return []
    }

    input = input.toUpperCase();

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=";
    
    let output = [],
        chr1, chr2, chr3, chr4, chr5,
        enc1, enc2, enc3, enc4, enc5, enc6, enc7, enc8,
        i = 0;

 
    while (i < input.length) {
        enc1 = alphabet.indexOf(input.charAt(i++));
        enc2 = alphabet.indexOf(input.charAt(i++) || "=");
        enc3 = alphabet.indexOf(input.charAt(i++) || "=");
        enc4 = alphabet.indexOf(input.charAt(i++) || "=");
        enc5 = alphabet.indexOf(input.charAt(i++) || "=");
        enc6 = alphabet.indexOf(input.charAt(i++) || "=");
        enc7 = alphabet.indexOf(input.charAt(i++) || "=");
        enc8 = alphabet.indexOf(input.charAt(i++) || "=");

        chr1 = (enc1 << 3) | (enc2 >> 2);
        chr2 = ((enc2 & 3) << 6) | (enc3 << 1) | (enc4 >> 4);
        chr3 = ((enc4 & 15) << 4) | (enc5 >> 1);
        chr4 = ((enc5 & 1) << 7) | (enc6 << 2) | (enc7 >> 3);
        chr5 = ((enc7 & 7) << 5) | enc8;

        output.push(chr1);
        if ((enc2 & 3) !== 0 || enc3 !== 32) output.push(chr2);
        if ((enc4 & 15) !== 0 || enc5 !== 32) output.push(chr3);
        if ((enc5 & 1) !== 0 || enc6 !== 32) output.push(chr4);
        if ((enc7 & 7) !== 0 || enc8 !== 32) output.push(chr5);
    }

    return output;
}
}