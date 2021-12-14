// https://reference.chargify.com/v1/products

module.exports = exports = (chargify) => ({
  list: (id) => chargify._get(`product_families/${id}/products.json`),
  read: (id) => chargify._get(`/products/${id}.json`),
  price_point: {
    read: (id, price_point_id) =>
      chargify._get(`/products/${id}/price_points/${price_point_id.id}.json`),
    list: (id) => chargify._get(`/products/${id}/price_points.json`),
  },
});
