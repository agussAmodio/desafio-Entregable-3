const { Schema, model } = require("mongoose");

const productosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Productos", productosSchema);
