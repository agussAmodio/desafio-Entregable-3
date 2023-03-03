import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import ordenesCtrl from "../controllers/ordenes.controller.js";

router.get("/ordenes", helpers.isAuthenticated, ordenesCtrl.renderOrdenes);

router.delete(
  "/ordenes/delete/:id",
  helpers.isAuthenticated,
  ordenesCtrl.borrarOrdenes
);

export default router;
