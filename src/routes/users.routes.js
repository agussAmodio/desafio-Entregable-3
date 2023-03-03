import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import userCtrl from "../controllers/users.controller.js";

// REGISTRO
router.get("/users/registro", userCtrl.renderRegistroForm);
router.post("/users/registro", userCtrl.registro);

// LOGIN
router.get("/", userCtrl.renderLoginForm);
router.post("/users/login", userCtrl.login);

// LOGOUT
router.get("/users/logout", helpers.isAuthenticated, userCtrl.logout);

export default router;
