export class RunningKeyCipherEncoder {
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
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");  
    var k = this._keyStream.toLowerCase().replace(/[^a-z]/g, ""); 
  
    if(plaintext.length < 1){
      throw("please enter some plaintext (letters and numbers only)"); 
    }    
    if(k.length <= plaintext.length){ 
        throw("key stream should be at least as long as plaintext"); 
    }

    var ciphertext="";
    for(let i=0; i<plaintext.length; i++){
        ciphertext += String.fromCharCode(
            (((plaintext.charCodeAt(i)-97) + (k.charCodeAt(i%k.length)-97)+26)%26)+97);
    }
   
    return ciphertext;
  }
}
