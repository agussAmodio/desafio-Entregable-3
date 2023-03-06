import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";
import productosCtrl from "../controllers/productos.controller.js";

// AGREGAR PRODUCTOS A LA BASE DE DATOS
router.get(
  "/productos/add",
  helpers.isAuthenticated,
  productosCtrl.renderProductoForm
);

router.post(
  "/productos/nuevoProducto",
  helpers.isAuthenticated,
  productosCtrl.createNewProducto
);

// LISTAR TODOS LOS PRODUCTOS
router.get("/productos", productosCtrl.renderProductos);

// BORRAR PRODUCTO POR SU ID
router.delete(
  "/productos/:id",
  helpers.isAuthenticated,
  productosCtrl.deleteProducto
);

// PRODUCTOS POR CATEGORIA O POR ID
router.get("/productos/:id", productosCtrl.BuscarProductoPorId);
router.get("/productos/categoria/:categoria", productosCtrl.productosCategoria);

export default router;
