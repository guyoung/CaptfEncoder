import { StringConverter } from "./StringConverter";

export class QuotedPrintableEncoder {
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

    var uint8array = StringConverter.strToUint8Array(input, this._encoding);

    let mimeEncodedStr = this.mimeEncode(uint8array);

    // fix line breaks
    mimeEncodedStr = mimeEncodedStr
      .replace(/\r?\n|\r/g, function() {
        return "\r\n";
      })
      .replace(/[\t ]+$/gm, function(spaces) {
        return spaces.replace(/ /g, "=20").replace(/\t/g, "=09");
      });

    return this.addSoftLinebreaks(mimeEncodedStr, "qp");
  }

  mimeEncode(buffer) {
    let ranges = [
        [0x09],
        [0x0a],
        [0x0d],
        [0x20],
        [0x21],
        [0x23, 0x3c],
        [0x3e],
        [0x40, 0x5e],
        [0x60, 0x7e]
      ],
      result = "";

    for (let i = 0, len = buffer.length; i < len; i++) {
      if (this.checkRanges(buffer[i], ranges)) {
        result += String.fromCharCode(buffer[i]);
        continue;
      }
      result +=
        "=" +
        (buffer[i] < 0x10 ? "0" : "") +
        buffer[i].toString(16).toUpperCase();
    }

    return result;
  }

  /**
   * Checks if a given number falls within a given set of ranges.
   *
   * @param {number} nr
   * @param {byteArray[]} ranges
   * @returns {bolean}
   */
  checkRanges(nr, ranges) {
    for (let i = ranges.length - 1; i >= 0; i--) {
      if (!ranges[i].length) continue;
      if (ranges[i].length === 1 && nr === ranges[i][0]) return true;
      if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1])
        return true;
    }
    return false;
  }

  /**
   * Adds soft line breaks to a string.
   * Lines can't be longer that 76 + <CR><LF> = 78 bytes
   * http://tools.ietf.org/html/rfc2045#section-6.7
   *
   * @param {string} str
   * @param {string} encoding
   * @returns {string}
   */
  addSoftLinebreaks(str, encoding) {
    const lineLengthMax = 76;

    encoding = (encoding || "base64")
      .toString()
      .toLowerCase()
      .trim();

    if (encoding === "qp") {
      return this.addQPSoftLinebreaks(str, lineLengthMax);
    } else {
      return this.addBase64SoftLinebreaks(str, lineLengthMax);
    }
  }

  /**
   * Adds soft line breaks to a base64 string.
   *
   * @param {string} base64EncodedStr
   * @param {number} lineLengthMax
   * @returns {string}
   */
  addBase64SoftLinebreaks(base64EncodedStr, lineLengthMax) {
    base64EncodedStr = (base64EncodedStr || "").toString().trim();
    return base64EncodedStr
      .replace(new RegExp(".{" + lineLengthMax + "}", "g"), "$&\r\n")
      .trim();
  }

  /**
   * Adds soft line breaks to a quoted printable string.
   *
   * @param {string} mimeEncodedStr
   * @param {number} lineLengthMax
   * @returns {string}
   */
  addQPSoftLinebreaks(mimeEncodedStr, lineLengthMax) {
    let pos = 0,
      len = mimeEncodedStr.length,
      match,
      code,
      line,
      lineMargin = Math.floor(lineLengthMax / 3),
      result = "";

    // insert soft linebreaks where needed
    while (pos < len) {
      line = mimeEncodedStr.substr(pos, lineLengthMax);
      if ((match = line.match(/\r\n/))) {
        line = line.substr(0, match.index + match[0].length);
        result += line;
        pos += line.length;
        continue;
      }

      if (line.substr(-1) === "\n") {
        // nothing to change here
        result += line;
        pos += line.length;
        continue;
      } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
        // truncate to nearest line break
        line = line.substr(0, line.length - (match[0].length - 1));
        result += line;
        pos += line.length;
        continue;
      } else if (
        line.length > lineLengthMax - lineMargin &&
        (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))
      ) {
        // truncate to nearest space
        line = line.substr(0, line.length - (match[0].length - 1));
      } else if (line.substr(-1) === "\r") {
        line = line.substr(0, line.length - 1);
      } else {
        if (line.match(/=[\da-f]{0,2}$/i)) {
          // push incomplete encoding sequences to the next line
          if ((match = line.match(/=[\da-f]{0,1}$/i))) {
            line = line.substr(0, line.length - match[0].length);
          }

          // ensure that utf-8 sequences are not split
          while (
            line.length > 3 &&
            line.length < len - pos &&
            !line.match(/^(?:=[\da-f]{2}){1,4}$/i) &&
            (match = line.match(/=[\da-f]{2}$/gi))
          ) {
            code = parseInt(match[0].substr(1, 2), 16);
            if (code < 128) {
              break;
            }

            line = line.substr(0, line.length - 3);

            if (code >= 0xc0) {
              break;
            }
          }
        }
      }

      if (pos + line.length < len && line.substr(-1) !== "\n") {
        if (line.length === 76 && line.match(/=[\da-f]{2}$/i)) {
          line = line.substr(0, line.length - 3);
        } else if (line.length === 76) {
          line = line.substr(0, line.length - 1);
        }
        pos += line.length;
        line += "=\r\n";
      } else {
        pos += line.length;
      }

      result += line;
    }

    return result;
  }
}
