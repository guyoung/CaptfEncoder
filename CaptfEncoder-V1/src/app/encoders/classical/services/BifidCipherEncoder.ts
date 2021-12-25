export class BifidCipherEncoder {
    _keySquare = "";
    _period = 1;
  
    constructor(options) {
      options = options || {};
  
      if (options.keySquare) {
        this._keySquare = options.keySquare;
      }
      if (options.period) {
          //var period = parseInt(options.period.replace(/[^0-9]/g,""));
          //if(isNaN(period)){ throw("period should be an integer"); }
          this._period = parseInt(options.period);
        }
    }
  
    async handle(input) {
        if (!input || input.length < 1) {
            return;
        }
      
        var plaintext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
        var keysquare = this._keySquare.toLowerCase().replace(/[^a-z]/g, "");          
        if(keysquare.length != 25){ 
            throw("keysquare must be 25 characters in length"); 
        }
        if(keysquare.indexOf("j") >= 0){ 
            throw("key should not contain letter j (combine with i).");
        }
        var period = this._period;    
        if(period<=0){
            throw("period should greater than 0");
        } 
        
        var ind = "12345";    
        var ct1 = ""; 
        var ct2 = "";

        for(let i=0; i<plaintext.length; i++){
            var index = keysquare.indexOf(plaintext.charAt(i));
            ct1 += ind.charAt(index/5);
            ct2 += ind.charAt(index%5);
        }
        
        var i = 0; 
        var ct3 = "";
        var bit= ct1.substr(i,period);

        while(bit.length > 0){
            ct3 += bit + ct2.substr(i,period);
            i+=period;
            bit=ct1.substr(i,period);
        }

        var ciphertext = "";
        for(let i=0; i<ct3.length; i+=2){ 
            ciphertext += keysquare.charAt(
                (parseInt(ct3.charAt(i))-1)*5 + (parseInt(ct3.charAt(i+1))-1));
        }
        
        return ciphertext;
    }
  }
  