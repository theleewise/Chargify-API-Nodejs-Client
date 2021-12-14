// https://reference.chargify.com/v1/customers

const simplify = (a) => a.customer;
const simplifyMultiple = (a) => a.map(simplify);

module.exports = exports = (chargify) => ({
  create: (properties) => {
    chargify._post(`/customers.json`, properties).then(simplify);
  },

  read: (id, options) =>
    chargify._get(`/customers/${id}.json`, options).then(simplify),

  lookup: (reference) =>
    chargify._get(`/customers/lookup.json`, { reference }).then(simplify),

  list: (options) =>
    chargify._get('/customers.json', options).then(simplifyMultiple),

  find: (q, page) =>
    chargify._get('/customers.json', { q, page }).then(simplifyMultiple),

  update: (id, properties) => {
    chargify._put(`/customers/${id}.json`, properties).then(simplify);
  },

  delete: (id) => chargify._delete(`/customers/${id}.json`),

  subscriptions: (id) =>
    chargify
      ._get(`/customers/${id}/subscriptions.json`)
      .then((subscriptions) => subscriptions.map((item) => item.subscription)),

  customFields: async (id, fieldSel) => {
    if (!id || isNaN(id)) throw 'Invalid customer id';
    const { metadata: fields } = await chargify.customFields.listForResource(
      'customers',
      id
    );
    if (!fieldSel) return fields;

    const key = isNaN(fieldSel) ? 'name' : 'id';
    const field = await fields.find((item) => item[key] === fieldSel);
    return field ? field : null;
  },
});
