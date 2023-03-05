const productosCtrl = {};
import Producto from "../models/productos.js";

productosCtrl.renderProductoForm = (req, res) => {
  res.render("productos/nuevoProducto");
};

productosCtrl.createNewProducto = async (req, res) => {
  const { nombre, categoria, descripcion, foto, precio, stock } = req.body;

  const nuevoProducto = new Producto({
    nombre: nombre,
    descripcion: descripcion,
    foto: foto,
    precio: precio,
    stock: stock,
    categoria: categoria,
  });
  await nuevoProducto.save();
  res.redirect("/productos/add");
};

productosCtrl.renderProductos = async (req, res) => {
  const productos = await Producto.find().lean();
  res.render("productos/allProductos", { productos });
};

productosCtrl.deleteProducto = async (req, res) => {
  const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
  res.redirect("/productos");
};

productosCtrl.productosCategoria = async (req, res) => {
  const categoriaBuscada = req.params.categoria;
  const productoPorCategoria = await Producto.find({
    categoria: categoriaBuscada,
  }).lean();
  res.render("productos/productosCategorias", { productoPorCategoria });
};

productosCtrl.BuscarProductoPorId = async (req, res) => {
  try {
    const idDelProductoABuscar = req.params.id;
    const productoEncontrado = await Producto.findById(idDelProductoABuscar);
    res.render("productos/productoEncontrado", { productoEncontrado });
  } catch (error) {
    res.status(404).render("productos/errorProductoNoEncontrado");
  }
};

export default productosCtrl;
