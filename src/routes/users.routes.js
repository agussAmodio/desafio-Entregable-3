const { Router } = require("express");
const router = Router();

const {
  renderLoginForm,
  renderRegistroForm,
  registro,
  login,
  logout,
} = require("../controllers/users.controller");

router.get("/users/registro", renderRegistroForm);

router.post("/users/registro", registro);

router.get("/users/login", renderLoginForm);

router.post("/users/login", login);

router.get("/users/logout", logout);

module.exports = router;
