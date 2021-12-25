export class BrainfuckEncoder {
  // map[x][y] bf code that transforms x to y
  map = [];
  plus_map = [""];
  minus_map = [""];
  repeat = 2;
  start;

  constructor(options) {
    options = options || {};

    for (var i = 1; i < 256; i++) {
      this.plus_map[i] = this.plus_map[i - 1] + "+";
      this.minus_map[i] = this.minus_map[i - 1] + "-";
    }

    // initial state for map[x][y]: go from x to y using +s or -s.
    for (var x = 0; x < 256; x++) {
      this.map[x] = [];

      for (var y = 0; y < 256; y++) {
        var delta = y - x;

        if (delta > 128) {
          delta -= 256;
        }
        if (delta < -128) {
          delta += 256;
        }

        if (delta >= 0) {
          this.map[x][y] = this.plus_map[delta];
        } else {
          this.map[x][y] = this.minus_map[-delta];
        }
      }
    }

    this.next();
  }

  public async handle(input) {
    if (!input || input.length < 1) {
      return;
    }

    const result = this.generate(input);

    return result;
  }

  generate(str) {
  
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
          ">" + this.map[0][chr],
          //map[memory[index]][chr],
          this.map[last][chr]
        ],
        shortest;

      //if(index > 0)
      //{
      //	options.push("[-]<" + map[memory[index - 1]][chr]);
      //	//console.log(map[memory[index - 1]][chr].length - map[memory[index]][chr])
      //}    

      shortest = this.shortest_str(options);   

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

  next() {
    // multiplication by n/d
    for (var x = 0; x < 256; x++) {
      for (var d = 1; d < 40; d++) {
        var d_inv = this.inverse_mod(d, 256) & 255;

        for (var n = 1; n < 40; n++) {
          if (this.gcd(d, n) != 1) {
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

            if (d + n + 5 < this.map[x][y].length) {
              this.map[x][y] =
                "[" + this.minus_map[d] + ">" + this.plus_map[n] + "<]>";
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

            if (d + n + 5 < this.map[x][y].length) {
              this.map[x][y] =
                "[" + this.plus_map[d] + ">" + this.minus_map[n] + "<]>";
            }
          }
        }
      }
    }
    // combine number schemes
    var map_x, map_z, map_xz;

    for (var x = 0; x < 256; x++) {
      map_x = this.map[x];

      for (var z = 0; z < 256; z++) {
        map_z = this.map[z];
        map_xz = map_x[z];

        for (var y = 0; y < 256; y++) {
          if (map_xz.length + map_z[y].length < map_x[y].length) {
            map_x[y] = map_xz + map_z[y];
          }
        }
      }
    }

    if (--this.repeat) {
      this.next();
    }
  }

  gcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return this.gcd(b, a % b);
    }
  }

  inverse_mod(n, m) {
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

  shortest_str(arr) {
    var min = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i].length < arr[min].length) {
        min = i;
      }
    }

    return min;
  }
}
