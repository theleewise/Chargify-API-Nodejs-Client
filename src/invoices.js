// https://reference.chargify.com/v1/relationship-invoicing

module.exports = exports = (chargify) => ({
  list: (opts) =>
    chargify._get('/invoices.json', opts).then((data) => data.invoices),

  read: (uid) => chargify._get(`/invoices/${uid}.json`),

  refund: (id) => chargify._post(`/invoices/${id}/refunds.json`),

  events: (options) => chargify._get(`/invoices/events.json`, options),

  createPayment: (id, data) => chargify._post(`/invoices/${id}/payments.json`, data),

  reopen: (id) => chargify._post(`/invoices/${id}/reopen.json`),

  void: (id) => chargify._post(`/invoices/${id}/void.json`),

  segments: (id) => chargify._get(`/invoices/${id}/segments.json`),

  send: (data) => chargify._post('/invoices/deliveries.json', data),

  previewCustomerInfoChanges: (id) =>
    chargify._post(`/invoices/${id}/customer_information/preview.json`),

  updateCustomerInfo: (id) =>
    chargify._put(`/invoices/${id}/customer_information.json`),
});
