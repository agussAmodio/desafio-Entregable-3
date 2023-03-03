import { Schema, model } from "mongoose";
import bcrypt from "bcrypt-nodejs";

const registroSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  password: { type: String, required: true },
  foto: { type: String, required: true },
});

registroSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

registroSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default model("usuarios", registroSchema);
