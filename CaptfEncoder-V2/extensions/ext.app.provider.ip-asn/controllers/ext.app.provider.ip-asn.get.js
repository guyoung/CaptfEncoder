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

          let items = [];

          $('pre.query-result > code').map((_idx, el) => {
            const whoisRegex = /^([a-z0-9-]+):\s+(.*)$/gm;
            const rrecord = $(el).text().trim();
            const newPrefix = {};

            let rematch;           

            while ((rematch = whoisRegex.exec(rrecord)) !== null) {
              const key = rematch[1]
              const value = rematch[2]

              if (key === "route" || key === "route6") {
                newPrefix.route = value
                continue
              }
              if (key === "mnt-by") {
                newPrefix.mntBy = value
                continue
              }
              if (["descr", "origin", "source"].includes(key)) {
                newPrefix[key] = value
                continue
              }
            }

            if (newPrefix.route) {
              items.push({
                route: newPrefix.route,
                mntBy: newPrefix.mntBy,
                descr: newPrefix.descr,
                origin: newPrefix.origin,
                source: newPrefix.source
              })
            }
          })

          output = JSON.stringify(items, null ,2);

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




