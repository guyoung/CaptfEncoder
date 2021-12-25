var axios = require("axios");
const key = "1226d5e31753f4f76107e9ddbf8af36887b344513a7818375d722350730e1c56adfe12";

/*
{
  "request": "https://whatcms.org/APIEndpoint?key=1226d5e31753f4f76107e9ddbf8af36887b344513a7818375d722350730e1c56adfe12&url=en.wikipedia.org",
  "request_web": "https://whatcms.org/?s=en.wikipedia.org",
  "result": {
    "code": 200,
    "msg": "Success",
    "id": 8,
    "name": "MediaWiki",
    "confidence": "high",
    "version": "1.32.0",
    "cms_url": "https://whatcms.org/c/MediaWiki"
  }
}
*/

export class WhatCmsHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const host = input;

    try {
      var result = await WhatCmsHelper.get(host);

      if (result && result.data) {
        var josn = JSON.parse(result.data);
    
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(host) {
    return axios.get(`https://whatcms.org/APIEndpoint?key=${key}&url=${host}`, {
      timeout: 1000 * 60 * 2
    });
  }
}
