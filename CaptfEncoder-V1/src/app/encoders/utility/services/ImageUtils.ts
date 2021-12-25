const Jimp = require("../../../thirdparty/jimp/index");
const fs = require("fs");
var omggif = require("omggif");

export class ImageUtils {
  public static async getExif(src: string) {
    var buffer = fs.readFileSync(src, null).buffer;

    const img = await Jimp.read(buffer);  

    return JSON.stringify(img._exif, null, 4);   
  }

  public static async extractGif(src: string) {
    const buffer = fs.readFileSync(src, null).buffer;

    const gifReader = new omggif.GifReader(
      new Uint8Array(buffer, 0, buffer.length)
    );
    const frameZero = gifReader.frameInfo(0);
    let [width, height] = [frameZero.width, frameZero.height];   

    let result: string[] = [];

    for (let i = 0; i < gifReader.numFrames(); i++) {
      const frameInfo = gifReader.frameInfo(i);
      let imageBuffer = new Uint8ClampedArray(width * height * 4);
      gifReader.decodeAndBlitFrameRGBA(i, imageBuffer);

      const data = await ImageUtils._getBase64Image(imageBuffer, width, height);

      result.push(data);
    }

    return result;
  }

  private static _getBase64Image(data: Uint8ClampedArray, width, height) {
    return new Promise<string>(function(resolve, reject) {
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
}
