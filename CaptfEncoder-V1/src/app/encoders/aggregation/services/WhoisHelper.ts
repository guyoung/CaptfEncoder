var axios = require("axios");

export class WhoisHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const domainOrIp = input;

    try {
      var result = await WhoisHelper.get(domainOrIp);

      if (result && result.data) {   
        return result.data;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(domainOrIp) {
    return axios.get(`http://api.hackertarget.com/whois/?q=${domainOrIp}`,  {timeout: 1000 * 60});
  }
}
