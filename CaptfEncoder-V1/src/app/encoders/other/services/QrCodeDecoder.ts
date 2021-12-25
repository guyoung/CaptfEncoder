const jsQR = require("jsqr");
var fs = require("fs");
var Jimp = require("../../../thirdparty/jimp/index");

export class QrCodeDecoder {
  constructor(options) {
    options = options || {};
  }

  public handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    const buffer = Buffer.from(input, "base64");  

    if (!buffer || buffer.length < 1) {
      return;
    }

    return new Promise<string>(function(resolve, reject) {
      Jimp.read(buffer, function(err, image) {
        if (err) {
          reject(err);
        }
        
        const result = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height, {});

        if (result) {        
          resolve(result.data);
        }
        else {
          resolve('');
        }      
        
      });
    });
  }
}
