var jsfuck = require('jsfuck').JSFuck;

export class JsFuckEncoder {
  
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
    if (!input || input.length < 1) {
      return;
    }

    return jsfuck.encode(input, this._eval, this._scope);
  }
}
