

const defaultValue = require('../../ext.common/default-value');
const { get } = require('../../ext.common/http');

module.exports = async function (input, options = {}) {
  try {
    let output = '';

    if (input) {
      const provider = defaultValue(options.provider, '');

      if (provider === 'factordb.com') {
        const result = await get(`http://factordb.com/api?query=${input}`);       

        if (result && result.data && result.data.factors) {
          const data = result.data.factors;

          const numberList = [];
          data.forEach(d => {
            const t = new Number(d[1]);

            for (var i = 1; i <= t; i++) {
              numberList.push(d[0]);
            }
          });

          output = input + ' = ' + numberList.join(' × ');
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




