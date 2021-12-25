import { Uint8ArrayUtils } from '../../utility/services/Uint8ArrayUtils'

const Blowfish = require('egoroof-blowfish');

export class BlowfishDecoder {
  _encoding = "utf8";

  _key = "abcdefgh";
  _iv = "abcdefgh";

  // ECB, CBC
  _mode = "ECB";

  // PKCS5, ONE_AND_ZEROS, LAST_BYTE, NULL, SPACES
  _padding = "PKCS5";

  // STRING, UINT8_ARRAY
  _output = "STRING"

  constructor(options) {
    options = options || {};

    if (options.encoding) {
      this._encoding = options.encoding;
    }
    if (options.iv) {
      this._iv = options.iv;
    }
    if (options.key) {
      this._key = options.key;
    }
    if (options.mode) {
      this._mode = options.mode;
    }
    if (options.padding) {
      this._padding = options.padding;
    }
    if (options.output) {
      this._output = options.output;
    }
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    var key = this._key;

    // ECB, CBC
    var mode = Blowfish.MODE.ECB;
    if (this._mode == "CBC") {
      mode = Blowfish.MODE.CBC;;
    }

    // PKCS5, ONE_AND_ZEROS, LAST_BYTE, NULL, SPACES
    var padding = Blowfish.PADDING.PKCS5;
    if (this._padding == "ONE_AND_ZEROS") {
      padding = Blowfish.PADDING.ONE_AND_ZEROS;;
    } else if (this._padding == "LAST_BYTE") {
      padding = Blowfish.PADDING.LAST_BYTE;
    } else if (this._padding == "NULL") {
      padding = Blowfish.PADDING.NULL;
    } else if (this._padding == "SPACES") {
      padding = Blowfish.PADDING.SPACES;
    } 

    var bf = new Blowfish(key, mode, padding);

    var arr;

    if (this._output == "BASE64") {
      arr = Uint8ArrayUtils.arrayFromBase64(input)
    }
    else if (this._output == "HEX") {
      arr = Uint8ArrayUtils.arrayFromHex(input);
    }


    return bf.decode(arr, Blowfish.TYPE.STRING); 
  }
}
