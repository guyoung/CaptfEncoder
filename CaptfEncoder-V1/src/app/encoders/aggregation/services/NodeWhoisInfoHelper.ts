var whois = require("whois");
var changeCase = require("change-case");
var htmlEntities = require("html-entities").XmlEntities;

export class NodeWhoisHelper {
  public static async query(input) {
    if (!input || input.length < 1) {
      return;
    }

    const domain = input;    

    let result = await NodeWhoisHelper.whoisLookup(domain);

    return result;

  }

  private static whoisLookup(domain) {
    return new Promise<string>(function(resolve, reject) {
      whois.lookup(domain, {}, function(err, rawData) {
        if (!err) {
          let result = {};
    
          if (typeof rawData === "object") {
            result = rawData.map(function(data) {
              data.data = NodeWhoisHelper.parseRawData(data.data);
              return data;
            });
          } else {
            result = NodeWhoisHelper.parseRawData(rawData);
          }

          let lines: string = '';

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

  private static stripHTMLEntitites(rawData) {
    var entities = new htmlEntities();
    return entities.decode(rawData);
  }

  private static parseRawData(rawData) {
    var result = {};

    const DELIMITER = ":";

    rawData = NodeWhoisHelper.stripHTMLEntitites(rawData);
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
  };
}
