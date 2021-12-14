// https://reference.chargify.com/v1/transactions

const simplify = (a) => a.transaction;
const simplifyMultiple = (a) => a.map(simplify);

module.exports = exports = (chargify) => ({
  read: (id) => chargify._get(`/transactions/${id}.json`).then(simplify),
  list: (opts) =>
    chargify._get('/transactions.json', opts).then(simplifyMultiple),
  count: () => chargify._get('/transactions/count.json').then((a) => a.count),
  subscription: (id, options) =>
    chargify
      ._get(`/subscriptions/${id}/transactions.json`, options)
      .then(simplifyMultiple),
});
