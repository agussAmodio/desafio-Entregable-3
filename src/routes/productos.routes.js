const { Router } = require("express");
const router = Router();

const {
  renderProductoForm,
  createNewProducto,
  renderProductos,
  deleteProducto,
} = require("../controllers/productos.controller");

router.get("/productos/add", renderProductoForm);
router.post("/productos/nuevoProducto", createNewProducto);

// GET ALL
router.get("/productos", renderProductos);

// DELETE
router.delete("/productos/delete/:id", deleteProducto);

module.exports = router;
