import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
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
    user: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default model("carritos", carritoSchema);
