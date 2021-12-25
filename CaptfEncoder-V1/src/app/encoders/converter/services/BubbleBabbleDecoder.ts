var bubble = require('bubble_babble');

export class BubbleBabbleDecoder {
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

    return bubble.decode(input);
  }
}
