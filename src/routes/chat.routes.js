import { Router } from "express";
const router = Router();
import helpers from "../helpers/auth.js";

import chatCtrl from "../controllers/chat.controller.js";

router.get("/chat", helpers.isAuthenticated, chatCtrl.renderChat);

router.get("/chat/:email", helpers.isAuthenticated, chatCtrl.mensajesPorEmial);

export default router;
