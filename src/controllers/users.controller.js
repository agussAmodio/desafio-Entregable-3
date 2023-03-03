import passport from "passport";
import User from "../models/usuarios.js";

const usersCtrl = {};

usersCtrl.renderRegistroForm = (req, res) => {
  res.render("usuarios/registro");
};

usersCtrl.registro = async (req, res) => {
  const {
    nombre,
    direccion,
    telefono,
    email,
    password,
    foto,
    confirm_password,
  } = req.body;

  if (password != confirm_password) {
    req.flash("error_msg", "las contraseñas no coinciden.");
    return res.redirect("/users/registro");
  }

  const emailsUser = await User.findOne({ email: email });

  if (emailsUser) {
    req.flash("error_msg", "El email ya esta en uso!");
    return res.redirect("/users/registro");
  }

  const newUser = new User({
    nombre,
    direccion,
    telefono,
    email,
    password,
    foto,
  });

  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  req.flash("success_msg", "Usuario registrado!");
  res.redirect("/");
};

usersCtrl.renderLoginForm = (req, res) => {
  res.render("usuarios/login");
};

usersCtrl.login = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/productos",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Sesion cerrada correctamente ");
    res.redirect("/");
  });
};

export default usersCtrl;
