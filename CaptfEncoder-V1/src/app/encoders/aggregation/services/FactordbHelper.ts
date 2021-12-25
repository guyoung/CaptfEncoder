var axios = require("axios");

export class FactordbHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const number = input;

    try {
      var result = await FactordbHelper.get(number);

      if (result && result.data && result.data.factors) {
        var data = result.data.factors;
        
        var numberList: string[] = [];
        data.forEach(d => {         
            const t = new Number(d[1]);

            for(var i=1; i <= t; i++){
                numberList.push(d[0]);
            }
        });

        return number + ' = ' + numberList.join(' × ');
      }

      return;
    } catch (error) {
      return "";
    }
  }

  private static get(number) {
    return axios.get(`http://factordb.com/api?query=${number}`);
  }
  
}
