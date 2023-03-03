import { Schema, model } from "mongoose";

const ordenesSchema = new Schema(
  {
    email: { type: String, required: true },
    productos: [
      {
        nombre: String,
        descripcion: String,
        foto: String,
        precio: Number,
        stock: Number,
        categoria: String,
        cantidadProdCarrito: Number,
      },
    ],
    direccion: { type: String, required: true },
    estado: { type: String, default: "generada" },
  },

  {
    timestamps: true,
  }
);

export default model("ordenes", ordenesSchema);
