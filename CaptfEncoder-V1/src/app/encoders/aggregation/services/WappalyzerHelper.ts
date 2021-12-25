var axios = require("axios");

export class WappalyzerHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const url = input;

    try {
      var result = await WappalyzerHelper.get(url);

      if (result && result.data) {   
       
        if (result.data instanceof Array) {
          let lines = '';
          for(var item of result.data) {
              lines += item.name+'\n';
          }
          return lines;
        }
        if (typeof result.data === 'string') {
          return result.data;
        }
        
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(url) {
    return axios.get(`https://api.wappalyzer.com/lookup-basic/beta/?url=${url}`,  {timeout: 1000 * 60 * 2});
  }
}
