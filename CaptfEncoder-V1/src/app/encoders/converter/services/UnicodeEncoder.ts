export class UnicodeEncoder {
  _delimiter = "\\u";

  constructor(options) {
    options = options || {};

   
    if (options.delimiter) {
        this._delimiter = options.delimiter;
      }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }


    var arr = [];

    for (var i = 0; i < input.length; i++) {
        var val = input.charCodeAt(i).toString(16).padStart(4, "0");        
        arr.push(val);
    }

    if(this._delimiter == "\\u") {
        return "\\u"+arr.join("");
    } else {
        return arr.join(this._delimiter);
    }
    
  }
}
