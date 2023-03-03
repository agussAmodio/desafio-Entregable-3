import { Schema, model } from "mongoose";

const productosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
    cantidadProdCarrito: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

export default model("Productos", productosSchema);
