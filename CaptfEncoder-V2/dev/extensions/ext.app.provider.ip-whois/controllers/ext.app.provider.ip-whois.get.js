const cheerio = require("cheerio");

const defaultValue = require('../../ext.common/default-value');
const { get } = require('../../ext.common/http');

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input) {
      const provider = defaultValue(options.provider, '');

      if (provider === 'radb.net') {
        const result = await get(`https://www.radb.net/query?advanced_query=1&keywords=${input}&-T+option=&ip_option=&-i=1&-i+option=origin`);

        if (result && result.data) {
          const $ = cheerio.load(result.data);

          $('pre.query-result > code').map((_idx, el) => {
            output = $(el).text();
          })
        }
      }

    }

    return {
      success: true,
      output: output,
    };
  }
  catch (err) {
    return {
      success: false,
      output: '',
      message: err.message
    };
  }

}




