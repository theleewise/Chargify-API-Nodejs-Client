// https://reference.chargify.com/v1/custom-fields

module.exports = exports = (chargify) => ({
  listForResource: (type, id, options = { per_page: 200 }) => {
    if(!type || (type !== 'customers' && type !== 'subscriptions')) throw ('Invalid resource type');
    if(!id) throw ('Invalid resource id');
    return chargify._get(`/${type}/${id}/metadata.json`, options);
  },
});
