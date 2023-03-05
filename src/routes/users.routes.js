import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import userCtrl from "../controllers/users.controller.js";

// REGISTRO
router.get("/usuario/registro", userCtrl.renderRegistroForm);
router.post("/usuario/registro", userCtrl.registro);

// LOGIN
router.get("/", userCtrl.renderLoginForm);
router.post("/usuario/login", userCtrl.login);

// LOGOUT
router.get("/usuario/logout", helpers.isAuthenticated, userCtrl.logout);

// CUENTA
router.get("/cuenta", helpers.isAuthenticated, userCtrl.renderCuenta);

export default router;
