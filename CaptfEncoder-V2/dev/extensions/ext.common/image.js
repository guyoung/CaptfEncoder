const Jimp = require("jimp");

async function createBase64Image(src) {
    return new Promise((resolve, reject) => {
        const matches = src.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) {
            reject(new Error("Invalid base64 image"));
        }
        const mime = matches[1]
        const buffer = Buffer.from(matches[2], "base64");

        Jimp.read(buffer, function (err, image) {
            if (err) {
                reject(err);
            }

            return resolve(image)
        });

    });
}

module.exports = {
    createBase64Image: createBase64Image,

}