// https://reference.chargify.com/v1/subscriptions

const simplify = (a) => a.subscription;
const simplifyMultiple = (a) => a.map(simplify);

module.exports = exports = (chargify) => ({
  create: (data) => chargify._post('/subscriptions.json', data).then(simplify),
  read: (id) => chargify._get(`/subscriptions/${id}.json`).then(simplify),
  list: () =>
    chargify
      ._get('/subscriptions.json')
      .then((subscriptions) => subscriptions.map(simplifyMultiple)),

  update: (id, data) =>
    chargify._put(`/subscriptions/${id}.json`, data).then(simplify),

  customFields: async (id, fieldSel) => {
    if (!id || isNaN(id)) throw 'Invalid subscription id';
    const { metadata: fields } = await chargify.customFields.listForResource(
      'subscriptions',
      id
    );
    if (!fieldSel) return fields;

    const key = isNaN(fieldSel) ? 'name' : 'id';
    const field = await fields.find((item) => item[key] === fieldSel);
    return field ? field : null;
  },
});
