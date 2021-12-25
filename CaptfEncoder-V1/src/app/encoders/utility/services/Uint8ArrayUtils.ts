export class Uint8ArrayUtils {
  public static arrayToHex(arr) {
    var hex = "";
    for (var i = 0; i < arr.length; ++i) {
      var value = arr[i].toString(16);
      if (value.length == 1) value = "0" + value;
      hex += value;
    }
    return hex;
  }

  public static arrayFromHex(str) {
    let arr = new Uint8Array(str.length / 2);
    for (let i = 0; i < str.length; i += 2) {
      arr[i / 2] = parseInt(str.substr(i, 2), 16);
    }
    return arr;
  }

  public static arraytoBase64(arr, padding?) {
    // btoa expects a "raw string" where each character is interpreted as a byte.
    let bytes = Uint8ArrayUtils.strFromCharCode(arr);
    padding = padding == undefined ? true : padding;
    let base64 = btoa(bytes)
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    return padding ? base64 : base64.replace(/=*$/, "");
  }

  public static arrayFromBase64(str) {
    // atob creates a "raw string" where each character is interpreted as a byte.
    let bytes = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
    let result = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; ++i) {
      result[i] = bytes.charCodeAt(i);
    }
    return result;
  }

  public static strFromCharCode(array) {
    let max = 16000;
    let ret = "";
    for (let i = 0; i < array.length; i += max) {
      let subArray = array.subarray(i, i + max);
      ret += String.fromCharCode.apply(null, subArray);
    }

    return ret;
  }

  public static arrayFromBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return view;
  }
}
