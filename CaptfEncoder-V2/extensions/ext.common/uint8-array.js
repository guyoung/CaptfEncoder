function arrayToHex(arr) {
    var hex = "";
    for (var i = 0; i < arr.length; ++i) {
        var value = arr[i].toString(16);
        if (value.length == 1) value = "0" + value;
        hex += value;
    }
    return hex;
}

function arrayFromHex(str) {
    let arr = new Uint8Array(str.length / 2);
    for (let i = 0; i < str.length; i += 2) {
        arr[i / 2] = parseInt(str.substr(i, 2), 16);
    }
    return arr;
}

function arrayToBase64(arr, padding) {
    // btoa expects a "raw string" where each character is interpreted as a byte.
    let str2 = strFromCharCode(arr);
    padding = padding == undefined ? true : padding;
    //let base64 = btoa(str2)
    let base64 = Buffer.from(str2).toString('base64')
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    return padding ? base64 : base64.replace(/=*$/, "");
}

function arrayFromBase64(str) {
    // atob creates a "raw string" where each character is interpreted as a byte.
    //let bytes = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
    let str2 = Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), 'base64').toString();
    let result = new Uint8Array(str2.length);
    for (let i = 0; i < str2.length; ++i) {
        result[i] = str2.charCodeAt(i);
    }
    return result;
}

function arrayFromBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return view;
}


function strFromCharCode(array) {
    let max = 16000;
    let ret = "";
    for (let i = 0; i < array.length; i += max) {
        let subArray = array.subarray(i, i + max);
        ret += String.fromCharCode.apply(null, subArray);
    }

    return ret;
}


module.exports = {
    arrayToHex: arrayToHex,
    arrayFromHex: arrayFromHex,
    arrayToBase64: arrayToBase64,
    arrayFromBase64: arrayFromBase64,
    arrayFromBuffer: arrayFromBuffer

}