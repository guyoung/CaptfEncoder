export class RunningKeyCipherDecoder {
  _keyStream = "";

  constructor(options) {
    options = options || {};

    if (options.keyStream) {
      this._keyStream = options.keyStream;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");  
    var k = this._keyStream.toLowerCase().replace(/[^a-z]/g, ""); 
  
    if(ciphertext.length < 1){ 
      throw("please enter some ciphertext (letters and numbers only)");
    }    
    if(k.length <= ciphertext.length){ 
      throw("key stream should be at least as long as ciphertext"); 
    }

    var plaintext="";

    for(let i=0; i<ciphertext.length; i++){
        plaintext += String.fromCharCode(
          (((ciphertext.charCodeAt(i)-97) - (k.charCodeAt(i%k.length)-97)+26)%26)+97);
    }
    
    return plaintext;
  }
}
