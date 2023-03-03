import Users from "../models/usuarios.js";

const indexCtrl = {};

indexCtrl.renderCarrito = (req, res) => {
  res.render("carrito");
};

indexCtrl.renderProductos = (req, res) => {
  res.render("productos");
};

indexCtrl.renderLogout = (req, res) => {
  res.render("logout");
};

indexCtrl.renderCuenta = async (req, res) => {
  const useruarioActivo = req.user;
  const usuarioID = useruarioActivo._id;
  const usuarioEncontrado = await Users.find({ _id: usuarioID }).lean();
  res.render("cuenta", { usuarioEncontrado });
};

export default indexCtrl;
