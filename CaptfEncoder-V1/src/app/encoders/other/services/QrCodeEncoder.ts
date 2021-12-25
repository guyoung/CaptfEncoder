var QRCode = require('qrcode')

export class QrCodeEncoder {
  
  constructor(options) {
    options = options || {};

  }

  public async handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    return new Promise<string>(function(resolve, reject) {
      QRCode.toDataURL(input, function (err, data) {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
