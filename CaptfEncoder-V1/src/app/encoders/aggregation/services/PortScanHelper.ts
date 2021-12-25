var axios = require("axios");

export class PortScanHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const host = input;

    try {
      var result = await PortScanHelper.get(host);

      if (result && result.data) {   
        return result.data;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(host) {
    return axios.get(`https://api.hackertarget.com/nmap/?q=${host}`,  {timeout: 1000 * 60 * 2});
  }
}
