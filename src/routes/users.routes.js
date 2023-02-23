const { Router } = require("express");
const router = Router();

const {
  renderLoginForm,
  renderRegistroForm,
  registro,
  login,
  logout,
} = require("../controllers/users.controller");

// REGISTRO
router.get("/users/registro", renderRegistroForm);
router.post("/users/registro", registro);

// LOGIN
router.get("/", renderLoginForm);
router.post("/users/login", login);

// LOGOUT
router.get("/users/logout", logout);

module.exports = router;
