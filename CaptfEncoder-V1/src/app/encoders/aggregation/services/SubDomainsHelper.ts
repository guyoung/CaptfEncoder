var axios = require("axios");
var cheerio = require("cheerio");

export class SubDomainsHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const domain = input;

    try {
      var result = await SubDomainsHelper.get(domain);

      if (result && result.data) {   
        const $ = cheerio.load(result.data);

        let lines = '';

        $('.aggregated-link').each(function(i, elem) {
          const url = $(this).attr('href');
          const subDomain = url.replace('http://', '').replace('https://', '');
          lines += subDomain + '\n';
         
        });

        return lines;

      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(domain) {
    return axios.get(`https://findsubdomains.com/subdomains-of/${domain}`,  {timeout: 1000 * 60 * 2});
  }
}
