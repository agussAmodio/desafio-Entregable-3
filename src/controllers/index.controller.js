const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};

indexCtrl.renderCuenta = (req, res) => {
  res.render("cuenta");
};

indexCtrl.renderCarrito = (req, res) => {
  res.render("carrito");
};

indexCtrl.renderProductos = (req, res) => {
  res.render("productos");
};

indexCtrl.renderLogout = (req, res) => {
  res.render("logout");
};

module.exports = indexCtrl;
