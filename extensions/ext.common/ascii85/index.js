/**
 * Copyright 2015 Huan Du. All rights reserved.
 * Licensed under the MIT license that can be found in the LICENSE file.
 */
 'use strict';

 // Buffer api is changed since v6.0.0. this wrapper is designed to leverage new
 // api features if possible without breaking old node.
 //
 // it's not a completed polyfill implementation. i just do necessary shims for this
 // package only.
 var _BufferFrom = Buffer.from || function() {
   switch (arguments.length) {
     case 1: return new Buffer(arguments[0]);
     case 2: return new Buffer(arguments[0], arguments[1]);
     case 3: return new Buffer(arguments[0], arguments[1], arguments[2]);
     default: throw new Exception('unexpected call.');
   }
 };
 var _BufferAlloc = Buffer.alloc || function(size, fill, encoding) {
   var buf = new Buffer(size);
 
   if (fill !== undefined) {
     if (typeof encoding === "string") {
       buf.fill(fill, encoding);
     } else {
       buf.fill(fill);
     }
   }
 
   return buf;
 };
 var _BufferAllocUnsafe = Buffer.allocUnsafe || function(size) {
   return new Buffer(size);
 };
 var _NewUint8Array = (function() {
   if (typeof Uint8Array === 'undefined') {
     return function(size) {
       return new Array(size);
     };
   } else {
     return function(size) {
       return new Uint8Array(size);
     }
   }
 })();
 
 var ASCII85_BASE = 85;
 var ASCII85_CODE_START = 33;
 var ASCII85_CODE_END = ASCII85_CODE_START + ASCII85_BASE;
 var ASCII85_NULL = String.fromCharCode(0);
 var ASCII85_NULL_STRING = ASCII85_NULL + ASCII85_NULL + ASCII85_NULL + ASCII85_NULL;
 var ASCII85_ZERO = 'z';
 var ASCII85_ZERO_VALUE = ASCII85_ZERO.charCodeAt(0);
 var ASCII85_PADDING_VALUE = 'u'.charCodeAt(0);
 var ASCII85_ENCODING_GROUP_LENGTH = 4;
 var ASCII85_DECODING_GROUP_LENGTH = 5;
 var ASCII85_BLOCK_START = '<~';
 var ASCII85_BLOCK_START_LENGTH = ASCII85_BLOCK_START.length;
 var ASCII85_BLOCK_START_VALUE = _BufferFrom(ASCII85_BLOCK_START).readUInt16BE(0);
 var ASCII85_BLOCK_END = '~>';
 var ASCII85_BLOCK_END_LENGTH = ASCII85_BLOCK_END.length;
 var ASCII85_BLOCK_END_VALUE = _BufferFrom(ASCII85_BLOCK_END).readUInt16BE(0);
 var ASCII85_GROUP_SPACE = 'y';
 var ASCII85_GROUP_SPACE_VALUE = ASCII85_GROUP_SPACE.charCodeAt(0);
 var ASCII85_GROUP_SPACE_CODE = 0x20202020;
 var ASCII85_GROUP_SPACE_STRING = '    ';
 
 var ASCII85_DEFAULT_ENCODING_TABLE = (function() {
   var arr = new Array(ASCII85_BASE);
   var i;
 
   for (i = 0; i < ASCII85_BASE; i++) {
     arr[i] = String.fromCharCode(ASCII85_CODE_START + i);
   }
 
   return arr;
 })();
 
 var ASCII85_DEFAULT_DECODING_TABLE = (function() {
   var arr = new Array(1 << 8);
   var i;
 
   for (i = 0; i < ASCII85_BASE; i++) {
     arr[ASCII85_CODE_START + i] = i;
   }
 
   return arr;
 })();
 
 /**
  * Create a new Ascii85 codec.
  * @param {Array|Object} [options] is a list of chars for encoding or an option object.
  *
  * Supported options are listed in Ascii85#encode document.
  * @note Only encoding table is supported. Decoding table will be generated automatically
  * based on encoding table.
  */
 function Ascii85(options) {
   var decodingTable;
 
   options = options || {};
   this._options = options;
 
   // generate encoding and decoding table.
   if (Array.isArray(options.table)) {
     decodingTable = [];
     options.table.forEach(function(v, i) {
       decodingTable[v.charCodeAt(0)] = i;
     });
 
     options.encodingTable = options.table;
     options.decodingTable = decodingTable;
   }
 }
 
 var defaultCodec = module.exports = new Ascii85();
 
 /**
  * Encode a binary data to ascii85 string.
  * @param {String|Buffer} data is a string or Buffer.
  * @param {Array|Object} [options] is a list of chars for encoding or an option object.
  *                                 If no options is provided, encode uses standard ascii85
  *                                 char table to encode data.
  *
  * Supported options are following.
  *   - table: Table for encoding. Default is ASCII85_DEFAULT_ENCODING_TABLE.
  *   - delimiter: Add '<~' and '~>' to output. Default is false.
  *   - groupSpace: Support group of all spaces in btoa 4.2. Default is false.
  */
 Ascii85.prototype.encode = function(data, options) {
   var bytes = _NewUint8Array(5);
   var buf = data;
   var defOptions = this._options;
   var output, offset, table, delimiter, groupSpace, digits, cur, i, j, r, b, len, padding;
 
   if (typeof buf === "string") {
     buf = _BufferFrom(buf, 'binary');
   } else if (!(buf instanceof Buffer)) {
     buf = _BufferFrom(buf);
   }
 
   // prepare options.
   options = options || {};
 
   if (Array.isArray(options)) {
     table = options;
     delimiter = defOptions.delimiter || false;
     groupSpace = defOptions.groupSpace || false;
   } else {
     table = options.table || defOptions.encodingTable || ASCII85_DEFAULT_ENCODING_TABLE;
 
     if (options.delimiter === undefined) {
       delimiter = defOptions.delimiter || false;
     } else {
       delimiter = !!options.delimiter;
     }
 
     if (options.groupSpace === undefined) {
       groupSpace = defOptions.groupSpace || false;
     } else {
       groupSpace = !!options.groupSpace;
     }
   }
 
   // estimate output length and alloc buffer for it.
   offset = 0;
   len = Math.ceil(buf.length * ASCII85_DECODING_GROUP_LENGTH / ASCII85_ENCODING_GROUP_LENGTH) +
         ASCII85_ENCODING_GROUP_LENGTH +
         (delimiter? ASCII85_BLOCK_START_LENGTH + ASCII85_BLOCK_END_LENGTH: 0);
   output = _BufferAllocUnsafe(len);
 
   if (delimiter) {
     offset += output.write(ASCII85_BLOCK_START, offset);
   }
 
   // iterate over all data bytes.
   for (i = digits = cur = 0, len = buf.length; i < len; i++) {
     b = buf.readUInt8(i);
 
     cur *= 1 << 8;
     cur += b;
     digits++;
 
     if (digits % ASCII85_ENCODING_GROUP_LENGTH) {
       continue;
     }
 
     if (groupSpace && cur === ASCII85_GROUP_SPACE_CODE) {
       offset += output.write(ASCII85_GROUP_SPACE, offset);
     } else if (cur) {
       for (j = ASCII85_ENCODING_GROUP_LENGTH; j >= 0; j--) {
         r = cur % ASCII85_BASE;
         bytes[j] = r;
         cur = (cur - r) / ASCII85_BASE;
       }
 
       for (j = 0; j < ASCII85_DECODING_GROUP_LENGTH; j++) {
         offset += output.write(table[bytes[j]], offset);
       }
     } else {
       offset += output.write(ASCII85_ZERO, offset);
     }
 
     cur = 0;
     digits = 0;
   }
 
   // add padding for remaining bytes.
   if (digits) {
     if (cur) {
       padding = ASCII85_ENCODING_GROUP_LENGTH - digits;
 
       for (i = ASCII85_ENCODING_GROUP_LENGTH - digits; i > 0; i--) {
         cur *= 1 << 8;
       }
 
       for (j = ASCII85_ENCODING_GROUP_LENGTH; j >= 0; j--) {
         r = cur % ASCII85_BASE;
         bytes[j] = r;
         cur = (cur - r) / ASCII85_BASE;
       }
 
       for (j = 0; j < ASCII85_DECODING_GROUP_LENGTH; j++) {
         offset += output.write(table[bytes[j]], offset);
       }
 
       offset -= padding;
     } else {
       // If remaining bytes are zero, need to insert '!' instead of 'z'.
       // This is a special case.
       for (i = 0; i < digits + 1; i++) {
         offset += output.write(table[0], offset);
       }
     }
   }
 
   if (delimiter) {
     offset += output.write(ASCII85_BLOCK_END, offset);
   }
 
   return output.slice(0, offset);
 };
 
 /**
  * Decode a string to binary data.
  * @param {String|Buffer} data is a string or Buffer.
  * @param {Array|Object} [table] is a sparse array to map char code and decoded value for decoding.
  *                               Default is standard table.
  */
 Ascii85.prototype.decode = function(str, table) {
   var defOptions = this._options;
   var buf = str;
   var enableZero = true;
   var enableGroupSpace = true;
   var output, offset, digits, cur, i, c, t, len, padding;
 
   table = table || defOptions.decodingTable || ASCII85_DEFAULT_DECODING_TABLE;
 
   // convert a key/value format char map to code array.
   if (!Array.isArray(table)) {
     table = table.table || table;
 
     if (!Array.isArray(table)) {
       t = [];
       Object.keys(table).forEach(function(v) {
         t[v.charCodeAt(0)] = table[v];
       });
       table = t;
     }
   }
 
   enableZero = !table[ASCII85_ZERO_VALUE];
   enableGroupSpace = !table[ASCII85_GROUP_SPACE_VALUE];
 
   if (!(buf instanceof Buffer)) {
     buf = _BufferFrom(buf);
   }
 
   // estimate output length and alloc buffer for it.
   t = 0;
 
   if (enableZero || enableGroupSpace) {
     for (i = 0, len = buf.length; i < len; i++) {
       c = buf.readUInt8(i);
 
       if (enableZero && c === ASCII85_ZERO_VALUE) {
         t++;
       }
 
       if (enableGroupSpace && c === ASCII85_GROUP_SPACE_VALUE) {
         t++;
       }
     }
   }
 
   offset = 0;
   len = Math.ceil(buf.length * ASCII85_ENCODING_GROUP_LENGTH / ASCII85_DECODING_GROUP_LENGTH) +
         t * ASCII85_ENCODING_GROUP_LENGTH +
         ASCII85_DECODING_GROUP_LENGTH;
   output = _BufferAllocUnsafe(len);
 
   // if str starts with delimiter ('<~'), it must end with '~>'.
   if (buf.length >= ASCII85_BLOCK_START_LENGTH + ASCII85_BLOCK_END_LENGTH && buf.readUInt16BE(0) === ASCII85_BLOCK_START_VALUE) {
     for (i = buf.length - ASCII85_BLOCK_END_LENGTH; i > ASCII85_BLOCK_START_LENGTH; i--) {
       if (buf.readUInt16BE(i) === ASCII85_BLOCK_END_VALUE) {
         break;
       }
     }
 
     if (i <= ASCII85_BLOCK_START_LENGTH) {
       throw new Error('Invalid ascii85 string delimiter pair.');
     }
 
     buf = buf.slice(ASCII85_BLOCK_START_LENGTH, i);
   }
 
   for (i = digits = cur = 0, len = buf.length; i < len; i++) {
     c = buf.readUInt8(i);
 
     if (enableZero && c === ASCII85_ZERO_VALUE) {
       offset += output.write(ASCII85_NULL_STRING, offset);
       continue;
     }
 
     if (enableGroupSpace && c === ASCII85_GROUP_SPACE_VALUE) {
       offset += output.write(ASCII85_GROUP_SPACE_STRING, offset);
       continue;
     }
 
     if (table[c] === undefined) {
       continue;
     }
 
     cur *= ASCII85_BASE;
     cur += table[c];
     digits++;
 
     if (digits % ASCII85_DECODING_GROUP_LENGTH) {
       continue;
     }
 
     offset = output.writeUInt32BE(cur, offset);
     cur = 0;
     digits = 0;
   }
 
   if (digits) {
     padding = ASCII85_DECODING_GROUP_LENGTH - digits;
 
     for (i = 0; i < padding; i++) {
       cur *= ASCII85_BASE;
       cur += ASCII85_BASE - 1;
     }
 
     for (i = 3, len = padding - 1; i > len; i--) {
       offset = output.writeUInt8((cur >>> (i * 8)) & 0xFF, offset);
     }
   }
 
   return output.slice(0, offset);
 };
 
 /**
  * Ascii85 for ZeroMQ which uses a different codec table.
  */
 defaultCodec.ZeroMQ = new Ascii85({
   table: [
     '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
     '.', '-', ':', '+', '=', '^', '!', '/', '*', '?', '&', '<', '>', '(', ')', '[', ']', '{', '}', '@', '%', '$', '#'
   ]
 });
 
 /**
  * Ascii85 for PostScript which always uses delimiter for encoding.
  */
 defaultCodec.PostScript = new Ascii85({
   delimiter: true
 });
 
 /**
  * Ascii85 codec constructor.
  */
 defaultCodec.Ascii85 = Ascii85;