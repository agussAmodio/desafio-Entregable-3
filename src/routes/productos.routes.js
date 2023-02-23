const { Router } = require("express");
const router = Router();

const {
  renderProductoForm,
  createNewProducto,
  renderProductos,
  deleteProducto,
  productosCategoria,
  BuscarProductoPorId,
} = require("../controllers/productos.controller");

// AGREGAR PRODUCTOS A LA BASE DE DATOS

router.get("/productos/add", renderProductoForm);
router.post("/productos/nuevoProducto", createNewProducto);

// LISTAR TODOS LOS PRODUCTOS
router.get("/productos", renderProductos);

// BORRAR PRODUCTO POR SU ID
router.delete("/productos/delete/:id", deleteProducto);

// PRODUCTOS POR CATEGORIA O POR ID
router.get("/productos/:id", BuscarProductoPorId);
router.get("/productos/categoria/:categoria", productosCategoria);

module.exports = router;
