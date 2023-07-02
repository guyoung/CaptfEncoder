

const iconv = require('iconv-lite');
const axios = require("axios");
const cheerio = require("cheerio");

const defaultValue = require('../../ext.common/default-value');
const { get } = require('../../ext.common/http');

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input) {
      const provider = defaultValue(options.provider, '');

      if (provider === 'ip-api.com') {
        const result = await get(`http://ip-api.com/json/${input}`);

        if (result && result.data) {
          output = JSON.stringify(result.data, null, 2);
        }
      }

      else if (provider === 'ip.ws.126.net') {
        const result = await axios.get(`https://ip.ws.126.net/ipquery?ip=${input}`, {
          timeout: 1000 * 30,
          responseType: "arraybuffer"
        });
        if (result && result.data) {
          const buffer = Buffer.from(result.data);

          output = iconv.decode(buffer, 'gbk');
        }
      }

      else if (provider === 'censys.io-ipv4') {
        const result = await get(`https://censys.io/ipv4/${input}/raw`);
     
        if (result && result.data) {
          const $ = cheerio.load(result.data);

          const text = $('code').text();        
          const data = JSON.parse(text);        
          output = JSON.stringify(data, null, 4);
        }
      }
      if (provider === 'api.bgpview.io') {
        const result = await get(`https://api.bgpview.io/ip/${input}`);

        if (result && result.data) {
          output = JSON.stringify(result.data, null, 2);
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




