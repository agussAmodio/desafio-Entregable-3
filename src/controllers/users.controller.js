const usersCtrl = {};
const nodemailer = require("nodemailer");

const passport = require("passport");
const twilio = require("twilio");

const User = require("../models/usuarios");

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

  const passwordSinHash = await newUser.password;
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  // ENVIO DE EMAIL

  //Envio de email
  /*const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
      },
    });

    //EMAIL
    const mailOptions = {
      from: "Remitente",
      to: `${newUser.email}`,
      subject: "Nuevo registro",
      text: `DATOS DE REGISTRO:
      Nombre: ${newUser.nombre} , 
      Direccion: ${newUser.direccion} , 
      Telefono: ${newUser.telefono} ,
      Foto: ${newUser.foto} , 
      Email: ${newUser.email}, 
      Contraseña: ${passwordSinHash} `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).jsonp(req.body);
      }
    });*/

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

module.exports = usersCtrl;
