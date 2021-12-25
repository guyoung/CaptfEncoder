var axios = require("axios");
var cheerio = require("cheerio");

export class WhatCmsHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const host = input;

    try {
      var result = await WhatCmsHelper.get(host);

      if (result && result.data) {
        let $ = cheerio.load(result.data);


        if ($("body").has(".panel-success").length > 0) {          
          $ = cheerio.load($(".panel-success").html());
          let lines = "";

          $("a[class=nowrap]").each(function(i, elem) { 
              
            lines += $(this).text() + "\n";
          });

          return lines;
        }
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(host) {
    return axios.get(`https://whatcms.org/?s=${host}`, {
      timeout: 1000 * 60 * 2
    });
  }
}
