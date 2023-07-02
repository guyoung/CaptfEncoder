
const brunfaick = require('../ext.common/brunfaick/index');

function encode(input, options) {
    options = options || {};

    let map = [];
    let plus_map = [""];
    let minus_map = [""];

    for (let i = 1; i < 256; i++) {
        plus_map[i] = plus_map[i - 1] + "+";
        minus_map[i] = minus_map[i - 1] + "-";
    }

    // initial state for map[x][y]: go from x to y using +s or -s.
    for (let x = 0; x < 256; x++) {
        map[x] = [];

        for (var y = 0; y < 256; y++) {
            var delta = y - x;

            if (delta > 128) {
                delta -= 256;
            }
            if (delta < -128) {
                delta += 256;
            }

            if (delta >= 0) {
                map[x][y] = plus_map[delta];
            } else {
                map[x][y] = minus_map[-delta];
            }
        }
    }

    next(2, map, plus_map, minus_map);    

    const result = generate(input, map);

    return result;
}


function generate(str, map) {

    var last = 0,
        len = str.length,
        char_map,
        result = "",
        memory = [0],
        index = 0;

    for (var i = 0; i < len; i++) {
        var // unicode not supported
            chr = str.charCodeAt(i) & 255,
            options = [
                ">" + map[0][chr],
                //map[memory[index]][chr],
                map[last][chr]
            ],
            shortest;

        //if(index > 0)
        //{
        //	options.push("[-]<" + map[memory[index - 1]][chr]);
        //	//console.log(map[memory[index - 1]][chr].length - map[memory[index]][chr])
        //}    

        shortest = shortest_str(options);

        result += options[shortest] + ".";

        /*if(shortest === 0)
          {
              index++;
              memory[index] = chr;
          }
          else if(shortest === 1)
          {
              memory[index] = chr;
          }
          else 
          {
              memory[index] = 0;
              //memory.pop();
              index--;
              memory[index] = chr;
          }*/

        last = chr;
    }

    return result;
}

function next(repeat, map, minus_map, plus_map) {

    // multiplication by n/d
    for (var x = 0; x < 256; x++) {
        for (var d = 1; d < 40; d++) {
            var d_inv = inverse_mod(d, 256) & 255;

            for (var n = 1; n < 40; n++) {
                if (gcd(d, n) != 1) {
                    continue;
                }

                var j, i;

                if (d & 1) {
                    j = 0;
                    i = (x * d_inv) & 255;
                } else {
                    j = x;
                    for (i = 0; i < 256 && j; i++) {
                        j = (j - d) & 255;
                    }
                }

                if (j == 0) {
                    var y = (n * i) & 255;

                    if (d + n + 5 < map[x][y].length) {
                        map[x][y] =
                            "[" + minus_map[d] + ">" + plus_map[n] + "<]>";
                    }
                }

                if (d & 1) {
                    j = 0;
                    i = (-x * d_inv) & 255;
                } else {
                    j = x;
                    for (i = 0; i < 256 && j; i++) {
                        j = (j + d) & 255;
                    }
                }

                if (j == 0) {
                    var y = (-n * i) & 255;

                    if (d + n + 5 < map[x][y].length) {
                        map[x][y] =
                            "[" + plus_map[d] + ">" + minus_map[n] + "<]>";
                    }
                }
            }
        }
    }
    // combine number schemes
    var map_x, map_z, map_xz;

    for (var x = 0; x < 256; x++) {
        map_x = map[x];

        for (var z = 0; z < 256; z++) {
            map_z = map[z];
            map_xz = map_x[z];

            for (var y = 0; y < 256; y++) {
                if (map_xz.length + map_z[y].length < map_x[y].length) {
                    map_x[y] = map_xz + map_z[y];
                }
            }
        }
    }

    if (repeat >= 2) {
        next(repeat - 1, map, minus_map, plus_map);
    }
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function inverse_mod(n, m) {
    var inv1 = 1,
        inv2 = 0,
        tmp;

    while (m) {
        tmp = inv1;
        inv1 = inv2;
        inv2 = tmp - inv2 * ((n / m) | 0);

        tmp = n;
        n = m;
        m = tmp % m;
    }

    return inv1;
}

function shortest_str(arr) {
    var min = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i].length < arr[min].length) {
            min = i;
        }
    }

    return min;
}


function decode(input, options) {

    options = options || {};

    const result = brunfaick(input);

    return result;

}


module.exports = {
    encode: encode,
    decode: decode
}