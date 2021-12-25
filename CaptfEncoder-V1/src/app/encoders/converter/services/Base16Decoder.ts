
import { StringConverter } from "./StringConverter";

export class Base16Decoder {
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

    var table = [ 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  -1, -1, -1, -1, -1, -1, 
      -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    
    let output = [];

    for ( var start = 0, offset = 0; start + 2 <= input.length; start += 2 ) {

      var a = table[input.charCodeAt(start) & 0x7F];    
      var b = table[input.charCodeAt(start + 1) & 0x7F];
      
      if ( a < 0 || b < 0 ) { 
          continue;
      }
      
      output[offset++] = a << 4 | b;
    }

    return output;
  }
}