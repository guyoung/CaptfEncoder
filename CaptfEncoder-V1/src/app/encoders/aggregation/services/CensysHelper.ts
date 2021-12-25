var axios = require("axios");
var cheerio = require("cheerio");

export class CensysHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const ip = input;

    try {
      var result = await CensysHelper.get(ip);

      if (result && result.data) {   
        const $ = cheerio.load(result.data);

        var text = $('code').text();        
        var json = JSON.parse(text);        
        return JSON.stringify(json, null, 4);
        
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(ip) {
    return axios.get(`https://censys.io/ipv4/${ip}/raw`,  {timeout: 1000 * 60 * 2});
  }
}
