const { Router } = require("express");
const router = Router();
const {
  renderCuenta,
  renderIndex,
  renderCarrito,
  renderProductos,
  renderLogout,
} = require("../controllers/index.controller");

router.get("/", renderIndex);

router.get("/cuenta", renderCuenta);

router.get("/carrito", renderCarrito);

//router.get("/productos", renderProductos);

router.get("/logout", renderLogout);

module.exports = router;
