const defaultValue = require('../../ext.common/default-value');
const axios = require('axios');

const cheerio = require("cheerio");

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input && input.length > 0) {
      const provider = defaultValue(options.provider, '');


      if (provider === 'crt.sh') {

        const http = axios.create({
          timeout: 1000 * 30,
          headers: { 'X-Custom-Header': 'Get it' }
        });

        let res = await http.request({
          method: 'get',
          url: `https://crt.sh/?q=${input}`,

        });

        if (res && res.data) {
          let $ = cheerio.load(res.data);
          const table = $("td.outer").eq(1).children().first();
          let items = [];

          const rows = $(table).find('tr')
          
          rows.map((_idx, el) => {
           
            //console.log($(el).children())
            //console.log( $(el).children().eq(0))
            if (_idx > 0) {

              const item = {
                id: $($(el).children().get(0)).text(),
              
                loggedAt: $($(el).children().get(1)).text(),
                notBefore: $($(el).children().get(2)).text(),
                notAfter: $($(el).children().get(3)).text(),
                commonName: $($(el).children().get(4)).text(),
                matchingIdentities: $($(el).children().get(5)).text(),
                issuerName: $($(el).children().get(6)).text(),
              
              }

              items.push(item)
            }
          })       

          output = JSON.stringify(items, null,  2);

        }



      }

    }

    return {
      success: true,
      output: output,
    };
  }
  catch (err) {
    console.log(err)
    return {
      success: false,
      output: '',
      message: err.message
    };
  }

}




