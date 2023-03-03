import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import carritosCtrl from "../controllers/carritos.controller.js";

router.post(
  "/carrito/producto/:id",
  helpers.isAuthenticated,
  carritosCtrl.addProductoCarrito
);

router.get("/carritos", helpers.isAuthenticated, carritosCtrl.renderCarritos);

router.delete(
  "/carritos/delete/:id",
  helpers.isAuthenticated,
  carritosCtrl.deleteProductCarrito
);

router.post("/finalizarCompra", carritosCtrl.botonFinalizar);

export default router;
