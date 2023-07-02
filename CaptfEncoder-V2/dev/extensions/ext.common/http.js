const axios = require("axios");

async function get(url, timeout=30000) {
  try {
    const response = await axios.get(url, {
      timeout: timeout
    });

    return response;


  } catch (err) {
    throw (err);
  }
}


module.exports = {
  get: get,

}