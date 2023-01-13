const usersCtrl = {};

const nodemailer = require("nodemailer");

const passport = require("passport");
const twilio = require("twilio");

const User = require("../models/usuarios");

usersCtrl.renderRegistroForm = (req, res) => {
  res.render("usuarios/registro");
};

usersCtrl.registro = async (req, res) => {
  const { nombre, direccion, edad, telefono, email, password, foto } = req.body;

  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    req.flash("error_msg", "El email ya esta en uso!");
    res.redirect("/users/registro");
  } else {
    const newUser = new User({
      nombre,
      direccion,
      edad,
      telefono,
      email,
      password,
      foto,
    });
    const passwordSinHash = await newUser.password;
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    //Envio de email
    const transporter = nodemailer.createTransport({
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
      Edad: ${newUser.edad} , 
      Telefono: ${newUser.telefono} ,
      Foto: ${newUser.foto} , 
      Email: ${newUser.email}, 
      Contraseña: ${passwordSinHash} `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        console.log("Email enviado");
        res.status(200).jsonp(req.body);
      }
    });

    req.flash("success_msg", "Usuario registrado!");
    res.redirect("/users/login");
  }
};

usersCtrl.renderLoginForm = (req, res) => {
  res.render("usuarios/login");
};

usersCtrl.login = passport.authenticate("local", {
  failureRedirect: "/users/login",
  successRedirect: "/",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Session cerrada");
    res.redirect("/users/login");
  });
};

module.exports = usersCtrl;
