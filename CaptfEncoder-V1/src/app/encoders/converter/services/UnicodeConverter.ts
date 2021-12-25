
const utf8 = require('utf8');
const utf7 = require('utf7');
var TextEncoder = require("text-encoding").TextEncoder;
var TextDecoder = require("text-encoding").TextDecoder;

// UTF-8（8-bit Unicode Transformation Format）
// UTF-7 (7-bit Unicode Transformation Format)
// UTF-16
// UTF-9

export class UnicodeConverter {

    public static utf8Encode(str: string): Uint8Array {
        return new TextEncoder('utf-8').encode(str);
    }

    public static utf8Decode(arr: Uint8Array): string {       
        return new TextDecoder('utf-8').decode(arr);
    }

    public static utf16leEncode(str: string): Uint8Array {
        return new TextEncoder('utf-16le').encode(str);
    }

    public static utf16leDecode(arr: Uint8Array): string {
        return new TextDecoder('utf-16le').decode(arr);
    }

    public static utf16beEncode(str: string): Uint8Array {
        return new TextEncoder('utf-16be').encode(str);
    }

    public static utf16beDecode(arr: Uint8Array): string {
        return new TextDecoder('utf-16be').decode(arr);
    }


    public static utf7Encode(str: string): string {
        return utf7.encode(str);
    }

    public static utf7Decode(str: string): string {
        return utf7.decode(str);
    }

    public static utf9Encode(str) {
        
    }

    public static utf9Decode(str) {
        
    }
}