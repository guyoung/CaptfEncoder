import BigNumber from "bignumber.js";

export class BaseUtils {

    public static fromBase(input: string, radix:number): string {
        if (radix < 2 || radix > 36) {
            throw "Error: Radix argument must be between 2 and 36";
        }

        const number = input.replace(/\s/g, "").split(".");
        let result = new BigNumber(number[0], radix).toNumber() || 0;

        if (number.length === 1) {
            return result.toString();
        }

        // Fractional part
        for (let i = 0; i < number[1].length; i++) {
            const digit = new BigNumber(number[1][i], radix);
            result += digit.div(Math.pow(radix, i+1)).toNumber();
        }

        return result.toString();       
    }

    public static toBase(input: string, radix:number) {

        const number = new BigNumber(input)

        if (!input) {
            throw "Error: Input must be a number";
        }
     
        if (radix < 2 || radix > 36) {
            throw "Error: Radix argument must be between 2 and 36";
        }
        return number.toString(radix);
    }
}

