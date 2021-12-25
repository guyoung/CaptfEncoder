var jsfuck = require('jsfuck').JSFuck;

export class JsFuckDecoder {
  
  _eval: boolean = false;
  _scope: boolean = false;

  constructor(options) {
    options = options || {};

    if (options.eval != null) {
      this._eval = new Boolean(options.eval).valueOf();
    }

    if (options.scope != null) {
        this._scope = new Boolean(options.scope).valueOf();
      }
  }

  public async handle(input) {
   
  }
}
