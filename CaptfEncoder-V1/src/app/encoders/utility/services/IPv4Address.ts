import { IPAddress } from "./IPAddress";

const ipv4Part = "(0?\\d+|0x[a-f0-9]+)";

const ipv4Regexes = {
  fourOctet: new RegExp(
    "^" +
      ipv4Part +
      "\\." +
      ipv4Part +
      "\\." +
      ipv4Part +
      "\\." +
      ipv4Part +
      "$",
    "i"
  ),
  longValue: new RegExp("^" + ipv4Part + "$", "i")
};

export class IPv4Address extends IPAddress {
  private _octets: number[];

  public constructor(octets: number[]) {
    super();

    var octet, _i, _len;

    if (octets.length !== 4) {
      throw new Error("ipaddr: ipv4 octet count should be 4");
    }

    for (_i = 0, _len = octets.length; _i < _len; _i++) {
      octet = octets[_i];
      if (!(0 <= octet && octet <= 255)) {
        throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
      }
    }

    this._octets = octets;
  }

  public kind() {
    return "ipv4";
  }

  public toString() {
    return this._octets.join(".");
  }

  public toNormalizedString = function() {
    return this.toString();
  };

  public getByteArray(): number[] {
    return this._octets.slice(0);
  }

  static isLoopback() {
    return false;
  }

  static parse(address: string): IPv4Address {
    var match, parseIntAuto, part, shift, value;

    parseIntAuto = function(text) {
      if (text[0] === "0" && text[1] !== "x") {
        return parseInt(text, 8);
      } else {
        return parseInt(text);
      }
    };

    if ((match = address.match(ipv4Regexes.fourOctet))) {
      let _i, _len;
      let _ref = match.slice(1, 6);
      let _results: number[] = [];

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        _results.push(parseIntAuto(part));
      }

      return new IPv4Address(_results);
    } else if ((match = address.match(ipv4Regexes.longValue))) {
      value = parseIntAuto(match[1]);

      if (value > 0xffffffff || value < 0) {
        throw new Error("ipaddr: address outside defined range");
      }

      let _i;
      let _results: number[] = [];
      for (shift = _i = 0; _i <= 24; shift = _i += 8) {
        _results.push((value >> shift) & 0xff);
      }

      return new IPv4Address(_results.reverse());
    } else {
      return null;
    }
  }

  static fromByteArray(bArray: number[]): IPv4Address {
    return null;
  }

  static networkAddressFromCIDR(cidr: string): IPv4Address {
    return null;
  }

  static broadcastAddressFromCIDR(cidr: string): IPv4Address {
    return null;
  }

  static subnetMaskFromPrefixLength(length: number) {}
}
