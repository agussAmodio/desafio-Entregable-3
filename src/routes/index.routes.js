const { Router } = require("express");
const router = Router();
const {
  renderCuenta,
  renderCarrito,
  renderLogout,
} = require("../controllers/index.controller");

router.get("/cuenta", renderCuenta);

router.get("/carrito", renderCarrito);

router.get("/logout", renderLogout);

module.exports = router;
