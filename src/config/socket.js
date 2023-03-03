import Chat from "../models/chat.js";
import Users from "../models/usuarios.js";

export default function chat(io) {
  io.on("connection", async (socket) => {
    const mensajes = await Chat.find();

    socket.emit("mensajes viejos", mensajes);

    socket.on("nuevo usuario", async (data) => {
      socket.email = data;
    });

    socket.on("enviar mensaje", async (data) => {
      const mensajeNuevo = new Chat({
        mensaje: data,
        email: socket.email,
      });
      await mensajeNuevo.save();

      io.sockets.emit("nuevo mensaje", {
        mensaje: data,
        email: socket.email,
      });
    });
  });
}
