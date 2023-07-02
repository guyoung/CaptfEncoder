const defaultValue = require('../../ext.common/default-value');
const axios = require('axios');
const qs = require('qs');
const cheerio = require("cheerio");

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input && input.length > 0) {
      const provider = defaultValue(options.provider, '');


      if (provider === 'dnsdumpster.com') {

        const dnsdumpster_url = 'https://dnsdumpster.com/'


        const http = axios.create({
          timeout: 1000 * 30,
          headers: { 'X-Custom-Header': 'Get it' }
        });

        let res = await http.request({
          method: 'get',
          url: dnsdumpster_url,
          withCredentials: true
        });

        if (res && res.data) {

          let query = cheerio.load(res.data);
          const csrf_middleware = query("[name='csrfmiddlewaretoken']").attr('value')

          const headers = {
            'Referer': dnsdumpster_url,
            'Cookie': `csrftoken=${csrf_middleware}`,

          }

          let data = { 'csrfmiddlewaretoken': csrf_middleware, 'targetip': input };

          res = await http.request({
            method: 'post',
            url: dnsdumpster_url,
            headers: headers,
            withCredentials: true,
            data: qs.stringify(data)
          });

          query = cheerio.load(res.data);

          let result = {};

          let table = query("div.table-responsive").eq(0).children().first();

          result.dnsServers = retrieve_results(query, table);

          table = query("div.table-responsive").eq(1).children().first();

          result.mxRecords = retrieve_results(query, table);

          table = query("div.table-responsive").eq(2).children().first();

          result.txtRecords = retrieve_txt_record(query, table);

          table = query("div.table-responsive").eq(3).children().first();

          result.hostRecords = retrieve_results(query, table);    

          output = JSON.stringify(result, null, 2);
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


function retrieve_results(query, table) {
  const pattern_ip = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/

  let items = [];

  const rows = query(table).find('tr');

  rows.map((_idx, el) => {   
    const ip = query(query(el).children().get(1)).text().match(pattern_ip)[0];   
    const domain = query(query(el).children().get(0)).html().split('<br>')[0]; 
    const additional_info = query(query(el).children().get(2)).text();

    const span_element = query(query(el).children().get(2)).find('span')
   
    const country = span_element.text();
    
    items.push({
      ip: ip, 
      domain: domain,
      additional_info: additional_info,
      country: country
    })
   
  });

  return items;

}

function retrieve_txt_record(query, table) {
  let items = [];

  const cols = query(table).find('td');

  cols.map((_idx, el) => {
      items.push(query(el).text());   
  });

  return items;

}


