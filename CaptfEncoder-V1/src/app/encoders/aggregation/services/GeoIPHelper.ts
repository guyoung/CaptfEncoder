var axios = require("axios");

export class GeoIPHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const ip = input;

    try {
      var result = await GeoIPHelper.get(ip);

      if (result && result.data) {   
        return result.data;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(ip) {
    return axios.get(`https://api.hackertarget.com/geoip/?q=${ip}`,  {timeout: 1000 * 60 * 2});
  }
}
