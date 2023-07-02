const defaultValue = require('../../ext.common/default-value');
const { get } = require('../../ext.common/http');

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input) {
      const provider = defaultValue(options.provider, '');
      const queryType = defaultValue(options.queryType, 'asn');

      if (provider === 'api.bgpview.io') {

        let url;

        if (queryType === 'asn') {
          url = `https://api.bgpview.io/asn/${input}`;
        }
        else if (queryType === 'prefixes') {
          url = `https://api.bgpview.io/asn/${input}/prefixes`;
        }
        else if (queryType === 'peers') {
          url = `https://api.bgpview.io/asn/${input}/peers`;
        }
        else if (queryType === 'upstreams') {
          url = `https://api.bgpview.io/asn/${input}/upstreams`;
        }
        else if (queryType === 'downstreams') {
          url = `https://api.bgpview.io/asn/${input}/downstreams`;
        }
        else if (queryType === 'ix') {
          url = `https://api.bgpview.io/asn/${input}/ixs`;
        }
      

        if (url) {
          const result = await get(url);

          if (result && result.data) {
            output = JSON.stringify(result.data, null, 2);
          }

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




