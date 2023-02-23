const { Router } = require("express");
const router = Router();

const { renderChat } = require("../controllers/chat.controller");

router.get("/chat", renderChat);

module.exports = router;
