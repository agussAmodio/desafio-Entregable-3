const productosCtrl = {};
const Producto = require("../models/productos");

productosCtrl.renderProductoForm = (req, res) => {
  res.render("productos/nuevoProducto");
};

productosCtrl.createNewProducto = async (req, res) => {
  const { nombre, descripcion, id, codigo, foto, precio, stock } = req.body;

  const nuevoProducto = new Producto({
    nombre: nombre,
    descripcion: descripcion,
    id: id,
    codigo: codigo,
    foto: foto,
    precio: precio,
    stock: stock,
  });
  await nuevoProducto.save();
  res.redirect("/productos");
};

productosCtrl.renderProductos = async (req, res) => {
  const productos = await Producto.find().lean();
  res.render("productos/allProductos", { productos });
};

productosCtrl.deleteProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect("/productos");
};

module.exports = productosCtrl;
