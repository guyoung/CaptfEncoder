import { IPAddress } from "./IPAddress";

export class IPv6Address extends IPAddress  {
  private _parts: number[];
  private _zoneId: number;

  constructor(parts, zoneId) {

    super();

    var i, part, _i, _j, _len, _ref;

    if (parts.length === 16) {
      this._parts = [];
      for (i = _i = 0; _i <= 14; i = _i += 2) {
        this._parts.push((parts[i] << 8) | parts[i + 1]);
      }
    } else if (parts.length === 8) {
      this._parts = parts;
    } else {
      throw new Error("ipaddr: ipv6 part count should be 8 or 16");
    }

    _ref = this._parts;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      part = _ref[_j];
      if (!(0 <= part && part <= 0xffff)) {
        throw new Error("ipaddr: ipv6 part should fit in 16 bits");
      }
    }
    if (zoneId) {
      this._zoneId = zoneId;
    }
  }
}
