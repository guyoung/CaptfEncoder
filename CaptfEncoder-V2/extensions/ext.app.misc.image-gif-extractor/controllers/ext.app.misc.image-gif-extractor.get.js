
const defaultValue = require('../../ext.common/default-value');
const omggif = require("omggif");
const Jimp = require("jimp");

module.exports = async function (input, options = {}) {

    try {
        let output = null;

        if (input && input.data) {

            const gifReader = new omggif.GifReader(input.data);
            const frameZero = gifReader.frameInfo(0);
            let [width, height] = [frameZero.width, frameZero.height];

            let result = [];

            for (let i = 0; i < gifReader.numFrames(); i++) {            
                let imageBuffer = new Uint8ClampedArray(width * height * 4);
                gifReader.decodeAndBlitFrameRGBA(i, imageBuffer);

                const data = await getBase64Image(imageBuffer, width, height);

                result.push(data);
            }

            output = result;
        }

        return {
            success: true,
            output: output,
        };
    }
    catch (err) {
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}


function getBase64Image(data, width, height) {
    return new Promise(function(resolve, reject) {
      new Jimp({ data: data, width: width, height: height }, (err, img) => {
        if (err) {
          reject(err);
        } else {
          const data = img.getBase64Async(Jimp.MIME_JPEG);
          resolve(data);
        }
      });
    });
  }

