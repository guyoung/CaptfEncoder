const crypto = require("crypto");
const fs = require("fs");
const CRC32 = require('crc-32');

export class FileHashUtils {
  public static getHash(filename, algorithm = "md5") {
    return new Promise<string>((resolve, reject) => {
      // Algorithm depends on availability of OpenSSL on platform
      // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
      let shasum = crypto.createHash(algorithm);
      try {
        let s = fs.ReadStream(filename);
        s.on("data", function(data) {
          shasum.update(data);
        });
        // making digest
        s.on("end", function() {
          const hash = shasum.digest("hex");
          resolve(hash);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public static getCRC32(filename) {
    return new Promise<string>((resolve, reject) => {     
      try {
        const buffer = fs.readFileSync(filename);

        let crc = '';
        if (typeof buffer === 'string') {
          crc = CRC32.bstr(buffer).toString(16);  
        } else {
          crc = CRC32.buf(buffer).toString(16);  
        }           
        resolve(crc);    

      } catch (err) {
        reject(err);
      }
    });
  }
}
