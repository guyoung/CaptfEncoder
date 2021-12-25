var axios = require("axios");

export class OphcrackHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const hash = input;

    try {
      var result = await OphcrackHelper.post(hash);    

      if (result && result.data && result.data.msg) {
        return result.data.msg;
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static post(hash) {
    return axios.post(`http://www.objectif-securite.ch/demo.php/crack`, 
    {
      value: hash
    });
  }
  
}
