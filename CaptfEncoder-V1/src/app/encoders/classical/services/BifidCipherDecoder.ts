export class BifidCipherDecoder {
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
        var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");  
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
        var pt1 = "";

        for(let i=0; i<ciphertext.length; i++){
            var index = keysquare.indexOf(ciphertext.charAt(i));
            pt1 += ind.charAt(index/5) + ind.charAt(index%5);
        }

        var i = 0; 
        var pt2 = ""; 
        var pt3 = "";

        while(pt1.length - i >= 2*period){
            pt2 += pt1.substr(i,period);
            pt3 += pt1.substr(i+period,period);
            i+=2*period;
        }

        var k = (pt1.length - i)/2;

        if(k >= 1){
            pt2 += pt1.substr(i,k); 
            pt3 += pt1.substr(i+k,k);
        }
        
        var plaintext = "";
        for(i=0; i<pt2.length; i++){ 
            plaintext += keysquare.charAt(
                (parseInt(pt2.charAt(i))-1)*5 + (parseInt(pt3.charAt(i))-1));}
        
        return plaintext;
    }
  }
  