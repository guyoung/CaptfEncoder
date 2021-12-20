const utf7 = require('utf7');
const TextEncoder = require("text-encoding").TextEncoder;
const TextDecoder = require("text-encoding").TextDecoder;


function utf8Encode(str) {
    return new TextEncoder('utf-8').encode(str);
}

function utf8Decode(arr) {       
    return new TextDecoder('utf-8').decode(arr);
}

function utf16leEncode(str) {
    return new TextEncoder('utf-16le').encode(str);
}

function utf16leDecode(arr) {
    return new TextDecoder('utf-16le').decode(arr);
}

function utf16beEncode(str) {
    return new TextEncoder('utf-16be').encode(str);
}

function utf16beDecode(arr) {
    return new TextDecoder('utf-16be').decode(arr);
}


function utf7Encode(str) {
    return utf7.encode(str);
}

function utf7Decode(str) {
    return utf7.decode(str);
}


module.exports = {
    utf8Encode: utf8Encode,
    utf8Decode: utf8Decode,
    utf16leEncode: utf16leEncode,
    utf16leDecode: utf16leDecode,
    utf16beEncode: utf16beEncode,
    utf16beDecode: utf16beDecode,
    utf7Encode: utf7Encode,
    utf7Decode: utf7Decode
}