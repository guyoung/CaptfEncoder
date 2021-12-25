var axios = require("axios");

export class TaobaoIpHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const ip = input;

    try {
      var result = await TaobaoIpHelper.get(ip);

      if (result && result.data && result.data.data) {
        var data = result.data.data;      
        var lines = "";
        Object.keys(data).forEach(function(key) {
          lines += key + ": ";
          lines += data[key] + "\n";
        });

        return lines;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(ip) {
    return axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`);
  }
}
