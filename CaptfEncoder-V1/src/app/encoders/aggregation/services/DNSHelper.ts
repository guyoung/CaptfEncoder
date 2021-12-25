var axios = require("axios");

export class DNSHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const domain = input;

    try {
      var result = await DNSHelper.get(domain);

      if (result && result.data) {   
        return result.data;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(domain) {
    return axios.get(`https://api.hackertarget.com/dnslookup/?q=${domain}`,  {timeout: 1000 * 60 * 2});
  }
}
