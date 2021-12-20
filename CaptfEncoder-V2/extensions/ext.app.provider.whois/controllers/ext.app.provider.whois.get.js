const whois = require("whois");
const changeCase = require("change-case");
const he = require('he');

const defaultValue = require('../../ext.common/default-value');


module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input) {
    
        let result = await lookup(input);

        if (result) {
          output = result;
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


async function lookup(domain) {
  return new Promise(function(resolve, reject) {
    whois.lookup(domain, {}, function(err, rawData) {
      if (!err) {
        let result = {};
  
        if (typeof rawData === "object") {
          result = rawData.map(function(data) {
            data.data = parseRawData(data.data);
            return data;
          });
        } else {
          result = parseRawData(rawData);
        }

        let lines = '';

        for (var key in result) {
          lines += key+':\n';
          lines += result[key]+'\n\n';          
        }
  
        resolve(lines);
        
      } else {
        resolve('');
      }
    });
  });
}


function parseRawData(rawData) {
  var result = {};

  const DELIMITER = ":";

  rawData = he.decode(rawData);
  rawData = rawData.replace(/:\s*\r\n/g, ": ");
  var lines = rawData.split("\n");

  lines.forEach(function(line) {
    line = line.trim();
    // colon space because that's the standard delimiter - not ':' as that's used in eg, http links
    if (line && line.includes(DELIMITER + " ")) {
      var lineParts = line.split(DELIMITER);

      // 'Greater than' since lines often have more than one colon, eg values with URLs
      if (lineParts.length >= 2) {
        var key = changeCase.camelCase(lineParts[0]),
          value = lineParts
            .splice(1)
            .join(DELIMITER)
            .trim();

        // If multiple lines use the same key, combine the values
        if (key in result) {
          result[key] = `${result[key]} ${value}`;
          return;
        }
        result[key] = value;
      }
    }
  });

  return result;
}




