var mimelib = require('mime-types')


export class MimeUtils {

    public static getMimeType(extension:string): string {      
        return mimelib.lookup(extension);
    }

    public static getExtension(mime:string): string {
        return mimelib.extension(mime);
    }
}