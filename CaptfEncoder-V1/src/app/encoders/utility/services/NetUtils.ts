const ip = require("ip");
const ping = require("ping");
const nslookup = require("nslookup");

export class NetUtils {
  public static getIpSubnet(ipAddress: string, subnetMask: string) {
    const result: any = ip.subnet(ipAddress, subnetMask);

    let lines: string = "";

    for (var key in result) {
      if (typeof result[key] === "string" || typeof result[key] === "number") {
        lines += key + ": ";
        lines += result[key] + "\n";
      }
    }

    return lines;
  }

  public static getCidrSubnet(ipAddress: string) {
    const result: any = ip.cidrSubnet(ipAddress);

    let lines: string = "";

    for (var key in result) {
      if (typeof result[key] === "string" || typeof result[key] === "number") {
        lines += key + ": ";
        lines += result[key] + "\n";
      }
    }
    return lines;
  }

  public static async ping(host: string) {
    const result: any = await ping.promise.probe(host);

    if (result instanceof Object) {
      let lines: string = "";

      for (var key in result) {
        if (key == "alive") {
          lines += key + ": ";
          lines += result[key] + "\n";
        } else {
        }
      }

      return lines;
    }
  }

  public static async nslookup(
    domain: string,
    nameServer: string,
    type: string
  ) {
    const result: any = await NetUtils._nslookup(domain, nameServer, type);

    if (result instanceof Array) {
      return result.join("\n");
    }

    return result;
  }

  private static _nslookup(domain: string, nameServer: string, type: string) {
    return new Promise<string>(function(resolve, reject) {
      nslookup(domain)
        .server(nameServer) // default is 8.8.8.8
        .type(type) // default is 'a'
        .timeout(60 * 1000) // default is 3 * 1000 ms
        .end(function(err, addr) {
          if (!err) {
            resolve(addr);
          } else {
            reject(err);
          }
        });
    });
  }
}
