var axios = require("axios");

export class ReverseIPHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const ip = input;

    try {
      var result = await ReverseIPHelper.get(ip);

      if (result && result.data) {   
        return result.data;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(ip) {
    return axios.get(`http://api.hackertarget.com/reverseiplookup/?q=${ip}`,  {timeout: 1000 * 60 * 2});
  }
}
