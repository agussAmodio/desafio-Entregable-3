const chatCtrl = {};
const Mensaje = require("../models/chat");
const Users = require("../models/usuarios");

chatCtrl.renderChat = async (req, res) => {
  const useruarioActivo = req.user;
  const usuarioEncontrado = await Users.find({
    _id: useruarioActivo._id,
  }).lean();

  const nuevoMensaje = new Mensaje({
    email: useruarioActivo.email,
    foto: useruarioActivo.foto,
    mensaje: "Hola esto es una prueba!",
  });
  await nuevoMensaje.save();

  res.render("mensajes/chat", { usuarioEncontrado });
};

module.exports = chatCtrl;
