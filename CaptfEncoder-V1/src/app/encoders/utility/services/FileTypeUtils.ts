const readChunk = require("read-chunk");
const fileType = require("file-type");

export class FileTypeUtils {
  public static getType(
    filepath: string,
    position: number = 0,
    length: number = 4100
  ) {
    return new Promise((resolve, reject) => {
      try {
        const buffer = readChunk.sync(filepath, position, length);

        //=> {ext: 'png', mime: 'image/png'}
        const result = fileType(buffer);
           
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}
