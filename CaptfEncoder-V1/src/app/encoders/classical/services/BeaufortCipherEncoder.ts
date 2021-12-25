export class BeaufortCipherEncoder {
  _keyword = "";

  constructor(options) {
    options = options || {};

    if (options.keyword) {
      this._keyword = options.keyword;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return;
  }
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");  
    var k = this._keyword.toLowerCase().replace(/[^a-z]/g, "");    
    
    if(plaintext.length < 1){ 
      throw("please enter some plaintext (letters and numbers only)");
    }    
    if(k.length <= 1){ 
      throw("keyword should be at least 2 characters long"); 
    }
    var ciphertext="";
    for(let i=0; i<plaintext.length; i++){ 
        ciphertext += String.fromCharCode(
          (((k.charCodeAt(i%k.length)-97) - (plaintext.charCodeAt(i)-97)+26)%26)+97); 
    } 
    
    return ciphertext; 
  }
}
