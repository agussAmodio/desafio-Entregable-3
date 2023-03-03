import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import indexCtrl from "../controllers/index.controller.js";

router.get("/cuenta", indexCtrl.renderCuenta);

router.get("/carrito", indexCtrl.renderCarrito);

router.get("/logout", helpers.isAuthenticated, indexCtrl.renderLogout);

export default router;
