const axios = require("axios");
const key = 'C23OXE0bVMrul2YeqcL7zxb6jZ4pj2by'

export class ShodanHoneypotHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const ip = input;

    try {
      var result = await ShodanHoneypotHelper.get(ip);
      
      if (result) {   
        return result.data.toString();     
      }

      
    } catch (error) {
      return "";
    }
  }

  private static get(ip) {  
    return axios.get(`https://api.shodan.io/labs/honeyscore/${ip}?key=${key}`,  {timeout: 1000 * 60 * 2});
  }
}
