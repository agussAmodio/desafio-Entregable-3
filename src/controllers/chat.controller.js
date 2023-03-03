const chatCtrl = {};
import Mensaje from "../models/chat.js";
import Users from "../models/usuarios.js";

chatCtrl.renderChat = async (req, res) => {
  res.render("mensajes/chat");
};

chatCtrl.mensajesPorEmial = async (req, res) => {
  const emailABuscar = req.params.email;
  const mensajes = await Mensaje.find({ email: emailABuscar }).lean();

  if (mensajes.length == 0) {
    res.status(404).render("mensajes/errorMensaje");
  } else {
    res.render("mensajes/mensajesPorEmail", { mensajes });
  }
};

export default chatCtrl;
