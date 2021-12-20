// 进制转换

const BigNumber = require('bignumber.js')

function convertTo(input, radix) {
    if (!input) {
        throw new Error("Input must be a number");
    }
    if (radix < 2 || radix > 36) {
        throw new Error("Radix argument must be between 2 and 36");
    }
    return input.toString(radix);
}


function convertFrom(input, radix) {
    if (radix < 2 || radix > 36) {
        throw new Error("Radix argument must be between 2 and 36");
    }

    let number = input.replace(/\s/g, "").split(".");
    let result = new BigNumber(number[0], radix) || new BigNumber(0);

    if (number.length === 1) return result;

    // Fractional part
    for (let i = 0; i < number[1].length; i++) {
        const digit = new BigNumber(number[1][i], radix);
        result = result.plus(digit.div(Math.pow(radix, i + 1)));
    }

    return result;
}

module.exports = {
    convertTo: convertTo,
    convertFrom: convertFrom
}