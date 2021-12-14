const axios = require('axios');

class Chargify {
  constructor (subdomain, apiKey) {
    const chargify = this;
    this.rootPath = `https://${subdomain}.chargify.com`;
    this.auth = {
      username: apiKey,
      password: 'x',
    };

    this.customers = require('./src/customers')(chargify);
    this.transactions = require('./src/transactions')(chargify);
    this.subscriptions = require('./src/subscriptions')(chargify);
    this.products = require('./src/products')(chargify);
    this.invoices = require('./src/invoices')(chargify);
    this.customFields = require('./src/customFields')(chargify);
  }
  
  _get = async function (path, params) {
    try {
      const url = this.rootPath + path;
      const config = { auth: this.auth, params };
      const { data } = await axios.get(url, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  _post = async function (path, body) {
    const url = this.rootPath + path;
    const config = { auth: this.auth };
    const { data } = await axios.post(url, body, config);
    return data;
  };
  
  _put = async function (path, body) {
    const url = this.rootPath + path;
    const config = { auth: this.auth };
    const { data } = await axios.put(url, body, config);
    return data;
  };
  
  _delete = async function (path) {
    const url = this.rootPath + path;
    const config = { auth: this.auth };
    const { data } = await axios.delete(url, config);
    return data;
  };
};



module.exports = exports = Chargify;
